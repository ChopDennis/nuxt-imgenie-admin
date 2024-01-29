<template>
  <div class="bg-white rounded-lg p-4 shadow-custom-lg">
    <ElCollapse v-model="groupCollapse">
      <ElCollapseItem title="" name="1">
        <template #title>
          <h3 class="text-base font-bold ml-4">群組</h3>
        </template>
        <ElDivider></ElDivider>
        <div class="pt-4">
          <ElForm
            class="data-mart-form"
            :model="userGroupStore.members"
            :rules="useForm().userGroupRules"
            label-width="150px"
          >
            <ElFormItem label="群組名稱" prop="userGroupName">
              <div class="ml-2 w-full">
                <ElInput
                  v-model="userGroupStore.members.userGroupName"
                ></ElInput>
              </div>
            </ElFormItem>
            <ElFormItem label="簡述" prop="description">
              <div class="ml-2 w-full">
                <ElInput v-model="userGroupStore.members.description"></ElInput>
              </div>
            </ElFormItem>
          </ElForm>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>
<script setup lang="ts">
const userGroupStore = useUserGroupStore();
const groupCollapse = ref(["1"]);
</script>
