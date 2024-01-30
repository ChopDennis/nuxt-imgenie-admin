<template>
  <div>
    <DataMartSetForm
      :table="connSetTable"
      @show-error="(error) => (errorMessage = error)"
    >
      <template #upload>
        <DataMartUpload
          ref="dataMartUploadRef"
          :error-message="errorMessage"
          :is-upload="isUpload"
          @upload="fileFormUpload"
          @remove="fileFormFileRemove"
          @open-dialog="openDbmlDialog"
        />
      </template>
    </DataMartSetForm>
    <ElDialog
      v-model="dbmlPreviewDialog"
      width="800"
      :title="store.setting.fileName"
      modal-class="backdrop-blur-sm"
      :destroy-on-close="true"
      align-center
      class="dbml-dialog"
      ><div v-highlight>
        <pre><code>{{ dbmlPreviewContent }}</code></pre>
      </div></ElDialog
    >
  </div>
</template>
<script setup lang="ts">
import type { UploadRawFile } from "element-plus";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  id: String,
});
const store = useDataMartStore();
const dbmlPreviewContent = ref("");
const connSetTable = ref<any>([]);
const dbmlPreviewDialog = ref(false);
const errorMessage = ref("");
const isUpload = ref(false);

onNuxtReady(async () => {
  if (Object.keys(store.setting).length > 0) {
    await useDataMartApi().getQuery(props?.id as string);
    const { dbType, connName, host, database, dbName } = store.setting;
    connSetTable.value.push({
      dbType,
      connName,
      host,
      database,
      dbName,
    });
    const dbml = await useDataMartApi().getExport();
    if (dbml) {
      if (dbml.size < 1000 * 1000) {
        store.dbml = new File([dbml], `${store.setting.fileName}`, {
          type: "application/octet-stream",
        });
        dbmlPreviewContent.value = await store.dbml.text();
        isUpload.value = true;
        errorMessage.value = "";
      } else {
        errorMessage.value = "檔案大小超過1MB限制";
      }
    }
  }
});

const fileFormUpload = async (fileFormUpload: UploadRawFile) => {
  if (fileFormUpload) {
    if (fileFormUpload.name.split(".")[1] === "dbml") {
      if (fileFormUpload.size < 1000 * 1000) {
        store.setting.fileName = fileFormUpload.name;
        store.dbml = fileFormUpload;
        dbmlPreviewContent.value = await fileFormUpload.text();
        isUpload.value = true;
        errorMessage.value = "";
      } else {
        errorMessage.value = "檔案大小超過1MB限制";
      }
    } else {
      errorMessage.value = "限制只能上傳DBML檔";
    }
  }
};

const fileFormFileRemove = () => {
  isUpload.value = false;
  store.dbml = null;
};

const openDbmlDialog = (val: boolean) => {
  dbmlPreviewDialog.value = val;
};
</script>
