<template>
  <div>
    <GlobalSortableTable :list="dataMartGroupStore.groups">
      <template #column>
        <ElTableColumn prop="datamartGroupName" label="群組名稱" sortable />
        <ElTableColumn prop="description" label="簡述" sortable />
        <ElTableColumn prop="createTime" label="建立時間" sortable />
        <TableColumnIsActivate />
        <!-- 操作 -->
        <TableColumnEdit />
      </template>
    </GlobalSortableTable>
  </div>
</template>
<script setup>
const dataMartGroupStore = useDataMartGroupStore();
onNuxtReady(async () => {
  await useDataMartGroup().getDataMartGroup();
});
</script>
