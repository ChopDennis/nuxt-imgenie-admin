<template>
  <ElDialog
    v-model="isConnSetting"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :before-close="
      (done) => {
        dbConnectionApi().resetForm();
        done();
      }
    "
    modal-class="backdrop-blur-sm"
    align-center
    width="576"
    class="conn-set-dialog"
  >
    <template #header
      ><div class="flex items-center gap-2 text-xl">
        <div>
          <img :src="icons[`ic_${store.setting.dbType}`]" />
        </div>
        <div>{{ store.setting.dialogTitle }} 連線設定</div>
      </div>
    </template>
    <div class="flex flex-col gap-4">
      <slot name="alert"></slot>
      <ElForm
        ref="dbConnSetFormRef"
        :model="store.setting.form"
        :rules="formRules"
        label-width="110px"
        class="conn-set-form"
      >
        <ElFormItem
          v-for="(value, key) in store.setting.form"
          :key="key"
          :label="formLabel[_useToString(key)]"
          :prop="_useToString(key)"
        >
          <div class="ml-2 w-full">
            <ElInput
              v-model="store.setting.form[_useToString(key)]"
              :validate-event="false"
              :placeholder="
                _useToString(key) === 'connName' ? '自訂連線名稱' : ''
              "
              :type="`${_useToString(key)}`"
            />
          </div>
        </ElFormItem>
      </ElForm>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <ElButton @click="connSetBtn('test')">連線測試</ElButton>
        <span>
          <ElButton @click="dbConnectionApi().resetForm()">取消</ElButton>
          <ElButton type="primary" @click="connSetBtn('save')">儲存</ElButton>
        </span>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const dbConnSetFormRef = ref<FormInstance>();
const store = useDbConnectionStore();
const icons = useDbConnIcons();
const isConnSetting = openConnectionSetting();

const formLabel: ConnectionSetForm = {
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

const formRules = reactive<FormRules<ConnectionSetForm>>({
  connName: [{ required: true, message: "請輸入連線名稱" }],
  host: [{ required: true, message: "請輸入主機名稱或IP" }],
  port: [{ required: true, message: "請輸入通訊埠" }],
  username: [{ required: true, message: "請輸入使用者名稱" }],
  password: [{ required: true, message: "請輸入密碼" }],
  database: [{ required: true, message: "請輸入資料庫名稱" }],
});

const connSetBtn = async (action: string) => {
  store.setting.form = useForm().trim(store.setting.form) as ConnectionSetForm;
  const valid = await useForm().validate(dbConnSetFormRef.value);
  if (valid) {
    if (action === "test") {
      await dbConnectionApi().sendTest();
    }
    if (action === "save") {
      await dbConnectionApi().sendSave();
    }
  } else {
    console.error("欄位錯誤"); // eslint-disable-line no-console
  }
};
</script>
