<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      <ClientOnly>
        <ElTable
          :data="currentPageData"
          max-height="650"
          size="large"
          @sort-change="sortChange"
        >
          <ElTableColumn
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
            prop="connName"
            label="連線名稱"
            min-width="150"
            sortable
          >
          </ElTableColumn>
          <ElTableColumn
            prop="connInfoDatabase"
            label="資料庫名稱"
            min-width="150"
            sortable
          />
          <ElTableColumn
            prop="connInfoHostPort"
            label="主機名稱或ＩＰ"
            min-width="150"
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
                @change="
                  changeDbActivate(scope.row.connId, scope.row.isActivate)
                "
              />
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="90" align="center">
            <template #default="scope">
              <img
                class="m-auto"
                src="~/assets/icons/dbConnection/ic_db_edit.svg"
                @click="clickEditActiveConn(scope.row.connId)"
              />
            </template>
          </ElTableColumn>
        </ElTable>
      </ClientOnly>
      <div class="flex justify-end mt-4">
        <ElPagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 40]"
          :page-size="pageSize"
          :total="store.dbConnTable.length"
          background
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const currentPage = ref(1);
const pageSize = ref(10);
const icons = dynamicImportDbConnectionIcons();
const sortTable = ref<any>(store.dbConnTable);
const currentPageData = computed(() => {
  return (
    _useChunk(sortTable.value, pageSize.value)[currentPage.value - 1] || []
  );
});

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

const clickEditActiveConn = async (id: string) => {
  await store.getDbConnQuery(id);
  store.dbConnSetIsNew = false;
  store.dbConnDialog.connSetting = true;
};

const changeDbActivate = async (
  connId: string,
  isActivate: boolean,
): Promise<boolean> => {
  return await store.getDbConnUpdate(connId, isActivate);
};

interface SortChangeParams {
  prop: string;
  order: "descending" | "ascending";
}

const sortChange = ({ prop, order }: SortChangeParams) => {
  if (order === "descending")
    sortTable.value = _useOrderBy(store.dbConnTable, [prop], ["desc"]);
  if (order === "ascending")
    sortTable.value = _useOrderBy(store.dbConnTable, [prop], ["asc"]);
  else sortTable.value = store.dbConnTable;
};
</script>
