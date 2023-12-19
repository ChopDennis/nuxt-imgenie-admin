<template>
  <div>
    <DataMartSetForm />
  </div>
</template>
<script setup lang="ts">
const sideMenuActive = useSideMenuActive();
const store = useDataMartStore();
store.resetDataMartSetForm();
sideMenuActive.value = "2-2";
</script>
