<template>
  <div>
    <ElForm :model="form" label-width="150px">
      <ElFormItem
        v-for="(value, key) in form"
        :key="key"
        :label="_useToString(key)"
      >
        <ElInput v-if="typeof value === 'string'" v-model="form[key]" />
        <el-checkbox
          v-else-if="typeof value === 'boolean'"
          v-model="form[key]"
        />
        <!-- <el-upload
          v-else-if="value === null"
          v-model="form[key]"
          :action="yourUploadUrl"
          :show-file-list="false"
        >
          <el-button slot="trigger" size="small">上传文件</el-button>
        </el-upload> -->
      </ElFormItem>
    </ElForm>
    <div class="flex justify-between pt-4">
      <ElButton @click="clickConnSetting">連線設定</ElButton>
      <div class="flex">
        <ElButton>取消</ElButton>
        <ElButton type="primary">確認</ElButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  form: dbConnSetForm;
}>();
const form = reactive<dbConnSetForm>(props.form);
const connInfo = {
  host: form.主機名稱或IP,
  port: form.通訊埠,
  database: form.資料庫名稱,
  username: form.使用者名稱,
  password: form.密碼,
  ssl: {
    CAFile: "1234",
  },
};
const store = useDbConnectionStore();
const clickConnSetting = () => {
  console.log(JSON.stringify(connInfo));
  store.testConnection("postgresql", connInfo);
};
</script>
