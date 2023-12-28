<template>
  <div class="flex flex-col gap-4">
    <ElAlert
      v-if="store.dbConnTestStatus"
      title="連線成功"
      type="success"
      show-icon
      class="font-black"
    />
    <ElAlert
      v-if="!store.dbConnTestStatus && !isNull(store.dbConnTestStatus)"
      :title="`無法連結到: ${store.dbConnSetForm.host}:${store.dbConnSetForm.port}`"
      :description="`${store.dbConnTestMessage}`"
      type="error"
      show-icon
    />
    <ElForm
      ref="dbConnSetFormRef"
      :model="store.dbConnSetForm"
      :rules="formRules"
      label-width="110px"
      class="conn-set-form"
    >
      <ElFormItem
        v-for="(value, key) in store.dbConnSetForm"
        :key="key"
        :label="formLabel[_useToString(key)]"
        :prop="_useToString(key)"
      >
        <div class="ml-2 w-full">
          <ElInput
            v-model="store.dbConnSetForm[_useToString(key)]"
            :validate-event="false"
            :placeholder="
              _useToString(key) === 'connName' ? '自訂連線名稱' : ''
            "
            :type="`${_useToString(key)}`"
          />
        </div>
      </ElFormItem>

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

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const dbConnSetFormRef = ref<FormInstance>();
const store = useDbConnectionStore();

const formLabel: DbConnSetForm = {
  connName: "連線名稱",
  host: "主機名稱或IP",
  port: "通訊埠",
  username: "使用者名稱",
  password: "密碼",
  database: "資料庫名稱",
  isSSL: "啟用SSL",
  isClientCertificate: "啟用用戶端驗證",
  CAFile: "SSL",
  ca: "Server Certificate:",
  clientKey: "Client Key:",
  clientCertificate: "Client Certificate:",
};

const formRules = reactive<FormRules<DbConnSetForm>>({
  connName: [{ required: true, message: "請輸入連線名稱" }],
  host: [{ required: true, message: "請輸入主機名稱或IP" }],
  port: [{ required: true, message: "請輸入通訊埠" }],
  username: [{ required: true, message: "請輸入使用者名稱" }],
  password: [{ required: true, message: "請輸入密碼" }],
  database: [{ required: true, message: "請輸入資料庫名稱" }],
});

const connSetBtn = async (action: string) => {
  store.dbConnSetForm = useForm().trim(store.dbConnSetForm) as DbConnSetForm;
  const valid = await useForm().validate(dbConnSetFormRef.value);
  if (valid) {
    if (action === "test") {
      // store.dbConnTestRes = "";
      await dbConnectionApi().test();
    }
    if (action === "save") await store.getDbConnSave();
  } else {
    console.error("欄位錯誤"); // eslint-disable-line no-console
  }
};

defineExpose({
  connSetBtn,
  dbConnSetFormRef,
});

onBeforeUnmount(() => {
  store.onCloseDbConnSetForm();
});
</script>
