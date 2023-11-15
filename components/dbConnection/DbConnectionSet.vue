<template>
  <div class="flex flex-col gap-4">
    <ElAlert
      v-if="store.dbConnTestRes === true"
      title="連線成功"
      type="success"
      show-icon
    />
    <ElAlert
      v-if="store.dbConnTestRes === false"
      title="連線失敗"
      type="error"
      description="請聯絡系統管理員"
      show-icon
    />
    <ElForm :model="store.dbConnSetForm" label-width="150px">
      <ElFormItem
        v-for="(value, key) in store.dbConnSetForm"
        :key="key"
        :label="formLabel[_useToString(key)]"
      >
        <ElInput
          v-if="typeof value === 'string'"
          v-model="store.dbConnSetForm[_useToString(key)]"
          :placeholder="`請輸入${formLabel[_useToString(key)]}`"
          :type="`${_useToString(key)}`"
        />

        <ElCheckbox
          v-else-if="typeof value === 'boolean'"
          v-model="store.dbConnSetForm[_useToString(key)]"
        />
      </ElFormItem>
      <div class="flex justify-between">
        <ElButton @click="store.getDbConnTest()">連線測試</ElButton>
        <div class="flex">
          <ElButton @click="store.dbConnDialog.connSetting = false"
            >取消</ElButton
          >
          <ElButton type="primary" @click="store.getDbConnSave()"
            >確認</ElButton
          >
        </div>
      </div>
    </ElForm>
  </div>
</template>
s
<script setup lang="ts">
const store = useDbConnectionStore();

const formLabel: DbConnSetForm = {
  connName: "連線名稱",
  host: "主機名稱或IP",
  port: "通訊埠",
  username: "使用者名稱",
  password: "密碼",
  database: "資料庫名稱",
};

onBeforeUnmount(() => {
  store.onCloseDbConnSetForm();
});
</script>
