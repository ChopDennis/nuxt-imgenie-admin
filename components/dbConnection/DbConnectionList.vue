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
              if (a.isActivate && !b.isActivate) {
                return -1;
              } else if (!a.isActivate && b.isActivate) {
                return 1;
              } else {
                return 0;
              }
            }
          "
        >
          <template #default="scope">
            <ElSwitch v-model="scope.row.isActivate" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作">
          <template #default="scope">
            <img
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
        :page-sizes="[12, 24, 48]"
        :page-size="pageSize"
        :total="store.dbConnListMap.length"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const currentPage = ref(1);
const pageSize = ref(12);

const currentPageData = computed(() => {
  return (
    _useChunk(store.dbConnListMap, pageSize.value)[currentPage.value - 1] || []
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
  store.dbConnSetTitle = store.dbConnQueryRes.dbType;
  store.dbConnSetIsNew = false;
  store.dbConnDialog.connSetting = true;
};
</script>
