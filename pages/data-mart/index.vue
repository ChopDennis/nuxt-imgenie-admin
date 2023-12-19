<template>
  <div>
    <AdminSortableTable :list="store.dataMartTable" :column="column" />
  </div>
</template>
<script setup lang="ts">
const pageLayout = useLayoutStore().pageLayout[useRoute().path];
const store = useDataMartStore();
await store.getDataMartTable();
const column = computed(() => pageLayout.tableColumn ?? {});
</script>
