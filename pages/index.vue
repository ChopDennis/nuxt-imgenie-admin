<template>
  <div>
    <img v-for="(image, index) in images" :key="index" :src="image" />
    <div>{{ store.dbConnectionList }}</div>
    <div>============================</div>
    <Button @click="store.getDbCategories">GET DB CATEGORIES</Button>
    <div>{{ store.dbCategories }}</div>
    <Button @click="store.testConnection">TEST DB CONNECTION</Button>
    <div>{{ store.testConnectionStatus }}</div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
await store.getDbConnectionList();
const images = dynamicImportIcons();
</script>
<style scoped></style>
