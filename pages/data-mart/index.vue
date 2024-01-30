<template>
  <div>
    <div v-if="!edit">
      <GlobalSortableTable :list="store.table">
        <template #column>
          <TableColumnDbType />
          <ElTableColumn prop="dataMartName" label="資料模型名稱" sortable />

          <ElTableColumn prop="connName" label="連線名稱" sortable>
            <template #default="scope">
              <div class="flex items-center gap-1">
                <div>{{ scope.row.connName }}</div>
                <div v-if="!isConnectionActivate(scope.row.connId)">
                  <ElTooltip
                    content="資料庫連線已修改，請確認連線設定資訊是否正確"
                    effect="light"
                    placement="bottom"
                    ><ElIconWarning width="16" style="color: lightcoral"
                  /></ElTooltip>
                </div>
              </div>
            </template>
          </ElTableColumn>
          <TableColumnIsActivate />
          <TableColumnEdit v-model:edit="edit" v-model:id="id" />
        </template>
      </GlobalSortableTable>
    </div>
    <div v-if="edit">
      <DataMartEdit :id="id" />
    </div>
  </div>
</template>
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = useDataMartStore();
const dbConnStore = useDbConnectionStore();
onMounted(async () => {
  await useDataMartApi().getTable();
  await useDbConnectionApi().getList();
});
const isConnectionActivate = (connId: string) => {
  const connIdList = _useMap(dbConnStore.list, "connId");
  return _useIncludes(connIdList, connId);
};
const edit = ref<boolean>(false);
const id = ref<string>("");
</script>
