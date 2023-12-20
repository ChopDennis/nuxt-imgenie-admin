<template>
  <div class="w-full h-16 flex justify-end px-6 gap-2 items-center">
    <div>
      <img src="~/assets/icons/header/ic_avatar.svg" width="40" />
    </div>
    <div class="flex gap-2">
      <h1 class="font-bold">imgenie_admin</h1>
      <el-tooltip
        :show-arrow="false"
        content="登出"
        placement="bottom-end"
        effect="light"
        :offset="0"
      >
        <template #content>
          <ElButton style="border: 0px; box-shadow: none" @click="goToLogin"
            >登出</ElButton
          >
        </template>
        <ElButton size="small" style="border: 0px; box-shadow: none; padding: 0"
          ><ElIconArrowDown width="16"></ElIconArrowDown
        ></ElButton>
      </el-tooltip>
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
