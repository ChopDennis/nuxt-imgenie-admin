<template>
  <div>
    <DataMartSetForm />
  </div>
</template>
<script setup lang="ts">
const sideMenuActive = useSideMenuActive();
sideMenuActive.value = "2-2";
// const dbConnStore = useDbConnectionStore();
const store = useDataMartStore();
await store.getDataMartQuery();
// const { connId } = store.dataMartSetForm;
// const { data, execute } = useApi(ApiDbConnection.Schemas, {
//   params: { connId },
//   immediate: false,
// });
// await execute();
// const schemas = data.value as ApiResponse;
// dbConnStore.dbConnSchemaRes = schemas.data;
</script>
<style scoped></style>
