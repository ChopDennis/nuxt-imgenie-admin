<template>
  <div>
    <GlobalSortableTable :list="list">
      <template #column>
        <ElTableColumn prop="groupName" label="群組名稱" sortable />
        <ElTableColumn prop="description" label="簡述" sortable />
        <ElTableColumn prop="createTime" label="建立時間" sortable />
        <!-- 操作 -->
        <TableColumnEdit />
      </template>
    </GlobalSortableTable>
  </div>
</template>
<script setup>
const list = ref([
  {
    groupName: "群組測試",
    description: "群組測試、群組測試、群組測試、群組測試",
    createTime: "2024-01-02",
  },
]);
</script>
