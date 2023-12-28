<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="(type, index) in store.dbConnTypesRes"
      :key="index"
      class="rounded-lg p-4 h-auto flex justify-start border gap-2 transition-all items-center db-type-select"
      :class="{
        'db-type-select-active': type.itemId === store.dbConnSetType,
      }"
      @click="clickEditNewConn(type.itemId, type.title)"
    >
      <div>
        <img :src="icons[type.icon.split('.')[0]]" class="w-6" />
      </div>

      <div class="font-medium text-lg">
        {{ type.title }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const icons = useDbConnIcons();

const clickEditNewConn = (dbType: string, title: string) => {
  store.dbConnSetTitle = title;
  store.dbConnSetType = dbType;
  store.dbConnSetIsNew = true;
  store.resetDbConnSetForm();
  setTimeout(() => {
    store.dbConnDialog.categories = false;
    store.dbConnDialog.connSetting = true;
  }, 500);
};
</script>
