<template>
  <div class="px-5 mt-4">
    <div
      class="bg-white rounded-lg p-5 shadow-custom-lg grid-cols-1 grid gap-0"
    >
      <div>
        <h1 class="text-xl font-bold tracking-wide">資料模型資料</h1>
        <ElDivider />
        <ElForm
          ref="dataMartSetFormRef"
          :model="dataMartStore.dataMartSetForm"
          label-width="120px"
        >
          <ElFormItem label="資料模型名稱">
            <div class="ml-2 w-full">
              <ElInput
                v-model="dataMartStore.dataMartSetForm.datamartName"
              ></ElInput>
            </div>
          </ElFormItem>
          <ElFormItem label="資料模型說明">
            <div class="ml-2 w-full">
              <ElInput
                v-model="dataMartStore.dataMartSetForm.description"
                type="textarea"
              ></ElInput>
            </div>
          </ElFormItem>

          <ElDialog
            v-model="dialog"
            title="資料庫連線設定"
            modal-class="backdrop-blur-sm"
            :destroy-on-close="true"
            align-center
            width="572"
          >
            <DataMartSetDialog />
            <template #footer>
              <div class="flex justify-center pt-3">
                <ElButton @click="dialog = false">取消</ElButton>
                <ElButton type="primary" @click="clickConfirm()">儲存</ElButton>
              </div>
            </template>
          </ElDialog>
          <ClientOnly>
            <div class="flex flex-col w-full gap-2 mb-4">
              <div class="flex justify-end">
                <div
                  style="height: 32px; width: 110px"
                  class="flex items-center justify-center gap-1 py-1 px-4 text-sm"
                  @click="dialog = !dialog"
                >
                  <div><ElIconSetting width="18"></ElIconSetting></div>
                  <div>連線設定</div>
                </div>
              </div>
              <div class="flex justify-end w-full pl-36">
                <div style="width: 100%">
                  <ElTable :data="connTable" max-height="650" size="large">
                    <ElTableColumn label="資料庫來源" width="300"
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

                    <ElTableColumn prop="dbName" label="Schema" min-width="150">
                      <template #default="scope">
                        {{ scope.row.database }}/{{ scope.row.dbName }}
                      </template>
                    </ElTableColumn>
                  </ElTable>
                </div>
              </div>
            </div>
          </ClientOnly>
          <ElFormItem label="資料說明文件">
            <div class="ml-2 w-full">
              <DataMartUpload @upload="fileFormUpload" />
            </div>
          </ElFormItem>
        </ElForm>
      </div>

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
    // console.log(await dbmlFile.value.text());
    formData.append("data", data);
    formData.append("file", dbmlFile.value as File);
    await dataMartStore.getDataMartSave(formData);
    await dataMartStore.getDataMartTable();
    navigateTo({ path: "/data-mart" });
  }
};

const clickConfirm = async () => {
  dialog.value = false;
  await dbConnStore.getDbConnQuery(dataMartStore.dataMartSetForm.connId);
  connTable.value.pop();
  connTable.value.push({
    ...dbConnStore.dbConnSetTable,
    dbName: dataMartStore.dataMartSetForm.dbName,
  });
  dataMartStore.dataMartSetForm.dbType = dbConnStore.dbConnSetTable.dbType;
  dataMartStore.dataMartSetForm.connName = dbConnStore.dbConnSetTable.connName;
  dataMartStore.dataMartSetForm.database = dbConnStore.dbConnSetTable.database;
  dataMartStore.dataMartSetForm.host = dbConnStore.dbConnSetTable.host;
};
</script>
