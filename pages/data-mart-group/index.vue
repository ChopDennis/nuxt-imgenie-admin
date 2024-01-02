<template>
  <div>
    <AdminSortableTable :list="list" :column="column" />
  </div>
</template>
<script setup>
const list = ref([
  {
    groupName: "群組測試",
    description: "群組測試、群組測試、群組測試、群組測試",
    creteTime: "2024-01-02",
  },
]);
const column = ref({
  groupName: "群組名稱",
  description: "簡述",
  creteTime: "建立時間",
});
</script>
