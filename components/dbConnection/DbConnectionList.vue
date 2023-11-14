<template>
  <div class="bg-white rounded-lg p-5 shadow-custom-lg">
    <ClientOnly>
      <ElTable :data="currentPageData" height="650">
        <ElTableColumn prop="rowNumber" label="編號" width="60" />
        <ElTableColumn prop="connTypeName" label="連線名稱" />
        <ElTableColumn prop="connInfoDatabase" label="資料庫名稱" />
        <ElTableColumn prop="connInfoHostPort" label="主機名稱及IP" />
        <ElTableColumn
          label="狀態"
          sortable
          :sort-method="
            (a, b) => {
              if (a.isActive && !b.isActive) {
                return -1;
              } else if (!a.isActive && b.isActive) {
                return 1;
              } else {
                return 0;
              }
            }
          "
        >
          <template #default="scope">
            <ElSwitch v-model="scope.row.isActive" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作">
          <template #default="scope">
            <img
              src="~/assets/icons/dbConnection/ic_db_edit.svg"
              @click="emits('editSetting', scope.row.connId)"
            />
          </template>
        </ElTableColumn>
      </ElTable>
    </ClientOnly>
    <div class="flex justify-end mt-4">
      <ElPagination
        :current-page="currentPage"
        :page-sizes="[12, 24, 48]"
        :page-size="pageSize"
        :total="list.length"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const currentPage = ref(1);
const pageSize = ref(12);
const props = defineProps<{
  list: DbConnListMap[];
}>();

const emits = defineEmits<{
  editSetting: [id: string];
}>();

const currentPageData = computed(() => {
  return _useChunk(props.list, pageSize.value)[currentPage.value - 1] || [];
});

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
</script>
