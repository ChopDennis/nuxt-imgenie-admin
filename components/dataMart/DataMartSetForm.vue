<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      <h1 class="text-xl font-bold tracking-wide">DataMart 資料</h1>
      <ElDivider />
      <ElForm
        ref="dataMartSetFormRef"
        :model="dataMartStore.dataMartSetForm"
        label-width="250px"
      >
        <ElFormItem label="Data Mart 名稱: ">
          <ElInput
            v-model="dataMartStore.dataMartSetForm.datamartName"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="Data Mart 說明: ">
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
          <div class="w-full">
            <ElUpload
              v-model:file-list="fileList"
              :multiple="false"
              :on-change="handleChange"
              :auto-upload="false"
              :before-remove="beforeRemove"
              :limit="1"
            >
              <el-button>上傳 DBML</el-button>
            </ElUpload>
          </div>
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
import type { UploadProps, UploadUserFile } from "element-plus";

const props = defineProps<{
  file: File | null;
}>();
const dataMartStore = useDataMartStore();
const dbConnStore = useDbConnectionStore();
const icons = dynamicImportDbConnectionIcons();

const fileList = ref<UploadUserFile[]>([]);
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

let dbmlFile: unknown = props.file;

if (!isNull(dbmlFile)) {
  const fileWithUid = { ...(dbmlFile as File), uid: 0 };

  fileList.value.push({
    name: `${dataMartStore.dataMartSetForm.dbName}.dbml`,
    raw: fileWithUid,
  });
}

const handleChange: UploadProps["onChange"] = (uploadFile) => {
  fileList.value.pop();
  fileList.value.push(uploadFile);
  dbmlFile = fileList.value[0].raw;
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

  formData.append("data", data);
  formData.append("file", dbmlFile as File);
  await dataMartStore.getDataMartSave(formData);
  await dataMartStore.getDataMartTable();
  navigateTo({ path: "/data-mart" });
};

const clickConfirm = async () => {
  dialog.value = false;
  await dbConnStore.getDbConnQuery(dataMartStore.dataMartSetForm.connId);
  connTable.value.pop();
  connTable.value.push({
    ...dbConnStore.dbConnSetTable,
    dbName: dataMartStore.dataMartSetForm.dbName,
  });
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`,
  ).then(
    () => true,
    () => false,
  );
};
</script>
