<template>
  <div>
    <div>
      <pre>Status: {{ status }}</pre>
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
      >
      <ElForm @submit.prevent="">
        <ElFormItem>
          <ElInput v-model="account" type="text" placeholder="Username" />
        </ElFormItem>
        <ElFormItem>
          <ElInput v-model="password" type="password" placeholder="Password" />
        </ElFormItem>
        <ElButton type="primary" @click="clickLoginButton()">sign in</ElButton>
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
});

const account = ref("userbyapi3");
const password = ref("test");

const { signIn, token, refreshToken, data, status, lastRefreshedAt } =
  useAuth();

const clickLoginButton = async () => {
  try {
    await signIn(
      { account: "userbyapi3", password: "test" },
      { callbackUrl: "/" },
    );
  } catch (error) {
    console.error(error);
  }
};
</script>
<style scoped></style>
