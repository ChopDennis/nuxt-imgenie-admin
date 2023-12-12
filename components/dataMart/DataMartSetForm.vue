<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      <h1 class="text-xl font-bold tracking-wide">資料模型資料</h1>
      <ElDivider />
      <ElForm
        ref="dataMartSetFormRef"
        :model="dataMartStore.dataMartSetForm"
        label-width="250px"
      >
        <ElFormItem label="資料模型名稱: ">
          <ElInput
            v-model="dataMartStore.dataMartSetForm.datamartName"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="資料模型說明: ">
          <ElInput
            v-model="dataMartStore.dataMartSetForm.description"
          ></ElInput>
        </ElFormItem>

        <ElDialog
          v-model="dialog"
          title="資料庫連線設定"
          modal-class="backdrop-blur-sm"
          :destroy-on-close="true"
          align-center
        >
          <DataMartSetDialog />
          <template #footer>
            <div class="flex justify-center">
              <ElButton @click="dialog = false">取消</ElButton>
              <ElButton type="primary" @click="clickConfirm()">確認</ElButton>
            </div>
          </template>
        </ElDialog>
        <ClientOnly>
          <div class="flex flex-col w-full gap-2 mb-4">
            <div class="flex justify-end">
              <ElButton @click="dialog = !dialog">資料庫設定</ElButton>
            </div>
            <div class="flex justify-end w-full pl-36">
              <div style="width: 100%">
                <ElTable :data="connTable" max-height="650" size="large">
                  <ElTableColumn label="資料庫來源" width="200"
                    ><template #default="scope">
                      <div class="flex gap-2">
                        <img
                          :src="icons[`ic_${scope.row.dbType}`]"
                          class="w-6"
                          width="24"
                        />
                        {{ scope.row.connName }}
                      </div>
                    </template>
                  </ElTableColumn>
                  <ElTableColumn
                    prop="database"
                    label="資料庫名稱"
                    min-width="150"
                  />
                  <ElTableColumn
                    prop="host"
                    label="主機名稱及IP"
                    min-width="150"
                  />

                  <ElTableColumn
                    prop="dbName"
                    label="資料庫/資料集"
                    min-width="150"
                  >
                    <template #default="scope">
                      {{ scope.row.database }}/{{ scope.row.dbName }}
                    </template>
                  </ElTableColumn>
                </ElTable>
              </div>
            </div>
          </div>
        </ClientOnly>
        <ElFormItem label="請輸入資料庫Schema(DBML格式): ">
          <DataMartUpload @upload="fileFormUpload" />
        </ElFormItem>
      </ElForm>
      <div class="flex w-full justify-end gap-2">
        <ElButton @click="navigateTo({ path: '/data-mart' })">取消</ElButton>
        <ElButton type="primary" @click="clickUpload()">儲存</ElButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UploadRawFile } from "element-plus";

const dataMartStore = useDataMartStore();
const dbConnStore = useDbConnectionStore();
const icons = dynamicImportDbConnectionIcons();
const dbmlFile = ref<UploadRawFile | File>();
const connTable = ref<any>([]);
const dialog = ref(false);

const { dbType, connName, host, database, dbName } =
  dataMartStore.dataMartSetForm;

connTable.value.push({
  dbType,
  connName,
  host,
  database,
  dbName,
});

const fileFormUpload = (fileFormUpload: UploadRawFile | File) => {
  dbmlFile.value = fileFormUpload;
};

const clickUpload = async () => {
  const formData = new FormData();

  const data = new File(
    [JSON.stringify(dataMartStore.dataMartSetForm)],
    "data.json",
    {
      type: "application/json",
    },
  );
  // console.log(props.file);

  if (dbmlFile.value) {
    console.log(await dbmlFile.value.text());
    formData.append("data", data);
    formData.append("file", dbmlFile.value as File);
    await dataMartStore.getDataMartSave(formData);
    await dataMartStore.getDataMartTable();
    // navigateTo({ path: "/data-mart" });
  }
};

const clickConfirm = async () => {
  dialog.value = false;
  await dbConnStore.getDbConnQuery(dataMartStore.dataMartSetForm.connId);
  connTable.value.pop();
  connTable.value.push({
    ...dbConnStore.dbConnSetTable,
    // dbName: dataMartStore.dataMartSetForm.dbName,
    dbName: "public",
  });
  dataMartStore.dataMartSetForm.dbType = dbConnStore.dbConnSetTable.dbType;
  dataMartStore.dataMartSetForm.connName = dbConnStore.dbConnSetTable.connName;
  dataMartStore.dataMartSetForm.database = dbConnStore.dbConnSetTable.database;
  dataMartStore.dataMartSetForm.host = dbConnStore.dbConnSetTable.host;
  dataMartStore.dataMartSetForm.dbName = "public";
};
</script>
