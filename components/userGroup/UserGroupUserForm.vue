<template>
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
            :rules="useForm().dataMartGroupRules"
            label-width="150px"
          >
            <ElFormItem label="邀請成員">
              <GroupCollapseSelect
                :options="nonGroupUsers"
                :label="{
                  selectNoDataText: '查無此成員',
                  selectPlaceholder: '請輸入欲邀請成員的 Mail 或名稱',
                  updateButton: '加入成員',
                }"
                @update-selected-id="updateMembers"
              />
            </ElFormItem>
            <ElFormItem class="form-table" label="成員名單" prop="users">
              <ElCheckboxGroup v-model="userGroupStore.save.userIds" />
              <GroupCollapseTable
                :table="userGroupStore.members.users"
                @delete-row="deleteMember"
              >
                <template #columns>
                  <ElTableColumn prop="userName" label="成員" min-width="150" />
                  <ElTableColumn prop="email" label="帳號" min-width="150" />
                </template>
              </GroupCollapseTable>
            </ElFormItem>
          </ElForm>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>
<script setup lang="ts">
const userGroupStore = useUserGroupStore();
const member = ref(["1"]);

watch(userGroupStore.members.users, (value) => {
  userGroupStore.save.userIds = _useMap(value, "userId");
});

const nonGroupUsers = computed(() =>
  _useMap(
    _useDifferenceBy(
      userGroupStore.users,
      userGroupStore.members.users,
      "userId",
    ),
    ({ userId, userName, email }) => ({
      id: userId,
      name: `[${userName}] ${email}`,
    }),
  ),
);

const updateMembers = (userId: string) => {
  const selectedMember = _useFind(userGroupStore.users, ["userId", userId]);
  if (selectedMember) {
    userGroupStore.members.users.push(selectedMember);
  }
};

const deleteMember = (index: number) => {
  userGroupStore.members.users.splice(index, 1);
};
</script>
