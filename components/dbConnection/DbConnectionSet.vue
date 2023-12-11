<template>
  <div class="flex flex-col gap-4">
    <ElAlert
      v-if="store.dbConnTestRes === true"
      title="連線成功"
      type="success"
      show-icon
      class="font-black"
    />
    <ElAlert
      v-if="store.dbConnTestRes === false"
      title="無法連結到localhost: "
      description="錯誤訊息"
      type="error"
      show-icon
    />
    <ElForm
      ref="dbConnSetFormRef"
      :model="store.dbConnSetForm"
      :rules="formRules"
      label-width="150px"
    >
      <div v-for="(value, key) in store.dbConnSetForm" :key="key">
        <ElFormItem
          v-if="typeof value === 'string'"
          :label="formLabel[_useToString(key)]"
          :prop="_useToString(key)"
        >
          <ElInput
            v-model="store.dbConnSetForm[_useToString(key)]"
            :placeholder="`請輸入${formLabel[_useToString(key)]}`"
            :type="`${_useToString(key)}`"
          />
        </ElFormItem>
      </div>
      <!-- <div>
        <ElFormItem :label="formLabel['ca']" prop="ca">
          <ElInput
            v-model="store.dbConnSetForm['ca']"
            placeholder="將資料拖曳此處，或點擊上傳"
            type="input"
          />
        </ElFormItem>
      </div> -->
      <!-- <ElFormItem :label="formLabel['clientKey']" prop="clientKey">
        <ElInput
          v-model="store.dbConnSetForm['clientKey']"
          placeholder="將資料拖曳此處，或點擊上傳"
          type="input"
        />
      </ElFormItem>
      <ElFormItem
        :label="formLabel['clientCertificate']"
        prop="clientCertificate"
      >
        <ElInput
          v-model="store.dbConnSetForm['clientCertificate']"
          placeholder="將資料拖曳此處，或點擊上傳"
          type="input"
        />
      </ElFormItem> -->
    </ElForm>
  </div>
</template>
s
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const dbConnSetFormRef = ref<FormInstance>();
const store = useDbConnectionStore();

const formLabel: DbConnSetForm = {
  connName: "連線名稱:",
  host: "主機名稱或IP:",
  port: "通訊埠:",
  username: "使用者名稱:",
  password: "密碼:",
  database: "資料庫名稱:",
  isSSL: "啟用SSL",
  isClientCertificate: "啟用用戶端驗證",
  CAFile: "SSL",
  ca: "Server Certificate:",
  clientKey: "Client Key:",
  clientCertificate: "Client Certificate:",
};

const formRules = reactive<FormRules<DbConnSetForm>>({
  connName: [{ required: true, message: "請輸入連線名稱", trigger: "change" }],
  host: [{ required: true, message: "請輸入主機名稱或IP", trigger: "change" }],
  port: [{ required: true, message: "請輸入通訊埠", trigger: "change" }],
  username: [
    { required: true, message: "請輸入使用者名稱", trigger: "change" },
  ],
  password: [{ required: true, message: "請輸入密碼", trigger: "change" }],
  database: [
    { required: true, message: "請輸入資料庫名稱", trigger: "change" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.getDbConnSave();
    } else {
      console.log("error submit!", fields); // eslint-disable-line no-console
    }
  });
};

defineExpose({
  submitForm,
  dbConnSetFormRef,
});

onBeforeUnmount(() => {
  store.onCloseDbConnSetForm();
});
</script>
