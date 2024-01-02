<template>
  <div>
    <div class="flex flex-col gap-6">
      <div class="bg-white rounded-lg p-4 shadow-custom-lg">
        <ElCollapse v-model="group">
          <ElCollapseItem title="" name="1">
            <template #title>
              <h3 class="text-base font-bold ml-4">群組</h3>
            </template>
            <ElDivider></ElDivider>
            <div class="pt-4">
              <ElForm class="data-mart-form" :model="form" label-width="150px">
                <ElFormItem label="資料模型名稱">
                  <div class="ml-2 w-full">
                    <ElInput v-model="form.groupName"></ElInput>
                  </div>
                </ElFormItem>
                <ElFormItem label="簡述">
                  <div class="ml-2 w-full">
                    <ElInput v-model="form.description"></ElInput>
                  </div>
                </ElFormItem>
              </ElForm>
            </div>
          </ElCollapseItem>
        </ElCollapse>
      </div>
      <div class="bg-white rounded-lg p-4 shadow-custom-lg">
        <ElCollapse v-model="member">
          <ElCollapseItem title="" name="1">
            <template #title>
              <h3 class="text-base font-bold ml-4">成員</h3>
            </template>
            <ElDivider></ElDivider>
            <div class="pt-4">
              <ElForm class="data-mart-form" :model="form" label-width="150px">
                <ElFormItem label="邀請成員">
                  <div class="ml-2 w-full">
                    <div class="flex gap-2">
                      <ElSelect
                        v-model="invite"
                        style="width: 50%"
                        placeholder="請輸入欲邀請成員的 Mail 或名稱"
                      >
                        <ElOption
                          v-for="(value, index) in memberList"
                          :key="index"
                          :label="`${value.memberName} ${value.email}`"
                          :value="value"
                        ></ElOption>
                      </ElSelect>
                      <ElButton
                        :icon="ElIconPlus"
                        :disabled="!invite"
                        type="primary"
                        @click="addMember"
                        >加入成員</ElButton
                      >
                    </div>
                  </div>
                </ElFormItem>
                <ElFormItem label="成員名單">
                  <div class="ml-2 w-full">
                    <ElTable
                      :data="memberSetTable"
                      max-height="650"
                      size="large"
                      empty-text="尚未設定"
                    >
                      <ElTableColumn
                        prop="memberName"
                        label="成員"
                        min-width="150"
                      />
                      <ElTableColumn
                        prop="email"
                        label="帳號"
                        min-width="150"
                      />

                      <ElTableColumn
                        label="操作"
                        header-align="center"
                        width="90"
                      >
                        <template #default="scope">
                          <div
                            class="flex justify-center w-full"
                            src="~/assets/icons/dbConnection/ic_db_edit.svg"
                            @click="deleteRow(scope.$index)"
                          >
                            <div>
                              <ElIconDelete width="24"></ElIconDelete>
                            </div>
                          </div>
                        </template>
                      </ElTableColumn>
                    </ElTable>
                  </div>
                </ElFormItem>
              </ElForm>
            </div>
          </ElCollapseItem>
        </ElCollapse>
      </div>
    </div>

    <!-- <div class="bg-white rounded-lg p-4 shadow-custom-lg"></div> -->
    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="navigateTo({ path: '/user-group' })">取消</ElButton>
      <ElButton type="primary">儲存</ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
const group = ref(["1"]);
const member = ref(["1"]);
const memberList = ref([
  {
    memberName: "黃子齊",
    email: "huang.dennis@gmail.com",
  },
]);
const invite = ref();
const form = reactive({
  groupName: "",
  description: "",
});
const memberSetTable = ref([
  { memberName: "測試使用者", email: "test@gmail.com" },
]);

const addMember = () => {
  memberSetTable.value.push(invite.value);
};
const deleteRow = (index: number) => {
  memberSetTable.value.splice(index, 1);
};
</script>
