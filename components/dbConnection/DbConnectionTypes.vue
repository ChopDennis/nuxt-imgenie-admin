<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="(type, index) in store.dbConnTypesRes"
      id="dbTypeSelectButton"
      :key="index"
      class="rounded-lg p-4 h-auto flex justify-start gap-2 transition-all items-center"
      :class="{
        'db-category-active': false,
        'shadow-custom-md': true,
      }"
      @click="clickEditNewConn(type.title, type.itemId)"
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

const clickEditNewConn = (title: string, dbType: string) => {
  store.dbConnSetTitle = title;
  store.dbConnSetType = dbType;
  store.dbConnSetIsNew = true;
  store.resetDbConnSetForm();
  store.dbConnDialog.categories = false;
  store.dbConnDialog.connSetting = true;
};
</script>
