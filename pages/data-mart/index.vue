<template>
  <div>
    <GlobalSortableTable :list="store.table">
      <template #column>
        <!-- 資料庫類型 -->
        <ElTableColumn
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
        <ElTableColumn prop="dataMartName" label="資料模型名稱" sortable />
        <ElTableColumn prop="connName" label="連線名稱" sortable />
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
    </GlobalSortableTable>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const icons = useDbConnIcons();

onNuxtReady(async () => {
  await dataMartApi().getTable();
});

const changSwitch = async (id: string, value: boolean) => {
  return await dataMartApi().sendUpdate(id, value);
};

const clickEdit = (id: string) => {
  navigateTo({
    path: "/data-mart/edit",
    query: {
      datamartId: id,
    },
  });
};
</script>
