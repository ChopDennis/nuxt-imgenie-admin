<template>
  <ElDialog
    v-model="isConnSetting"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :before-close="
      (done) => {
        useDbConnectionApi().resetForm();
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
        v-if="store.setting.dbType !== 'bigquery'"
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
      <!-- 以下bigquery專用 -->
      <ElForm
        v-if="store.setting.dbType === 'bigquery'"
        ref="bigQueryFormRef"
        :model="bigqueryForm"
        :rules="bigQeryRules"
        label-width="110px"
      >
        <ElFormItem label="連線名稱" prop="connName">
          <ElInput v-model="bigqueryForm.connName" :validate-event="false" />
        </ElFormItem>
        <ElFormItem label="專案ID" prop="projectId">
          <ElInput v-model="bigqueryForm.projectId" :validate-event="false" />
        </ElFormItem>
        <div class="pl-110">
          請按照以下說明，在您的 Google Cloud Platform 帳戶中，授予專案 ID 對
          IMGenie 服務帳戶的存取權限。
          <span class="text-blue-500 hover:cursor-pointer" @click="openDetail"
            >步驟說明</span
          >
        </div>
        <div v-show="detailIsOpen" class="pl-110 mt-2">
          <div class="flex items-center mt-2">
            <div class="step mr-1">1</div>
            打開Google Cloud 控制台的 IAM 和 管理。
          </div>
          <div class="flex items-center mt-2">
            <div class="step mr-1">2</div>
            點擊“授予存取權”
          </div>
          <div class="flex items-center mt-2">
            <div class="step mr-1">3</div>
            將下述email填入新增主題。
          </div>
          <el-input
            class="mt-1 pl-4 mail-input"
            disabled
            :suffix-icon="CopyDocument"
          ></el-input>
          <div class="flex mt-2">
            <div class="step mr-1 mt-1.5">4</div>
            加入角色：
            <div>
              <div>BigQuery資料檢視者</div>
              <div>BigQuery工作使用者</div>
            </div>
          </div>
          <div class="flex items-center mt-2">
            <div class="step mr-1">5</div>
            點擊 “儲存”。
          </div>
        </div>
      </ElForm>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <ElButton @click="connSetBtn('test')">連線測試</ElButton>
        <span>
          <ElButton @click="useDbConnectionApi().resetForm()">取消</ElButton>
          <ElButton type="primary" @click="connSetBtn('save')">儲存</ElButton>
        </span>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { CopyDocument } from "@element-plus/icons-vue";
import { useDbConnectionStore } from "@/stores/dbConnectionStore";
const dbconnationstore = useDbConnectionStore();
const dbConnSetFormRef = ref<FormInstance>();
const bigQueryFormRef = ref<FormInstance>();
const store = useDbConnectionStore();
const icons = useDbConnIcons();
const isConnSetting = openConnectionSetting();
const isTest = ref(false);
const detailIsOpen = ref(false);
interface BigqueryForm {
  connName: string;
  projectId: string;
  email: string;
}
const bigqueryForm: BigqueryForm = reactive({
  connName: "",
  projectId: "",
  email: "",
});

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
const bigQeryRules = reactive<FormRules<any>>({
  connName: [{ required: true, message: "請輸入連線名稱" }],
  projectId: [{ required: true, message: "請輸入專案ID" }],
});
const connSetBtn = async (action: string) => {
  let valid = false;
  store.setting.form = useForm().trim(store.setting.form) as ConnectionSetForm;

  Object.keys(bigqueryForm).forEach((key) => {
    const typedKey = key as keyof BigqueryForm;
    bigqueryForm[typedKey] = bigqueryForm[typedKey].trim();
  });
  store.setting.dbType !== "bigquery"
    ? (valid = await useForm().validate(dbConnSetFormRef.value))
    : (valid = await useForm().validate(bigQueryFormRef.value));
  let confirm = true;

  if (valid) {
    if (action === "test") {
      await useDbConnectionApi().sendTest();
      isTest.value = true;
    }
    if (action === "save") {
      let result;
      if (dbconnationstore.isEdit) {
        result = await useDbConnectionApi().checkUsed(store.setting.connId);
      }
      if (!isEmpty(result)) {
        confirm = await ElMessageBox.confirm(
          `<div class="text-base" style="color:#20222F">請確定是否送出修改內容 ?</div><div class="pt-2" style="color:#999999">修改資料庫連線，任何連接此設定的資料模型、ChatSQL對話，均將受影響。<br>確定要儲存？<br>${
            !isTest.value ? "建議先執行連線測試。" : ""
          }</div>`,
          {
            confirmButtonText: "取消",
            cancelButtonText: "確定",
            dangerouslyUseHTMLString: true,
            closeOnClickModal: false,
            type: "error",
            showClose: false,
          },
        )
          .then(() => {
            return false;
          })
          .catch(() => {
            return true;
          });
      }
      if (confirm) {
        store.setting.dbType !== "bigquery"
          ? await useDbConnectionApi().sendSave()
          : await useDbConnectionApi().sendSaveBigQuery(bigqueryForm);
      }
    }
  } else {
    console.error("欄位錯誤"); // eslint-disable-line no-console
  }
};

const openDetail = () => {
  detailIsOpen.value = !detailIsOpen.value;
};
</script>

<style lang="scss" scoped>
.step {
  width: 12px;
  height: 12px;
  border-radius: 30px;
  padding: 1px 3px 1px 3px;
  background-color: #373c55;
  font-size: 8px;
  text-align: center;
  font-family: Roboto-Regular;
  color: #fff;
}
.el-input.mail-input {
  --el-input-border-radius: 2px;
  --el-input-height: 32px;
}
</style>
