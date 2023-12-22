<template>
  <div>
    <DataMartSetForm :table="connSetTable" />
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
store.resetDataMartSetForm();
const connSetTable = ref<any>([]);
</script>
