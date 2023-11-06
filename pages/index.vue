<template>
  <div>
    <img v-for="(image, index) in images" :key="index" :src="image" />
    <div>{{ store.dbConnectionList }}</div>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
await store.getDbConnectionList();
const images = dynamicImportIcons();
</script>
<style scoped></style>
