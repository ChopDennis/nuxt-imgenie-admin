<template>
  <div>
    <!-- 資料庫連線 -->
    <AdminSortableTable :list="store.dbConnTable" :column="column" />

    <!-- 選擇連線類型 -->
    <ElDialog
      v-model="store.dbConnDialog.categories"
      title="選擇連線類型"
      modal-class="backdrop-blur-sm"
      width="572"
      align-center
      :on-close="
        () => {
          store.dbConnSetType = '';
        }
      "
    >
      <DbConnectionTypes />
    </ElDialog>

    <!-- 連線設定 -->
    <ElDialog
      v-model="store.dbConnDialog.connSetting"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :before-close="
        (done) => {
          store.dbConnTestStatus = null;
          done();
        }
      "
      modal-class="backdrop-blur-sm"
      align-center
      width="576"
      class="conn-set-dialog"
    >
      <template #header
        ><div class="flex items-center gap-2 text-xl">
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
            <ElButton
              @click="
                store.dbConnDialog.connSetting = false;
                store.dbConnSetType = '';
                store.dbConnTestStatus = null;
              "
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
const pageLayout = useLayoutStore().pageLayout[useRoute().path];
const column = computed(() => pageLayout.tableColumn ?? {});

const store = useDbConnectionStore();
const icons = useDbConnIcons();

const dbConnectionSetRef = ref<InstanceType<typeof DbConnectionSet> | null>(
  null,
);
await store.getDbConnTable();

const clickConfirm = () => {
  dbConnectionSetRef.value?.connSetBtn("save");
};

const clickConnTestButton = () => {
  dbConnectionSetRef.value?.connSetBtn("test");
};
</script>
