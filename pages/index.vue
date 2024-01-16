<template>
  <div class="w-full flex login-backdrop">
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
            style="--el-input-bg-color: #f2f4f5"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="credentials.password"
            type="password"
            placeholder="輸入密碼"
            style="--el-input-bg-color: #f2f4f5"
          >
            <template #suffix>
              <div class="px-4">
                <img src="~/assets/icons/login/ic_eye_invisible.svg" />
              </div>
            </template>
          </ElInput>
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
        @click="keycloakApi.login({ ...credentials })"
        ><div class="text-2xl font-bold" style="line-height: 34px">登入</div>
      </ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

definePageMeta({
  layout: "login",
});

const credentials = reactive<Credentials>({
  account: "",
  password: "",
});

const keycloakApi = useKeycloakApi();
const loginFormRef = ref<FormInstance>();
const loginFormRules = reactive<FormRules<Credentials>>({
  account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
});
const rememberEmail = ref(true);
</script>
