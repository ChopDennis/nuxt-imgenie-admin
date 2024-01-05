<template>
  <div class="overflow-scroll h-full pt-6 px-6 pb-16">
    <div class="flex flex-col gap-6">
      <!-- 群組 -->
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
      <!-- 資料模型 -->
      <div class="bg-white rounded-lg p-4 shadow-custom-lg">
        <ElCollapse v-model="dataMart">
          <ElCollapseItem title="" name="1">
            <template #title>
              <h3 class="text-base font-bold ml-4">資料模型</h3>
            </template>
            <ElDivider></ElDivider>
            <div class="pt-4">
              <ElForm class="data-mart-form" :model="form" label-width="150px">
                <ElFormItem label="資料模型">
                  <div class="ml-2 w-full">
                    <div class="flex gap-2">
                      <ElSelect
                        v-model="dataMartNew"
                        style="width: 50%"
                        placeholder="請輸入欲邀請的群組"
                      >
                        <ElOption
                          v-for="(value, index) in dataMartList"
                          :key="index"
                          :label="value.dataMartName"
                          :value="value"
                        ></ElOption>
                      </ElSelect>
                      <ElButton
                        :icon="ElIconPlus"
                        :disabled="!dataMartNew"
                        type="primary"
                        @click="addDataMart"
                        >加入模型</ElButton
                      >
                    </div>
                  </div>
                </ElFormItem>
                <ElFormItem label="資料模型清單">
                  <div class="ml-2 w-full">
                    <ElTable
                      :data="dataMartSetTable"
                      max-height="650"
                      size="large"
                      empty-text="尚未設定"
                    >
                      <ElTableColumn
                        label="資料庫類型"
                        width="100"
                        header-align="center"
                        ><template #default="scope">
                          <div class="flex gap-2 justify-center">
                            <img
                              :src="icons[`ic_${scope.row.dbType}`]"
                              class="w-6"
                              width="24"
                            />
                          </div>
                        </template>
                      </ElTableColumn>
                      <ElTableColumn
                        prop="dataMartName"
                        label="資料模型名稱"
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
                            @click="deleteDataMartRow(scope.$index)"
                          >
                            <div>
                              <ElIconDelete width="16"></ElIconDelete>
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

      <!-- 成員 -->
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
                              <ElIconDelete width="16"></ElIconDelete>
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
      <!-- 使用者群組 -->
      <div class="bg-white rounded-lg p-4 shadow-custom-lg">
        <ElCollapse v-model="userGroup">
          <ElCollapseItem title="" name="1">
            <template #title>
              <h3 class="text-base font-bold ml-4">使用者群組</h3>
            </template>
            <ElDivider></ElDivider>
            <div class="pt-4">
              <ElForm class="data-mart-form" :model="form" label-width="150px">
                <ElFormItem label="邀請群組">
                  <div class="ml-2 w-full">
                    <div class="flex gap-2">
                      <ElSelect
                        v-model="inviteGroup"
                        style="width: 50%"
                        placeholder="請輸入欲邀請的群組"
                      >
                        <ElOption
                          v-for="(value, index) in userGroupList"
                          :key="index"
                          :label="value.groupName"
                          :value="value"
                        ></ElOption>
                      </ElSelect>
                      <ElButton
                        :icon="ElIconPlus"
                        :disabled="!inviteGroup"
                        type="primary"
                        @click="addGroup"
                        >加入群組</ElButton
                      >
                    </div>
                  </div>
                </ElFormItem>
                <ElFormItem label="使用者群組">
                  <div class="ml-2 w-full">
                    <ElTable
                      :data="userGroupSetTable"
                      max-height="650"
                      size="large"
                      empty-text="尚未設定"
                    >
                      <ElTableColumn
                        prop="groupName"
                        label="群組"
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
                            @click="deleteGroupRow(scope.$index)"
                          >
                            <div>
                              <ElIconDelete width="16"></ElIconDelete>
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
    <!-- bg-white rounded-lg p-5 shadow-custom-lg grid-cols-1 grid gap-0 overflow-scroll -->
    <!-- <div class="bg-white rounded-lg p-4 shadow-custom-lg"></div> -->
    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="navigateTo({ path: '/data-mart-group' })"
        >取消</ElButton
      >
      <ElButton type="primary">儲存</ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
const icons = useDbConnIcons();

const userGroup = ref(["1"]);
const group = ref(["1"]);
const member = ref(["1"]);
const dataMart = ref(["1"]);
const memberList = ref([
  {
    memberName: "黃子齊",
    email: "huang.dennis@gmail.com",
  },
]);
const userGroupList = ref([
  {
    groupName: "醫療團隊-A Team",
  },
  {
    groupName: "醫療團隊-B Team",
  },
]);

const dataMartList = ref([{ dbType: "postgresql", dataMartName: "病歷資料" }]);
const invite = ref();
const inviteGroup = ref();
const dataMartNew = ref();
const form = reactive({
  groupName: "",
  description: "",
});
const memberSetTable = ref([
  { memberName: "測試使用者", email: "test@gmail.com" },
]);
const userGroupSetTable = ref([{ groupName: "測試群組" }]);
const dataMartSetTable = ref([{ dbType: "mysql", dataMartName: "測試資料" }]);

const addMember = () => {
  memberSetTable.value.push(invite.value);
};
const addGroup = () => {
  userGroupSetTable.value.push(inviteGroup.value);
};

const addDataMart = () => {
  dataMartSetTable.value.push(dataMartNew.value);
};
const deleteRow = (index: number) => {
  memberSetTable.value.splice(index, 1);
};
const deleteGroupRow = (index: number) => {
  userGroupSetTable.value.splice(index, 1);
};
const deleteDataMartRow = (index: number) => {
  dataMartSetTable.value.splice(index, 1);
};
</script>
