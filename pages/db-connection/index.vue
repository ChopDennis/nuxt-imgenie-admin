<template>
  <div>
    <!-- 資料庫連線 -->
    <AdminSortableTable :list="store.dbConnTable" :column="displayContent" />

    <!-- 選擇連線類型 -->
    <ElDialog
      v-model="store.dbConnDialog.categories"
      title="選擇連線類型"
      modal-class="backdrop-blur-sm"
      width="576"
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
        ><div class="h-auto flex items-center gap-2">
          <div>
            <img :src="icons[`ic_${store.dbConnSetType}`]" />
          </div>
          <div>{{ store.dbConnSetTitle }} 連線設定</div>
        </div>
      </template>
      <DbConnectionSet ref="dbConnectionSetRef" />
      <template #footer>
        <div class="flex justify-between">
          <ElButton @click="clickConnTestButton">連線測試</ElButton>
          <span>
            <ElButton @click="store.dbConnDialog.connSetting = false"
              >取消</ElButton
            >
            <ElButton type="primary" @click="clickConfirm">儲存</ElButton>
          </span>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
import DbConnectionSet from "~/components/dbConnection/DbConnectionSet.vue";
const displayContent = {
  connName: "連線名稱",
  database: "資料庫名稱",
  host: "主機名稱或IP",
};
const store = useDbConnectionStore();
const icons = dynamicImportDbConnectionIcons();
const sideMenuActive = useSideMenuActive();
sideMenuActive.value = "2-1";

const dbConnectionSetRef = ref<InstanceType<typeof DbConnectionSet> | null>(
  null,
);
await store.getDbConnTable();

const clickConfirm = () => {
  dbConnectionSetRef.value?.submitForm(
    dbConnectionSetRef.value?.dbConnSetFormRef,
  );
};

const clickConnTestButton = () => {
  dbConnectionSetRef.value?.testConn(
    dbConnectionSetRef.value?.dbConnSetFormRef,
  );
};
</script>
<style scoped>
.db-category-active {
  border: 1px solid rgb(69, 109, 236);
  background-color: rgba(246, 247, 249, 1);
}
</style>
