<template>
  <div>
    <GlobalSortableTable :list="table">
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
useUserGroup().resetUserGroup();
const table = computed(() =>
  _useMap(userGroupStore.groups, ({ userGroupId, ...rest }) => {
    return {
      id: userGroupId,
      ...rest,
    };
  }),
);
onNuxtReady(async () => {
  await useUserGroup().getUserGroups();
});
</script>
