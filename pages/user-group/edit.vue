<template>
  <div class="overflow-scroll h-full pt-4 px-6 pb-16">
    <div class="flex flex-col gap-6">
      <div class="bg-white rounded-lg p-4 shadow-custom-lg">
        <ElCollapse v-model="group">
          <ElCollapseItem title="" name="1">
            <template #title>
              <h3 class="text-base font-bold ml-4">群組</h3>
            </template>
            <ElDivider></ElDivider>
            <div class="pt-4">
              <ElForm
                class="data-mart-form"
                :model="userGroupStore.members"
                label-width="150px"
              >
                <ElFormItem label="資料模型名稱">
                  <div class="ml-2 w-full">
                    <ElInput
                      v-model="userGroupStore.members.userGroupName"
                    ></ElInput>
                  </div>
                </ElFormItem>
                <ElFormItem label="簡述">
                  <div class="ml-2 w-full">
                    <ElInput
                      v-model="userGroupStore.members.description"
                    ></ElInput>
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
              <ElForm
                class="data-mart-form"
                :model="userGroupStore.members"
                label-width="150px"
              >
                <ElFormItem label="邀請成員">
                  <div class="ml-2 w-full">
                    <div class="flex gap-2">
                      <ElSelect
                        v-model="selectUserId"
                        clearable
                        filterable
                        remote
                        remote-show-suffix
                        no-data-text="查無此成員"
                        :remote-method="remoteMethod"
                        :loading="loading"
                        style="width: 50%"
                        placeholder="請輸入欲邀請成員的 Mail 或名稱"
                      >
                        <ElOption
                          v-for="user in userGroupOption"
                          :key="user.userId"
                          :label="user.userName"
                          :value="user.userId"
                        ></ElOption>
                      </ElSelect>
                      <ElButton
                        :icon="ElIconPlus"
                        :disabled="!selectUserId"
                        type="primary"
                        @click="addMember"
                        >加入成員</ElButton
                      >
                    </div>
                  </div>
                </ElFormItem>
                <ElFormItem class="form-table" label="成員名單">
                  <div class="ml-2 w-full">
                    <ElTable
                      :data="userGroupStore.members.users"
                      max-height="650"
                      size="large"
                      empty-text="尚未設定"
                    >
                      <ElTableColumn
                        prop="userName"
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
    </div>
    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="navigateTo({ path: '/user-group' })">取消</ElButton>
      <ElButton type="primary" @click="saveMember()">儲存</ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
onNuxtReady(async () => {
  if (!isEmpty(useRoute().query)) {
    await useUserGroup().getUserGroupMembers();
  }
  await useUserGroup().getUsers();
});
const userGroupStore = useUserGroupStore();
const group = ref(["1"]);
const member = ref(["1"]);
const loading = ref(false);
const selectUserId = ref("");

const nonUser = computed(() =>
  _useDifferenceBy(
    userGroupStore.users,
    userGroupStore.members.users,
    "userId",
  ),
);
const userGroupOption = ref();
userGroupOption.value = nonUser.value;

const remoteMethod = (searchText: string) => {
  if (searchText) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      userGroupOption.value = _useFilter(nonUser.value, (user) => {
        const text = searchText.toLocaleLowerCase();
        const connName = user.userName.toLocaleLowerCase();
        return (
          _useIncludes(connName, text) || _useIncludes(user.userName, text)
        );
      });
    }, 200);
  } else {
    userGroupOption.value = nonUser.value;
  }
};

const addMember = () => {
  const selectMember = _useFind(userGroupStore.users, [
    "userId",
    selectUserId.value,
  ]);
  if (selectMember) {
    userGroupStore.members.users.push(selectMember);
    selectUserId.value = "";
    userGroupOption.value = nonUser.value;
  }
};
const deleteRow = (index: number) => {
  userGroupStore.members.users.splice(index, 1);
  userGroupOption.value = nonUser.value;
};
const saveMember = async () => {
  await useUserGroup().saveUserGroup();
  navigateTo("/user-group");
};
</script>
