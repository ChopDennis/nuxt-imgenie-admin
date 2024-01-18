<template>
  <div>
    <GlobalSortableTable :list="userGroupStore.groups">
      <template #column>
        <ElTableColumn prop="userGroupName" label="群組名稱" sortable />
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
const userGroupStore = useUserGroupStore();
onNuxtReady(async () => {
  await useUserGroup().getUserGroups();
});
</script>
