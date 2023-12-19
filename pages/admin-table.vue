<template>
  <div>
    <AdminSortableTable :list="store.dbConnTable" :column="displayContent" />
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const displayContent = {
  connName: "連線名稱",
  connInfoDatabase: "資料庫名稱",
  connInfoHostPort: "主機名稱或IP",
};
</script>
