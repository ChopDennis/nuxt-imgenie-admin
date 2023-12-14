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
            ><template #default="">
              <img
                class="m-auto"
                src="~/assets/icons/dbConnection/ic_postgresql.svg"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn
            prop="dataMartName"
            label="資料模型名稱"
            min-width="250"
            sortable
          />
          <ElTableColumn
            prop="connName"
            label="資料庫來源"
            min-width="250"
            sortable
          />
          <ElTableColumn
            prop="isActivate"
            label="狀態"
            align="center"
            width="90"
            sortable
          >
            <template #default="scope">
              <ElSwitch
                v-model="scope.row.isActivate"
                @change="
                  store.getDataMartUpdate(
                    scope.row.datamartId,
                    scope.row.isActivate,
                  )
                "
              />
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="90" align="center">
            <template #default="scope">
              <img
                class="m-auto"
                src="~/assets/icons/dbConnection/ic_db_edit.svg"
                @click="toEditDataMart(scope.row.datamartId)"
              />
            </template>
          </ElTableColumn>
        </ElTable>
        <div class="flex justify-end mt-4">
          <ElPagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 40]"
            :page-size="pageSize"
            :total="props.table.length"
            background
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const props = defineProps<{
  table: DataMartTable[];
}>();
const sortTable = ref<any>(props.table);

const currentPage = ref(1);
const pageSize = ref(10);

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

const toEditDataMart = async (datamartId: string) => {
  await navigateTo({
    path: "/data-mart/edit",
    query: {
      datamartId,
    },
  });
};

interface SortChangeParams {
  prop: string;
  order: "descending" | "ascending";
}

const sortChange = ({ prop, order }: SortChangeParams) => {
  if (order === "descending")
    sortTable.value = _useOrderBy(props.table, [prop], ["desc"]);
  if (order === "ascending")
    sortTable.value = _useOrderBy(props.table, [prop], ["asc"]);
  else sortTable.value = props.table;
};
</script>
