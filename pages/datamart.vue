<template>
  <div>
    <div class="px-5 flex">
      <p class="text-gray-300">首頁／系統管理／</p>
      <p>Data Mart</p>
    </div>
    <div>{{ store.dataMartList }}</div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
await store.getDataMartList(true);
</script>
<style scoped></style>
