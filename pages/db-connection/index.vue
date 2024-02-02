<template>
  <div>
    <!-- 資料庫列表 -->
    <GlobalSortableTable :list="store.table">
      <template #column>
        <!-- 資料庫類型 -->
        <TableColumnDbType />
        <!-- 其他欄位 -->
        <ElTableColumn prop="connName" label="連線名稱" sortable />
        <ElTableColumn prop="database" label="資料庫名稱" sortable />
        <ElTableColumn prop="host" label="主機名稱或IP" sortable />
        <!-- 狀態 -->
        <TableColumnIsActivate />
        <!-- 操作 -->
        <TableColumnEdit />
      </template>
      <!-- 空值 -->
    </GlobalSortableTable>

    <!-- 選擇連線類型 -->
    <DbConnectionTypes />

    <!-- 資料庫連線設定 -->
    <DbConnectionSetting>
      <template #alert>
        <!-- 資料庫連線成功 -->
        <ElAlert
          v-if="store.test.status"
          title="連線成功"
          type="success"
          show-icon
          class="font-black"
        />
        <!-- 資料庫連線失敗 -->
        <ElAlert
          v-if="!store.test.status && !isNull(store.test.status)"
          :title="`無法連結到: ${store.setting.form.host}:${store.setting.form.port}`"
          :description="`${store.test.message}`"
          type="error"
          show-icon
        />
      </template>
    </DbConnectionSetting>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const isEdit = ref<boolean>(false);
onNuxtReady(async () => {
  await useDbConnectionApi().getTable();
});
</script>
