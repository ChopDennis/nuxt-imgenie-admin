<template>
  <div>
    <DataMartSetForm :table="connSetTable" />
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const dbConnStore = useDbConnectionStore();
const connSetTable = ref<any>([]);

setTimeout(async () => {
  await dbConnStore.getDbConnActiveList();
  if (isEmpty(dbConnStore.dbConnList)) return;
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
