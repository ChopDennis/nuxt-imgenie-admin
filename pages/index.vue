<template>
  <div class="backdrop-blur-sm w-full self-center">
    <div class="login-model bg-white p-12 rounded-3xl m-auto">
      <!-- <pre>Status: {{ status }}</pre>
      <pre>
Data: {{ data || "no session data present, are you logged in?" }}</pre
      >
      <pre>
Last refreshed at: {{ lastRefreshedAt || "no refresh happened" }}</pre
      >
      <pre>
JWT token: {{ token || "no token present, are you logged in?" }}</pre
      >
      <pre>
JWT refreshToken: {{
          refreshToken || "no refreshToken present, are you logged in?"
        }}</pre
      > -->
      <h1 class="text-center font-bold text-2xl mb-12">IMGenie 管理平台</h1>
      <ElForm class="flex flex-col gap-2">
        <ElFormItem>
          <ElInput
            v-model="account"
            type="text"
            placeholder="輸入Email"
            :disabled="true"
          />
        </ElFormItem>
        <ElFormItem>
          <ElInput
            v-model="password"
            type="password"
            placeholder="輸入密碼"
            :disabled="true"
          />
        </ElFormItem>
        <ElFormItem>
          <ElCheckbox v-model="rememberEmail" label="記住信箱" />
        </ElFormItem>
        <ElButton class="w-full" type="primary" @click="clickLoginButton()"
          >登入</ElButton
        >
        <ElButton class="w-full" type="primary" @click="clickLogoutButton()"
          >登出</ElButton
        >
        <ElButton class="w-full" type="primary" @click="clickRefreshButton()"
          >重整</ElButton
        >
      </ElForm>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  layout: "login",
});

const account = ref("userbyapi3");
const password = ref("test");
const rememberEmail = ref(true);
const { signIn, signOut, refresh } = useAuth();

const clickLoginButton = async () => {
  try {
    await signIn(
      { account: "userbyapi3", password: "test" },
      { callbackUrl: "/data-mart" },
    );
  } catch (error) {
    console.error(error);
  }
};
const clickLogoutButton = async () => {
  try {
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error(error);
  }
};
const clickRefreshButton = async () => {
  try {
    await refresh();
  } catch (error) {
    console.error(error);
  }
};
</script>
<style scoped>
.login-model {
  width: 500px;
}
</style>
