<template>
  <div>
    <GlobalSortableTable :list="store.table">
      <template #column>
        <!-- 資料庫類型 -->
        <TableColumnDbType />
        <!-- 其他欄位 -->
        <ElTableColumn prop="dataMartName" label="資料模型名稱" sortable />
        <ElTableColumn prop="connName" label="連線名稱" sortable />
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
onNuxtReady(async () => {
  await useDataMartApi().getTable();
});
</script>
