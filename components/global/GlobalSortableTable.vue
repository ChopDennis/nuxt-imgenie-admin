<template>
  <div class="pt-4 px-6 pb-6">
    <div class="bg-white rounded-lg p-4 shadow-custom-lg">
      <ClientOnly>
        <ElTable
          :data="currentPageData"
          size="large"
          :height="tableHeight"
          @sort-change="sortChange"
        >
          <slot name="column"></slot>
          <template #empty
            ><div class="flex w-full h-full justify-center">
              <img src="~/assets/images/imgenie_empty_table.svg" /></div
          ></template>
        </ElTable>
      </ClientOnly>
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
<script setup lang="ts" generic="T">
interface SortChangeParams {
  prop: string;
  order: "descending" | "ascending" | null;
}

const props = defineProps<{
  list: T[];
}>();

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

const sortChange = ({ prop, order }: SortChangeParams) => {
  sortProp.value = prop;
  sortOrder.value =
    order === "descending" ? "desc" : order === "ascending" ? "asc" : null;
};

// const sortChange = (sort: { prop: any; order: any }) => {
//   // Sort the entire dataset here
//   const data = props.list as { [key: string]: any }[];
//   data.sort((a, b) => {
//     const valA = a[sort.prop];
//     const valB = b[sort.prop];

//     // Type guards to ensure correct types
//     if (typeof valA === "string" && typeof valB === "string") {
//       if (sort.order === "ascending") {
//         return valA.localeCompare(valB);
//       } else {
//         return valB.localeCompare(valA);
//       }
//     } else if (typeof valA === "boolean" && typeof valB === "boolean") {
//       // Handle boolean values (if needed)
//       return valA === valB ? 0 : valA ? -1 : 1;
//     }
//     // Handle the case where either valA or valB is null
//     // You might want to adjust this behavior based on your requirements
//     return 0;
//   });
//   currentPage.value = 1;
// };

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
