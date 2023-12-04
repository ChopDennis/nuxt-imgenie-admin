<template>
  <div class="px-5 mt-4">
    <div class="bg-white rounded-lg p-5 shadow-custom-lg">
      <h1 class="text-xl font-bold tracking-wide">DataMart 資料</h1>
      <ElDivider />
      <ElForm ref="dataMartFormRef" :model="info" label-width="250px">
        <ElFormItem label="Data Mart 名稱: ">
          <ElInput v-model="info.datamartName"></ElInput>
        </ElFormItem>
        <ElFormItem label="Data Mart 說明: ">
          <ElInput v-model="info.description"></ElInput>
        </ElFormItem>
        <ElButton @click="dialog = !dialog">設定</ElButton>
        <ElDialog
          v-model="dialog"
          title="資料庫連線設定"
          modal-class="backdrop-blur-sm"
          align-center
        >
          <!-- {{ store.dbConnListMap }} -->
        </ElDialog>
        <ClientOnly>
          <ElTable :data="connTable" max-height="650" size="large">
            <ElTableColumn label="資料庫來源" width="150" align="center"
              ><template #default="scope">
                <img
                  class="m-auto"
                  src="~/assets/icons/dbConnection/ic_postgresql.svg"
                />{{ scope.row.connName }}
              </template>
            </ElTableColumn>
            <ElTableColumn prop="database" label="資料庫名稱" min-width="150" />
            <ElTableColumn prop="host" label="主機名稱及IP" min-width="150" />

            <ElTableColumn prop="dbName" label="資料庫/資料集" min-width="150">
              <template #default="scope">
                {{ scope.row.database }}/{{ scope.row.dbName }}
              </template>
            </ElTableColumn>
          </ElTable>
        </ClientOnly>
        <ElFormItem label="請輸入資料庫Schema(DBML格式): ">
          <ElUpload
            v-model:file-list="fileList"
            :multiple="false"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <el-button type="primary">Click to upload</el-button>
          </ElUpload>
        </ElFormItem>
        <ElButton @click="clickUpload()">上傳</ElButton>
      </ElForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UploadProps, UploadUserFile } from "element-plus";
const props = defineProps<{
  dataMartInfo: DataMartInfo;
}>();
const dialog = ref(false);
// const store = useDbConnectionStore();
const store = useDataMartStore();
const info = reactive(props.dataMartInfo);
const connTable = ref<any>([]);
const { dbName, datamartId, description, datamartName, dbConnection } = info;
const { dbType, connName, connInfo, connId } = dbConnection;
connTable.value.push({
  dbType,
  connName,
  ...connInfo,
  dbName,
});
// await store.getDbConnList(false, false);
const jsonRawData = {
  datamartId,
  description,
  dbName,
  connId,
  datamartName,
  isActivate: true,
};

const fileList = ref<UploadUserFile[]>([]);

const handleChange: UploadProps["onChange"] = (uploadFile) => {
  fileList.value.push(uploadFile);
};
const clickUpload = async () => {
  // 将 JSON 数据转换为字符串
  const jsonString = JSON.stringify(jsonRawData);

  // 创建 Blob 对象
  const blob = new Blob([jsonString], { type: "application/json" });

  // 创建 File 对象
  const data = new File([blob], "data.json", { type: "application/json" });

  // 现在，'file' 就是包含 JSON 数据的 File 对象
  // ==========================================================================================================
  const dbml = await store.getDataMartExport(datamartId);
  const file = new File([dbml], "test.dbml", {
    type: "application/octet-stream",
  });

  const fileWithUid = { ...file, uid: 0 };

  fileList.value.push({
    name: "test.dbml",
    raw: fileWithUid,
    uid: 0,
  });
  // ==========================================================================================================

  const formData = new FormData();
  formData.append("data", data);
  formData.append("file", file);
  await store.getDataMartSave(formData);
};
</script>
