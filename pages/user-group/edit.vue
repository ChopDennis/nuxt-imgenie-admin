<template>
  <div class="overflow-scroll h-full pt-4 px-6 pb-16">
    <div class="flex flex-col gap-6">
      <UserGroupInfo />
      <UserGroupUserForm />
    </div>
    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="navigateTo({ path: '/user-group' })">取消</ElButton>
      <ElButton type="primary" @click="saveUserGroup()">儲存</ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
onNuxtReady(async () => {
  await useUserGroup().getUserGroupMembers();
  await useUserGroup().getUsers();
});

const saveUserGroup = async () => {
  await useUserGroup().saveUserGroup();
  navigateTo("/user-group");
};
</script>
