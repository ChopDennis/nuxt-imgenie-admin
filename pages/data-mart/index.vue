<template>
  <div>
    <div v-if="!store.isEdit">
      <GlobalSortableTable :list="store.table">
        <template #column>
          <TableColumnDbType />
          <ElTableColumn prop="dataMartName" label="資料模型名稱" sortable />

          <ElTableColumn prop="connName" label="連線名稱" sortable>
            <template #default="scope">
              <div class="flex items-center gap-1">
                <div>{{ scope.row.connName }}</div>
                <div v-if="scope.row.isConnUpdated">
                  <ElTooltip
                    content="資料庫連線已修改，請確認連線設定資訊是否正確"
                    effect="light"
                    placement="bottom"
                    ><ElIconWarning width="16" style="color: lightcoral"
                  /></ElTooltip>
                </div>
              </div>
            </template>
          </ElTableColumn>
          <TableColumnIsActivate />
          <TableColumnEdit v-model:edit="store.isEdit" v-model:id="id" />
        </template>
      </GlobalSortableTable>
    </div>
    <div v-else>
      <DataMartEdit v-model:id="id" />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
onMounted(async () => {
  await useDataMartApi().getTable();
});
const id = ref<string>("");
</script>
