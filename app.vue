<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
  title: "iMGenie 後台管理系統",
  meta: [
    {
      name: "description",
      content: "iMGenie 後台管理系統提供管理者新增、編輯資料庫連線與資料模型",
    },
  ],
});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
