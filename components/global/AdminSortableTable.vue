<template>
  <div class="p-6">
    <div class="bg-white rounded-lg p-4 shadow-custom-lg">
      <ClientOnly>
        <ElTable :data="currentPageData" size="large" @sort-change="sortChange"
          ><ElTableColumn
            prop="dbType"
            label="資料庫類型"
            width="150"
            align="center"
            sortable
          >
            <template #default="scope">
              <div>
                <img
                  :src="icons[`ic_${scope.row.dbType}`]"
                  class="m-auto"
                  width="24"
                />
              </div>
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-for="(value, index) in column"
            :key="index"
            :prop="index.toString()"
            :label="value"
            sortable
          />
          <ElTableColumn
            prop="isActivate"
            label="狀態"
            width="90"
            align="center"
            sortable
          >
            <template #default="scope">
              <ElSwitch
                v-model="scope.row.isActivate"
                @change="changRowSwitch(scope.row.id, scope.row.isActivate)"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="90" align="center">
            <template #default="scope">
              <img
                class="m-auto"
                src="~/assets/icons/dbConnection/ic_db_edit.svg"
                @click="clickRowEditBtn(scope.row.id)"
              />
            </template>
          </ElTableColumn> </ElTable
      ></ClientOnly>
      <div class="flex justify-end mt-4">
        <ElPagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="props.list.length"
          background
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends { id: string; isActivate: boolean }">
interface SortChangeParams {
  prop: string;
  order: "descending" | "ascending" | null;
}

const props = defineProps<{
  list: T[];
  column: {
    [keys: string]: string;
  };
}>();

const store = useDbConnectionStore();
const sortOrder = ref<"desc" | "asc" | null>(null);
const sortProp = ref("");
const currentPage = ref(1);
const pageSize = ref(10);

const sortTable = computed(() =>
  !isNull(sortOrder.value)
    ? _useOrderBy(props.list, [sortProp.value], [sortOrder.value])
    : props.list,
);
const currentPageData = computed(
  () => _useChunk(sortTable.value, pageSize.value)[currentPage.value - 1] || [],
);
const icons = dynamicImportDbConnectionIcons();

const changRowSwitch = async (id: string, value: boolean) => {
  return await store.getDbConnUpdate(id, value);
};

const clickRowEditBtn = async (id: string) => {
  await store.getDbConnQuery(id);
  store.dbConnSetIsNew = false;
  store.dbConnDialog.connSetting = true;
};

const sortChange = ({ prop, order }: SortChangeParams) => {
  sortProp.value = prop;
  sortOrder.value =
    order === "descending" ? "desc" : order === "ascending" ? "asc" : null;
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
</script>
