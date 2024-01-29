<template>
  <div class="bg-white rounded-lg p-4 shadow-custom-lg">
    <ElCollapse v-model="userGroupCollapse">
      <ElCollapseItem title="" name="1">
        <template #title>
          <h3 class="text-base font-bold ml-4">使用者群組</h3>
        </template>
        <ElDivider></ElDivider>
        <div class="pt-4">
          <ElForm
            class="data-mart-form"
            :model="dataMartGroupStore.save"
            :rules="useForm().dataMartGroupRules"
            label-width="150px"
          >
            <ElFormItem label="邀請群組">
              <GroupCollapseSelect
                :options="nonGroupUserGroups"
                :label="{
                  selectNoDataText: '查無此群組',
                  selectPlaceholder: '請輸入欲邀請的群組',
                  updateButton: '加入群組',
                }"
                @update-selected-id="updateUserGroups"
              >
              </GroupCollapseSelect>
            </ElFormItem>

            <ElFormItem
              class="form-table"
              label="資料模型清單"
              prop="userGroupIds"
            >
              <ElCheckboxGroup v-model="dataMartGroupStore.save.userGroupIds" />
              <GroupCollapseTable
                :table="dataMartGroupStore.members.userGroups"
                @delete-row="deleteUserGroup"
              >
                <template #columns>
                  <ElTableColumn
                    prop="userGroupName"
                    label="群組名稱"
                    min-width="150"
                  />
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
const dataMartGroupStore = useDataMartGroupStore();
const userGroupCollapse = ref(["1"]);

watch(dataMartGroupStore.members.userGroups, (value) => {
  dataMartGroupStore.save.userGroupIds = _useMap(value, "userGroupId");
});

const nonGroupUserGroups = computed(() =>
  _useMap(
    _useDifferenceBy(
      userGroupStore.groups,
      dataMartGroupStore.members.userGroups,
      "userGroupId",
    ),
    ({ userGroupId, userGroupName }) => ({
      id: userGroupId,
      name: userGroupName,
    }),
  ),
);

const updateUserGroups = (userGroupId: string) => {
  const selectedUserGroups = _useFind(userGroupStore.groups, [
    "userGroupId",
    userGroupId,
  ]);

  if (selectedUserGroups) {
    const { userGroupId, userGroupName } = selectedUserGroups;
    dataMartGroupStore.members.userGroups.push({
      userGroupId,
      userGroupName,
    });
  }
};

const deleteUserGroup = (index: number) => {
  dataMartGroupStore.members.userGroups.splice(index, 1);
};
</script>
