<template>
  <div>
    <ElButton :icon="ElIconPlus" type="primary" @click="goToDbConnection()"
      >資料庫連線</ElButton
    >
  </div>
</template>
<script setup lang="ts">
const goToDbConnection = () => {
  navigateTo({
    path: "/dbconnection",
  });
};
</script>
<style scoped></style>
