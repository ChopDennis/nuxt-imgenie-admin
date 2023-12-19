<template>
  <div class="w-full h-16 flex justify-end px-6 gap-2 items-center">
    <div>
      <img
        src="~/assets/icons/header/ic_avatar.svg"
        width="40"
        @click="goToLogin()"
      />
    </div>
    <div class="flex gap-2 mr-2">
      <h1 class="font-bold">imgenie_admin</h1>
      <el-popover placement="bottom" trigger="click">
        <template #reference>
          <ElIconArrowDown width="16"></ElIconArrowDown>
        </template>
        <ElButton class="border-0" @click="goToLogin">登出</ElButton>
      </el-popover>
    </div>
  </div>
</template>
<script setup lang="ts">
const { signOut } = useAuth();
const goToLogin = async () => {
  try {
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};
</script>
