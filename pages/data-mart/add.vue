<template>
  <div>
    <div class="flex flex-col">
      <div
        class="flex flex-col gap-4 px-5 pb-4 sticky top-0 bg-white -mt-1 z-50"
      >
        <div class="flex text-sm">
          <p class="text-gray-300">
            首頁&nbsp;/&nbsp;系統管理&nbsp;/&nbsp;DataMart&nbsp;設定&nbsp;/&nbsp;
          </p>
          <p>DataMart 編輯</p>
        </div>
        <div class="flex justify-between">
          <h1 class="text-xl font-bold tracking-wide">DataMart 編輯</h1>
          <div>
            <ElButton :icon="ElIconRefresh" type="primary">重新整理</ElButton>
            <ElButton :icon="ElIconPlus" type="primary"
              >新增 Data Mart</ElButton
            >
          </div>
        </div>
      </div>
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

            <ElDialog
              v-model="dialog"
              title="資料庫連線設定"
              modal-class="backdrop-blur-sm"
              align-center
            >
              <DataMartSetDialog />
            </ElDialog>
            <ClientOnly>
              <div class="flex flex-col w-full gap-2 mb-4">
                <div class="flex justify-end">
                  <ElButton @click="dialog = !dialog">資料庫設定</ElButton>
                </div>
                <div class="flex justify-end">
                  <div style="width: 850px">
                    <ElTable :data="connTable" max-height="650" size="large">
                      <ElTableColumn
                        label="資料庫來源"
                        width="150"
                        align="center"
                        ><template #default="scope">
                          <img
                            class="m-auto"
                            src="~/assets/icons/dbConnection/ic_postgresql.svg"
                          />{{ scope.row.connName }}
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
              <ElUpload
                v-model:file-list="fileList"
                :multiple="false"
                :on-change="handleChange"
                :auto-upload="false"
              >
                <el-button>上傳 DBML</el-button>
              </ElUpload>
            </ElFormItem>
          </ElForm>
          <div class="flex w-full justify-end gap-2">
            <ElButton @click="navigateTo({ path: '/data-mart' })"
              >取消</ElButton
            >
            <ElButton type="primary" @click="clickUpload()">儲存</ElButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UploadProps, UploadUserFile } from "element-plus";

const dialog = ref(false);
const store = useDataMartStore();
const info = reactive({
  datamartName: "",
  description: "",
  datamartId: "",
});
const connTable = ref<any>([
  {
    dbType: "",
    connName: "",
    host: "",
    database: "",
    dbName: "",
  },
]);

const jsonRawData = {
  //   datamartId,
  //   description,
  //   dbName,
  //   connId,
  //   datamartName,
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
  const dbml = await store.getDataMartExport(info.datamartId);
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
<style scoped></style>
