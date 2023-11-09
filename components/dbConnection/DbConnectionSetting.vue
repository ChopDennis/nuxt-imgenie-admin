<template>
  <div>
    <div class="grid grid-cols-2 gap-4">{{ props.list }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  list: any[];
}>();
</script>
