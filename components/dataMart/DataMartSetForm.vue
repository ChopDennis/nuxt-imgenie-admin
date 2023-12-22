<template>
  <div>
    <div
      class="bg-white rounded-lg p-5 shadow-custom-lg grid-cols-1 grid gap-0 overflow-scroll"
    >
      <div>
        <h1 class="text-xl font-bold tracking-wide">資料模型資料</h1>
        <ElDivider />
        <ElForm
          ref="dataMartSetFormRef"
          class="data-mart-form"
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
                :autosize="{ minRows: 2, maxRows: 6 }"
                type="textarea"
                resize="none"
                maxlength="200"
                style=""
              ></ElInput>
            </div>
            <div class="flex justify-between w-full pl-2">
              <div>限制 200 字元</div>
              <div class="text-gray-400">
                {{ dataMartStore.dataMartSetForm.description.length }}/200
              </div>
            </div>
          </ElFormItem>
          <ElFormItem label="資料庫連線設定">
            <div class="w-full pt-2 pl-2 -mt-10">
              <div class="flex justify-end">
                <div
                  style="height: 32px; width: 110px"
                  class="flex items-center justify-center gap-1 py-1 px-4 mb-1 text-sm text-hover"
                  @click="dialog = !dialog"
                >
                  <div><ElIconSetting width="18"></ElIconSetting></div>
                  <div>連線設定</div>
                </div>
              </div>
              <ClientOnly>
                <ElTable
                  :data="connSetTable"
                  max-height="650"
                  size="large"
                  empty-text="尚未設定"
                >
                  <!-- <template #empty>
                    <div class="w-full flex justify-center">
                      <div
                        style="height: 32px; width: 110px"
                        class="flex items-center justify-center gap-1 py-1 px-4 text-sm"
                        @click="dialog = !dialog"
                      >
                        <div><ElIconSetting width="18"></ElIconSetting></div>
                        <div>連線設定</div>
                      </div>
                    </div>
                  </template> -->
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
              </ClientOnly>
            </div>
          </ElFormItem>
          <div class="mt-9">
            <ElFormItem label="資料說明文件" class="data-mart-upload">
              <div class="pl-2 pb-12 w-full">
                <DataMartUpload @upload="fileFormUpload" />
              </div>
            </ElFormItem>
          </div>
        </ElForm>
      </div>
    </div>
    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="navigateTo({ path: '/data-mart' })">取消</ElButton>
      <ElButton type="primary" @click="clickUpload()">儲存</ElButton>
    </div>
    <ElDialog
      v-model="dialog"
      title="資料庫連線設定"
      modal-class="backdrop-blur-sm"
      :destroy-on-close="true"
      align-center
      width="572"
      class="conn-set-dialog"
    >
      <DataMartSetDialog />
      <template #footer>
        <div class="flex justify-center">
          <ElButton @click="dialog = false">取消</ElButton>
          <ElButton type="primary" @click="clickConfirm()">儲存</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
import type { UploadRawFile } from "element-plus";
interface ConnSetTable {
  dbType: string;
  connName: string;
  host: string;
  database: string;
  dbName: string;
}
const props = defineProps<{
  table: ConnSetTable[];
}>();
const dataMartStore = useDataMartStore();
const dbConnStore = useDbConnectionStore();
const icons = useDbConnIcons();
const dbmlFile = ref<UploadRawFile | File>();
const connSetTable = ref<ConnSetTable[]>(props.table);
const dialog = ref(false);

const fileFormUpload = (fileFormUpload: UploadRawFile | File) => {
  dbmlFile.value = fileFormUpload;
};

const clickUpload = async () => {
  const formData = new FormData();
  dataMartStore.dataMartSetForm = useForm().trim(
    dataMartStore.dataMartSetForm,
  ) as DataMartSetForm;
  const data = new File(
    [JSON.stringify(dataMartStore.dataMartSetForm)],
    "data.json",
    {
      type: "application/json",
    },
  );
  if (dbmlFile.value) {
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
  if (connSetTable.value) connSetTable.value.pop();
  connSetTable.value.push({
    ...dbConnStore.dbConnSetTable,
    dbName: dataMartStore.dataMartSetForm.dbName,
  });
  dataMartStore.dataMartSetForm.dbType = dbConnStore.dbConnSetTable.dbType;
  dataMartStore.dataMartSetForm.connName = dbConnStore.dbConnSetTable.connName;
  dataMartStore.dataMartSetForm.database = dbConnStore.dbConnSetTable.database;
  dataMartStore.dataMartSetForm.host = dbConnStore.dbConnSetTable.host;
};
</script>
