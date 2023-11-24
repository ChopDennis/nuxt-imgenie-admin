<template>
  <div>
    <!-- 資料庫連線 -->
    <div class="flex flex-col">
      <div
        class="flex flex-col gap-4 px-5 pb-4 sticky top-0 bg-white -mt-1 z-50"
      >
        <div class="flex text-sm">
          <p class="text-gray-300">首頁／系統管理／</p>
          <p>資料庫連線</p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-xl font-bold tracking-wide">資料庫連線</h1>
          <div>
            <ElButton
              :icon="ElIconRefresh"
              type="primary"
              @click="store.getDbConnList(false)"
              >重新整理</ElButton
            >
            <ElButton :icon="ElIconPlus" type="primary" @click="clickAddNewConn"
              >新增連線</ElButton
            >
          </div>
        </div>
      </div>
      <DbConnectionList />
    </div>

    <!-- 選擇連線類型 -->
    <ElDialog
      v-model="store.dbConnDialog.categories"
      title="選擇連線類型"
      modal-class="backdrop-blur-sm"
      align-center
    >
      <DbConnectionTypes />
    </ElDialog>

    <!-- 連線設定 -->
    <ElDialog
      v-model="store.dbConnDialog.connSetting"
      :destroy-on-close="true"
      modal-class="backdrop-blur-sm"
      align-center
      width="576"
    >
      <template #header
        ><img
          class="inline-block pb-2 pr-2"
          src="~/assets/icons/dbConnection/ic_postgresql.svg"
        />
        <span>{{ store.dbConnSetTitle }} 連線設定</span>
      </template>
      <DbConnectionSet ref="dbConnectionSetRef" />
      <template #footer>
        <div class="flex justify-between">
          <ElButton @click="store.getDbConnTest()">連線測試</ElButton>
          <span>
            <ElButton @click="store.dbConnDialog.connSetting = false"
              >取消</ElButton
            >
            <ElButton type="primary" @click="clickConfirm">確認</ElButton>
          </span>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
import DbConnectionSet from "~/components/dbConnection/DbConnectionSet.vue";

const store = useDbConnectionStore();
const dbConnectionSetRef = ref<InstanceType<typeof DbConnectionSet> | null>(
  null,
);
await store.getDbConnList(true);

const clickAddNewConn = async () => {
  await store.getDbConnTypes();
  store.dbConnDialog.categories = true;
};

function clickConfirm() {
  dbConnectionSetRef.value?.submitForm(
    dbConnectionSetRef.value?.dbConnSetFormRef,
  );
}
</script>
<style scoped>
.db-category-active {
  border: 1px solid rgb(69, 109, 236);
  background-color: rgba(246, 247, 249, 1);
}
</style>
