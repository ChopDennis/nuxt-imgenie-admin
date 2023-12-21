<template>
  <div>
    <DataMartSetForm :table="connSetTable" />
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const connSetTable = ref<any>([]);

setTimeout(async () => {
  await store.getDataMartQuery();
  const { dbType, connName, host, database, dbName } = store.dataMartSetForm;

  if (useRoute().query.datamartId) {
    connSetTable.value.push({
      dbType,
      connName,
      host,
      database,
      dbName,
    });
  }
}, 100);
</script>
