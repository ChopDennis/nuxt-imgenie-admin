<template>
  <div class="w-1/2">
    <div v-if="!isUpload" class="w-full">
      <ElUpload
        :on-change="handleChange"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        :drag="true"
        :class="{
          'upload-error': errorMessage !== '',
        }"
      >
        <div class="flex flex-col items-center gap-2">
          <div>
            <img src="~/assets/icons/data-mart/ic_upload.svg" width="48" />
          </div>
          <div>
            <p style="color: rgba(0, 0, 0, 0.87) !important">
              將資料拖曳此處，或點擊上傳
            </p>
            <p style="color: rgba(0, 0, 0, 0.45)" class="-mt-2">
              限.dbml格式(1MB以內)
            </p>
          </div>
        </div>
      </ElUpload>
      <div class="text-red-400 px-1">{{ errorMessage }}</div>
    </div>
    <div v-else class="flex w-full">
      <div class="flex justify-between w-full border pl-4 mr-4 rounded-lg">
        <div>{{ uploadName }}</div>
        <div class="flex justify-center w-8 h-8" @click="clickRemoveIcon">
          <ElIconCircleCloseFilled width="14" class="self-center" />
        </div>
      </div>
      <div
        class="border p-2 rounded-lg -ml-1 icon-hover"
        style="box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15)"
      >
        <img
          class="m-auto"
          src="~/assets/icons/data-mart/ic_export_dbml.svg"
          @click="dbmlPreviewDialog = true"
        />
      </div>
    </div>

    <ElDialog
      v-model="dbmlPreviewDialog"
      width="auto"
      :title="uploadName"
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
import type { UploadProps, UploadRawFile } from "element-plus";

const emit = defineEmits<{
  upload: [dbml: UploadRawFile | File];
  remove: any;
}>();

const isUpload = ref(false);
const uploadName = ref("");
const errorMessage = ref("");
const errorStatus = ref(false);

const dbmlPreviewDialog = ref(false);
const dbmlPreviewContent = ref();

const userUploadFile = ref<UploadRawFile | File>();

const store = useDataMartStore();
const route = useRoute();
setTimeout(async () => {
  if (route.query.datamartId) {
    const dbml = await store.getDataMartExport(
      _useToString(route.query.datamartId),
    );

    if (dbml) {
      if (dbml.size < 1000 * 1000) {
        userUploadFile.value = new File(
          [dbml],
          `${store.dataMartQueryFileName}`,
          {
            type: "application/octet-stream",
          },
        );
        isUpload.value = true;
        errorMessage.value = "";
        uploadName.value = store.dataMartFileName;
        dbmlPreviewContent.value = await userUploadFile.value.text();
        emit("upload", userUploadFile.value);
      } else {
        errorMessage.value = "檔案大小超過1MB限制";
      }
    }
  }
}, 500);

const handleChange: UploadProps["onChange"] = async (uploadFile) => {
  if (uploadFile.raw) {
    if (uploadFile.raw.name.split(".")[1] === "dbml") {
      if (uploadFile.raw.size < 1000 * 1000) {
        userUploadFile.value = uploadFile.raw;
        isUpload.value = true;
        errorMessage.value = "";
        uploadName.value = uploadFile.name;
        dbmlPreviewContent.value = await userUploadFile.value.text();
        emit("upload", userUploadFile.value);
      } else {
        errorMessage.value = "檔案大小超過1MB限制";
      }
    } else {
      errorMessage.value = "限制只能上傳DBML檔";
    }
  }
};

const clickRemoveIcon = () => {
  isUpload.value = false;
  emit("remove", null);
};

const setErrorUpload = (message: string) => {
  errorMessage.value = message;
  errorStatus.value = true;
};
defineExpose({
  setErrorUpload,
});
</script>
<style scoped>
.upload-error {
  border: 1px solid rgb(248 113 113 /400);
  border-radius: 8px;
}
</style>
