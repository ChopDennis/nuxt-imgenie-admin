<template>
  <div>
    <ElButton
      style=""
      :icon="ElIconPlus"
      type="primary"
      @click="goToDbConnection()"
      >資料庫連線</ElButton
    >
  </div>
</template>
<script setup lang="ts">
const router = useRouter();

const goToDbConnection = () => {
  router.push({
    path: "/",
  });
};
</script>
<style scoped></style>
