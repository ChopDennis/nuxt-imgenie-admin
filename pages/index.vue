<template>
  <div class="backdrop-blur-sm w-full self-center">
    <div class="login-model bg-white p-12 rounded-3xl m-auto">
      <h1 class="text-center font-bold text-2xl mb-12">IMGenie 管理平台</h1>
      <ElForm
        ref="loginFormRef"
        :model="loginForm"
        class="flex flex-col gap-2"
        :rules="loginFormRules"
      >
        <ElFormItem prop="account">
          <ElInput
            v-model="loginForm.account"
            type="text"
            placeholder="輸入Email"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="loginForm.password"
            type="password"
            placeholder="輸入密碼"
          />
        </ElFormItem>
        <ElFormItem>
          <ElCheckbox v-model="rememberEmail" label="記住信箱" />
        </ElFormItem>
        <ElButton
          class="w-full"
          type="primary"
          @click="clickLoginButton(loginFormRef)"
          >登入</ElButton
        >
      </ElForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
interface LoginForm {
  account: string;
  password: string;
}
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  layout: "login",
});
const { signIn } = useAuth();
const loginFormRef = ref<FormInstance>();
const loginForm = reactive<LoginForm>({
  account: "imgenie_admin",
  password: "test",
});
const rememberEmail = ref(true);

const clickLoginButton = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        await signIn(
          { account: loginForm.account, password: loginForm.password },
          { callbackUrl: "/data-mart" },
        );
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    } else {
      console.log("error submit!", fields); // eslint-disable-line no-console
    }
  });
};

const loginFormRules = reactive<FormRules<LoginForm>>({
  account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
});
</script>
<style scoped>
.login-model {
  width: 500px;
}
</style>
