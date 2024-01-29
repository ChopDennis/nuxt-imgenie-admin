<template>
  <div class="overflow-scroll h-full pt-4 px-6 pb-16">
    <div class="flex flex-col gap-6">
      <!-- 群組 -->
      <DataMartGroupInfo />
      <!-- 資料模型 -->
      <DataMartGroupDataMartForm />
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
    <ElForm
      ref="dataMartGroupSaveFormRef"
      :rules="useForm().dataMartGroupRules"
      :model="dataMartGroupStore.save"
    >
      <ElFormItem prop="datamartGroupName"> </ElFormItem>
      <ElFormItem prop="description"> </ElFormItem>
      <ElFormItem prop="datamartIds"> </ElFormItem>
      <ElFormItem prop="userIds"> </ElFormItem>
      <ElFormItem prop="userGroupIds"> </ElFormItem>
    </ElForm>
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
import type { FormInstance } from "element-plus";
const dataMartGroupSaveFormRef = ref<FormInstance>();
onNuxtReady(async () => {
  await useDataMartGroup().getDataMartGroupMembers();
  await useDataMart().getDataMartList();
  await useUserGroup().getUsers();
  await useUserGroup().getUserGroups();
});
const dataMartGroupStore = useDataMartGroupStore();
useDataMartGroup().resetDataMartGroup();
const saveDataMartGroup = async () => {
  const valid = await useForm().validate(dataMartGroupSaveFormRef.value);
  // const isNotEmpty = _useEvery(dataMartGroupStore.members, (value) => {
  //   // 检查值是否不是空字符串且不是空数组
  //   return !(isEmpty(value) || (isArray(value) && isEmpty(value)));
  // });
  if (valid) {
    console.log(dataMartGroupSaveFormRef.value);

    // await useDataMartGroup().saveDataMartGroup();
    // navigateTo("/data-mart-group");
  } else {
    console.log("欄位不可為空");
  }
};
</script>
