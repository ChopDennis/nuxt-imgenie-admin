<template>
  <div class="backdrop-blur-sm w-full self-center">
    <div class="login-model bg-white p-12 rounded-3xl m-auto">
      <h1 class="text-center font-bold text-2xl mb-16">IMGenie 管理平台</h1>
      <ElForm
        ref="loginFormRef"
        :model="credentials"
        :rules="loginFormRules"
        class="login-form"
      >
        <ElFormItem prop="account">
          <ElInput
            v-model="credentials.account"
            type="text"
            placeholder="輸入Email"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="credentials.password"
            type="password"
            placeholder="輸入密碼"
          />
        </ElFormItem>
        <ElFormItem>
          <div class="px-1">
            <ElCheckbox v-model="rememberEmail" label="記住信箱" />
          </div>
        </ElFormItem>
      </ElForm>

      <ElButton
        class="w-full"
        type="primary"
        size="large"
        style="padding: 8px 24px 8px 24px !important; height: 48px! !important"
        @click="login.clickLoginButton(loginFormRef, credentials)"
        ><div class="text-2xl" style="line-height: 34px">登入</div>
      </ElButton>
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
useRoute();
const login = new UseLogin();
const loginFormRef = ref<FormInstance>();
const loginFormRules = reactive<FormRules<Credentials>>({
  account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
});
const rememberEmail = ref(true);
</script>
