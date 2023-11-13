<template>
  <div class="flex flex-col gap-4">
    <ElAlert
      v-if="store.testConnectionStatus === true"
      title="連線成功"
      type="success"
      show-icon
    />
    <el-alert
      v-if="store.testConnectionStatus === false"
      title="連線失敗"
      type="error"
      description="請聯絡系統管理員"
      show-icon
    />
    <ElForm :model="form" label-width="150px">
      <ElFormItem
        v-for="(value, key) in form"
        :key="key"
        :label="formLabel[_useToString(key)]"
      >
        <ElInput v-if="typeof value === 'string'" v-model="form[key]" />
        <ElCheckbox v-if="typeof value === 'boolean'" v-model="form[key]" />
      </ElFormItem>
      <div class="flex justify-between">
        <ElButton @click="clickConnSetting">連線設定</ElButton>
        <div class="flex">
          <!-- TODO: 可以關閉 -->
          <ElButton>取消</ElButton>
          <ElButton type="primary" @click="clickConfirm()">確認</ElButton>
        </div>
      </div>
    </ElForm>
  </div>
</template>
s
<script setup lang="ts">
interface FormLabel {
  [key: string]: string;
}
const formLabel: FormLabel = {
  connName: "連線名稱",
  host: "主機名稱或IP",
  port: "通訊埠",
  username: "使用者名稱",
  password: "密碼",
  database: "資料庫名稱",
  isClientCertificate: "isClientCertificate",
  isSSL: "isSSL",
};
const props = defineProps<{
  form: DbConnSetForm;
  isNewConn: boolean;
}>();
const form = reactive<DbConnSetForm>(props.form);

const store = useDbConnectionStore();
const clickConnSetting = () => {
  const { host, port, database, username, password } = form;
  const connInfo = {
    host,
    port,
    database,
    username,
    password,
    // ssl: {
    //   CAFile: "1234",
    // },
  };
  store.testConnection("postgresql", connInfo);
};

const clickConfirm = () => {
  const { connName, ...rest } = form;
  store.setDbConnSetting(connName, { ...rest }, props.isNewConn);
};
onBeforeUnmount(() => {
  store.testConnectionStatus = null;
});
</script>
