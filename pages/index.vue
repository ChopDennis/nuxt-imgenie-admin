<template>
  <div class="backdrop-blur-sm w-full self-center">
    <div class="login-model bg-white p-12 rounded-3xl m-auto">
      <h1 class="text-center font-bold text-2xl mb-12">IMGenie 管理平台</h1>
      <ElForm
        ref="loginFormRef"
        :model="credentials"
        class="flex flex-col gap-2"
        :rules="loginFormRules"
      >
        <ElFormItem prop="account">
          <ElInput
            v-model="credentials.account"
            size="large"
            type="text"
            placeholder="輸入Email"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="credentials.password"
            size="large"
            type="password"
            placeholder="輸入密碼"
          />
        </ElFormItem>
        <ElFormItem>
          <ElCheckbox v-model="rememberEmail" label="記住信箱" />
        </ElFormItem>
        <ElButton
          class="w-full"
          size="large"
          type="primary"
          @click="loginController.clickLoginButton(loginFormRef, credentials)"
          >登入</ElButton
        >
      </ElForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

interface Credentials {
  account: string;
  password: string;
}

definePageMeta({
  layout: "login",
});

const credentials = reactive<Credentials>({
  account: "",
  password: "",
});
const loginController = new LoginController();
const loginFormRef = ref<FormInstance>();
const loginFormRules = reactive<FormRules<Credentials>>({
  account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
});
const rememberEmail = ref(true);
</script>
