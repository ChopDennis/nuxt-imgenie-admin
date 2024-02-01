<template>
  <div class="bg-white rounded-lg p-4 shadow-custom-lg">
    <ElCollapse v-model="dataMartCollapse">
      <ElCollapseItem title="" name="1">
        <template #title>
          <h3 class="text-base font-bold ml-4">資料模型</h3>
        </template>
        <ElDivider></ElDivider>
        <div class="pt-4">
          <ElForm
            class="data-mart-form"
            :model="dataMartGroupStore.members"
            :rules="useForm().dataMartGroupRules"
            label-width="150px"
          >
            <ElFormItem label="資料模型">
              <GroupCollapseSelect
                :options="nonGroupDataMart"
                :label="{
                  selectNoDataText: '查無此資料模型',
                  selectPlaceholder: '請輸入欲加入的資料模型',
                  updateButton: '加入模型',
                }"
                @update-selected-id="updateDataMarts"
              >
              </GroupCollapseSelect>
            </ElFormItem>
            <ElFormItem
              class="form-table"
              label="資料模型清單"
              prop="datamarts"
            >
              <ElCheckboxGroup v-model="dataMartGroupStore.save.datamartIds" />
              <GroupCollapseTable
                :table="dataMartGroupStore.members.datamarts"
                @delete-row="deleteDataMart"
              >
                <template #columns>
                  <ElTableColumn
                    prop="dbType"
                    label="資料庫類型"
                    header-align="center"
                    align="center"
                    width="100"
                  >
                    <template #default="scope">
                      <div class="flex gap-2 justify-center">
                        <img
                          :src="icons[`${scope.row.icon.split('.')[0]}`]"
                          class="w-6"
                          width="24"
                        />
                      </div>
                    </template>
                  </ElTableColumn>
                  <ElTableColumn
                    prop="datamartName"
                    label="資料模型名稱"
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
const dataMartStore = useDataMartStore();
const dataMartGroupStore = useDataMartGroupStore();
const dataMartCollapse = ref(["1"]);
const icons = useDbConnIcons();

watch(dataMartGroupStore.members.datamarts, (value) => {
  dataMartGroupStore.save.datamartIds = _useMap(value, "datamartId");
});

const nonGroupDataMart = computed(() =>
  _useMap(
    _useDifferenceBy(
      dataMartStore.list,
      dataMartGroupStore.members.datamarts,
      "datamartId",
    ),
    ({ datamartId, dataMartName, dbType }) => ({
      id: datamartId,
      name: dataMartName,
      dbType,
    }),
  ),
);

const updateDataMarts = (datamartId: string) => {
  const selectedDataMart = _useFind(dataMartStore.list, [
    "datamartId",
    datamartId,
  ]);

  if (selectedDataMart) {
    const { datamartId, dataMartName: datamartName, icon } = selectedDataMart;

    dataMartGroupStore.members.datamarts.push({
      datamartId,
      datamartName,
      icon,
    });
  }
};

const deleteDataMart = (index: number) => {
  dataMartGroupStore.members.datamarts.splice(index, 1);
};
</script>
