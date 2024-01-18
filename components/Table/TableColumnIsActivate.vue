<template>
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
        :before-change="() => changActivate(scope.row.id, scope.row.isActivate)"
      />
    </template>
  </ElTableColumn>
</template>
<script setup lang="ts">
const changActivate = async (id: string, value: boolean) => {
  let state: boolean;
  switch (useRoute().path) {
    case "/db-connection": {
      state = await useDbConnectionApi().sendUpdate(id, !value);
      break;
    }
    case "/data-mart": {
      state = await useDataMartApi().sendUpdate(id, !value);
      break;
    }
    case "/user-group": {
      state = await useUserGroup().updateUserGroups(id, !value);
      break;
    }
    default: {
      state = false;
      break;
    }
  }
  return state;
};
</script>
