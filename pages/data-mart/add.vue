<template>
  <div>
    <DataMartSetForm />
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
store.resetDataMartSetForm();
</script>
