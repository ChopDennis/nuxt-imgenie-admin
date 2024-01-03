<template>
  <div>
    <!-- 資料庫列表 -->
    <GlobalSortableTable :list="store.table">
      <template #column>
        <!-- 資料庫類型 -->
        <ElTableColumn
          v-if="
            useRoute().path === '/db-connection' ||
            useRoute().path === '/data-mart'
          "
          prop="dbType"
          label="資料庫類型"
          width="150"
          align="center"
          sortable
        >
          <template #default="scope">
            <div>
              <img
                :src="icons[`ic_${scope.row.dbType}`]"
                class="m-auto"
                width="24"
              />
            </div>
          </template>
        </ElTableColumn>
        <!-- 其他欄位 -->
        <ElTableColumn prop="connName" label="連線名稱" sortable />
        <ElTableColumn prop="database" label="資料庫名稱" sortable />
        <ElTableColumn prop="host" label="主機名稱或IP" sortable />
        <!-- 狀態 -->
        <ElTableColumn
          prop="isActivate"
          label="狀態"
          width="90"
          align="center"
          sortable
        >
          <template #default="scope">
            <ElSwitch
              v-model="scope.row.isActivate"
              @change="changSwitch(scope.row.id, scope.row.isActivate)"
            />
          </template>
        </ElTableColumn>
        <!-- 操作 -->
        <ElTableColumn label="操作" width="90" align="center">
          <template #default="scope">
            <img
              class="m-auto"
              src="~/assets/icons/dbConnection/ic_db_edit.svg"
              @click="clickEdit(scope.row.id)"
            />
          </template>
        </ElTableColumn>
      </template>
      <!-- 空值 -->
      <template #empty
        ><div class="flex w-full h-full justify-center">
          <img src="~/assets/images/imgenie_empty_table.svg" /></div
      ></template>
    </GlobalSortableTable>

    <!-- 選擇連線類型 -->
    <DbConnectionTypes />

    <!-- 資料庫連線設定 -->
    <DbConnectionSetting>
      <template #alert>
        <ElAlert
          v-if="store.test.status"
          title="連線成功"
          type="success"
          show-icon
          class="font-black"
        />
        <ElAlert
          v-if="!store.test.status && !isNull(store.test.status)"
          :title="`無法連結到: ${store.setting.form.host}:${store.setting.form.port}`"
          :description="`${store.test.message}`"
          type="error"
          show-icon
        />
      </template>
    </DbConnectionSetting>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const icons = useDbConnIcons();

onNuxtReady(async () => {
  await dbConnectionApi().getTable();
});

const changSwitch = async (id: string, value: boolean) => {
  return await dbConnectionApi().sendUpdate(id, value);
};

const clickEdit = async (id: string) => {
  await dbConnectionApi().getQuery(id);
  store.dialog.connSetting = true;
};
</script>
