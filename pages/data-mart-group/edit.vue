<template>
  <div class="overflow-scroll h-full pt-4 px-6 pb-16">
    <div class="flex flex-col gap-6">
      <!-- 群組 -->
      <DataMartGroupInfo ref="dataMartGroupInfoRef" />
      <!-- 資料模型 -->
      <DataMartGroupDataMartForm ref="dataMartGroupDataMartFormRef" />
      <ElDivider
        ><div class="flex justify-center">
          <div class="text-red-500 self-center pr-1">
            <img src="~/assets/icons/data-mart/ic_important.svg" />
          </div>
          <div>
            <p class="text-base font-bold" style="color: #373c55">
              成員/使用者群組 至少擇一選填
            </p>
          </div>
        </div></ElDivider
      >
      <!-- 成員 -->
      <DataMartGroupUserForm />

      <!-- 使用者群組 -->
      <DataMartGroupUserGroupForm />
    </div>

    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="navigateTo({ path: '/data-mart-group' })"
        >取消</ElButton
      >
      <ElButton type="primary" @click="saveDataMartGroup">儲存</ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataMartGroupInfo from "~/components/dataMartGroup/DataMartGroupInfo.vue";
import DataMartGroupDataMartForm from "~/components/dataMartGroup/DataMartGroupDataMartForm.vue";
onNuxtReady(async () => {
  await useDataMartGroup().getDataMartGroupMembers();
  await useDataMart().getDataMartList();
  await useUserGroup().getUsers();
  await useUserGroup().getUserGroups();
});
const dataMartGroupInfoRef = ref<InstanceType<typeof DataMartGroupInfo>>();
const dataMartGroupDataMartFormRef =
  ref<InstanceType<typeof DataMartGroupDataMartForm>>();
useDataMartGroup().resetDataMartGroup();
const saveDataMartGroup = async () => {
  const dataMartGroupStore = useDataMartGroupStore();
  dataMartGroupStore.members = useForm().trim(dataMartGroupStore.members);

  const { datamartGroupName, description, datamarts, userGroups, users } =
    dataMartGroupStore.members;

  if (datamartGroupName === "" && description === "") {
    console.log("請填寫名稱和簡述");
  } else if (datamarts.length === 0) {
    console.log("請選擇 DataMart");
  } else if (userGroups.length === 0 && users.length === 0) {
    console.log("成員和成員群組請擇一選擇");
  } else {
    await useDataMartGroup().saveDataMartGroup();
    navigateTo("/data-mart-group");
  }
};
</script>
