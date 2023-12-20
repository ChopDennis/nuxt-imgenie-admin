<template>
  <div class="flex w-full h-screen login-bg overflow-hidden">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>

<style>
.login-bg {
  background-image: url("@/assets/images/imgenie_login_bg.jpg");
  background-size: cover;
}
</style>
