<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="(type, index) in store.dbConnTypesRes"
      id="dbTypeSelectButton"
      :key="index"
      class="rounded-lg p-4 h-auto flex justify-start border gap-2 transition-all items-center hover:shadow-custom-md"
      :class="{
        'db-category-active': false,
      }"
      @click="clickEditNewConn(type.itemId)"
    >
      <div>
        <img :src="icons[`ic_${type.itemId}`]" class="w-6" />
      </div>

      <div class="font-medium text-lg">
        {{ _useUpperFirst(type.title) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const icons = dynamicImportDbConnectionIcons();

const clickEditNewConn = (dbType: string) => {
  const dbTypeTitle: { [key: string]: any } = {
    postgresql: "Postgre SQL",
    bigquery: "Big Query",
    presto: "Presto",
  };
  store.dbConnSetTitle = dbTypeTitle[`${dbType}`];
  store.dbConnSetType = dbType;
  store.dbConnSetIsNew = true;
  store.resetDbConnSetForm();
  store.dbConnDialog.categories = false;
  store.dbConnDialog.connSetting = true;
};
</script>
