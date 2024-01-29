<template>
  <div>
    <GlobalSortableTable :list="store.table">
      <template #column>
        <!-- 資料庫類型 -->
        <TableColumnDbType />
        <!-- 其他欄位 -->
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
        <!-- 狀態 -->
        <TableColumnIsActivate />
        <!-- 操作 -->
        <TableColumnEdit />
      </template>
    </GlobalSortableTable>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const dbConnStore = useDbConnectionStore();
onNuxtReady(async () => {
  await useDataMartApi().getTable();
  await useDbConnectionApi().getList();
});

const isConnectionActivate = (connId: string) => {
  const connIdList = _useMap(dbConnStore.list, "connId");

  return _useIncludes(connIdList, connId);
};
</script>
