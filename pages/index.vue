<template>
  <div>
    <img v-for="(image, index) in images" :key="index" :src="image" />
    <div>{{ store.dbConnectionList }}</div>
    <div>============================</div>
    <PrimeButton label="GET DB CATEGORIES" @click="store.getDbCategories" />
    <div>{{ store.dbCategories }}</div>
    <PrimeButton label="TEST DB CONNECTION" @click="store.testConnection" />
    <div>{{ store.testConnectionStatus }}</div>
    <div class="card flex justify-content-center"></div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
await store.getDbConnectionList();
const images = dynamicImportIcons();
</script>
<style scoped></style>
