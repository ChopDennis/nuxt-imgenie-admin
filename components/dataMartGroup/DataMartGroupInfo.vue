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
            :rules="useForm().dataMartGroupRules"
            :model="dataMartGroupStore.members"
            class="data-mart-form"
            label-width="150"
          >
            <ElFormItem label="群組名稱" prop="datamartGroupName">
              <div class="ml-2 w-full">
                <ElInput
                  v-model="dataMartGroupStore.members.datamartGroupName"
                ></ElInput>
              </div>
            </ElFormItem>
            <ElFormItem label="簡述" prop="description">
              <div class="ml-2 w-full">
                <ElInput
                  v-model="dataMartGroupStore.members.description"
                ></ElInput>
              </div>
            </ElFormItem>
          </ElForm>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>
<script setup lang="ts">
const dataMartGroupStore = useDataMartGroupStore();
const groupCollapse = ref(["1"]);
</script>
