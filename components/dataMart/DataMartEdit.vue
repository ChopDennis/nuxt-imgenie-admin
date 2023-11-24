<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      {{ store.dataMartListMap }}
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
</script>
