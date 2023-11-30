<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      <h1 class="text-xl font-bold tracking-wide">DataMart 資料</h1>
      <ElDivider />
      <ElForm
        ref="dataMartFormRef"
        :model="store.dataMartInfo"
        label-width="300px"
      >
        <div v-for="(value, key) in store.dataMartInfo" :key="key">
          <ElFormItem
            v-if="typeof value === 'string' && `${key}` !== 'DBML'"
            :label="formLabel[key]"
            :prop="`${key}`"
          >
            <ElInput
              v-model="store.dataMartInfo[_useToString(key)]"
              :placeholder="`請輸入${formLabel[_useToString(key)]}`"
              :type="`${key}`"
            />
          </ElFormItem>
          <ElFormItem v-else :label="formLabel[key]" :prop="`${key}`">
            <ElInput
              v-model="store.dataMartInfo[`${key}`]"
              placeholder="將資料拖曳此處，或點擊上傳"
              :type="`${key}`"
            />
          </ElFormItem>
        </div>
      </ElForm>
      <ElDivider />
      <ClientOnly>
        <ElTable :data="store.dataMartList" max-height="650" size="large">
          <ElTableColumn
            prop="dbType"
            label="資料庫來源"
            width="120"
            align="center"
            ><template #default="">
              <img
                class="m-auto"
                src="~/assets/icons/dbConnection/ic_postgresql.svg"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn
            prop="dataMartName"
            label="資料庫名稱"
            min-width="150"
          />
          <ElTableColumn
            prop="dataMartName"
            label="主機名稱及IP"
            min-width="150"
          />

          <ElTableColumn
            prop="connName"
            label="資料庫/資料集"
            min-width="150"
          />
        </ElTable>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useDataMartStore();
const formLabel: DataMartInfo = {
  datamartName: "Data Mart 名稱",
  description: "Data Mart 說明",
  DBML: "請輸入資料庫Schema(DBML格式)",
};
</script>
