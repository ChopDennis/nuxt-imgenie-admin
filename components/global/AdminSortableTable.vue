<template>
  <div>
    <div class="bg-white rounded-lg p-4 shadow-custom-lg">
      <ClientOnly>
        <ElTable
          :data="currentPageData"
          size="large"
          :height="tableHeight"
          @sort-change="sortChange"
          ><ElTableColumn
            v-if="
              useRoute().path === '/db-connection' ||
              useRoute().path === '/data-mart'
            "
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
          </ElTableColumn>
          <template #empty
            ><div class="flex w-full h-full justify-center">
              <img src="~/assets/images/imgenie_empty_table.svg" /></div
          ></template> </ElTable
      ></ClientOnly>
      <div class="flex justify-end mt-4 items-center gap-4">
        <div>
          共 {{ props.list.length }} 筆 第 {{ currentPage }} /
          {{ Math.ceil(props.list.length / pageSize) }} 頁
        </div>
        <ElPagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="props.list.length"
          background
          layout=" prev, pager, next"
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
const dataMartStore = useDataMartStore();
const sortOrder = ref<"desc" | "asc" | null>(null);
const tableHeight = ref(500);
const sortProp = ref("");
const currentPage = ref(1);
const pageSize = computed(() => Math.floor(tableHeight.value / 60) + 5);

const sortTable = computed(() =>
  !isNull(sortOrder.value)
    ? _useOrderBy(props.list, [sortProp.value], [sortOrder.value])
    : props.list,
);
const currentPageData = computed(
  () => _useChunk(sortTable.value, pageSize.value)[currentPage.value - 1] || [],
);
const icons = useDbConnIcons();

const changRowSwitch = async (id: string, value: boolean) => {
  if (useRoute().path === "/data-mart") {
    return await dataMartStore.getDataMartUpdate(id, value);
  } else {
    return await store.getDbConnUpdate(id, value);
  }
};

const clickRowEditBtn = async (id: string) => {
  if (useRoute().path === "/data-mart") {
    navigateTo({
      path: "/data-mart/edit",
      query: {
        datamartId: id,
      },
    });
  }

  if (useRoute().path === "/db-connection") {
    await store.getDbConnQuery(id);
    store.dbConnSetIsNew = false;
    store.dbConnDialog.connSetting = true;
  }

  if (useRoute().path === "/user-group") {
    navigateTo({
      path: "/user-group/edit",
    });
  }
  if (useRoute().path === "/data-mart-group") {
    navigateTo({
      path: "/data-mart-group/edit",
    });
  }
};

const sortChange = ({ prop, order }: SortChangeParams) => {
  sortProp.value = prop;
  sortOrder.value =
    order === "descending" ? "desc" : order === "ascending" ? "asc" : null;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

const getBrowserHeight = () => {
  tableHeight.value = window.innerHeight - 284;
};
if (process.client) {
  getBrowserHeight();
  window.addEventListener("resize", _useDebounce(getBrowserHeight, 200));
}

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", _useDebounce(getBrowserHeight, 200));
  }
});
</script>
