<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      <ClientOnly>
        <ElTable :data="currentPageData" max-height="650" size="large">
          <ElTableColumn
            prop="rowNumber"
            label="編號"
            width="70"
            align="center"
          />
          <ElTableColumn
            prop="dataMartName"
            label="Data Mart 名稱"
            min-width="150"
          />
          <ElTableColumn
            prop="dbType"
            label="資料庫類型"
            width="120"
            align="center"
            ><template #default="">
              <img
                class="m-auto"
                src="~/assets/icons/dbConnection/ic_postgresql.svg"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="connName" label="資料庫來源" min-width="150" />
          <ElTableColumn prop="updateTime" label="建立時間" min-width="150" />
          <ElTableColumn
            label="狀態"
            align="center"
            width="90"
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
              <ElSwitch
                v-model="scope.row.isActivate"
                @change="
                  changeDataMartActivate(
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
      </ClientOnly>
      <div class="flex justify-end mt-4">
        <ElPagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 40]"
          :page-size="pageSize"
          :total="store.dataMartList.length"
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
const store = useDataMartStore();
const currentPage = ref(1);
const pageSize = ref(10);

const currentPageData = computed(() => {
  return (
    _useChunk(store.dataMartList, pageSize.value)[currentPage.value - 1] || []
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
    path: "/datamart/edit",
    query: {
      datamartId,
    },
  });
};

const changeDataMartActivate = async (
  connId: string,
  isActivate: boolean,
): Promise<boolean> => {
  return await store.getDataMartUpdate(connId, isActivate);
};
</script>
