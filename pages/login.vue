<template>
  <div>
    <img v-for="(image, index) in images" :key="index" :src="image" />
  </div>
</template>
<script setup lang="ts">
import { filename } from "pathe/utils";

const glob = import.meta.glob("@/assets/icons/homepage-products/*.png", {
  eager: true,
});
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]: [string, any]) => [
    filename(key),
    value.default,
  ]),
);
</script>
<style scoped></style>
