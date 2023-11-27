<template>
  <div class="w-full h-16 flex justify-end items-stretch px-5">
    <div class="self-center px-8">
      <ElBadge :value="12" class="item"> <ElIconBell width="24" /> </ElBadge>
    </div>
    <img
      src="~/assets/icons/header/ic_avatar.svg"
      width="40"
      @click="goToLogin()"
    />
    <div class="self-center px-2">
      <h1 class="align-middle font-bold">Avatar</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
const goToLogin = () => {
  navigateTo({ path: "/" });
};
</script>
