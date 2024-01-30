<template>
  <div class="w-1/2">
    <div v-if="!fileName" class="w-full">
      <ElUpload
        :on-change="handleUpload"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        :drag="true"
        :class="{
          'upload-error': fileUploadError !== '',
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
      <div class="text-red-400 p-1 text-xs">{{ fileUploadError }}</div>
      <div v-if="props.nonUpload" class="text-red-400 p-1 text-xs">
        請上傳DBML(必填)
      </div>
    </div>
    <div v-else class="flex w-full">
      <div
        class="flex justify-between w-full border pl-4 mr-4 rounded-lg overflow-hidden"
      >
        <div>{{ fileName }}</div>
        <div class="flex justify-center w-8 h-8" @click="removeUpload">
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
          @click="isPreviewDialog = true"
        />
      </div>
    </div>
    <ElDialog
      v-model="isPreviewDialog"
      width="800"
      :title="fileName"
      modal-class="backdrop-blur-sm"
      :destroy-on-close="true"
      align-center
      class="dbml-dialog"
      ><div v-highlight>
        <pre><code>{{ fileContent }}</code></pre>
      </div></ElDialog
    >
  </div>
</template>
<script setup lang="ts">
import type { UploadProps } from "element-plus";
const dataMartStore = useDataMartStore();

onNuxtReady(async () => {
  const exportFile = await useDataMartApi().getExport(props?.id as string);
  if (exportFile) {
    fileContent.value = await exportFile.text();
    fileName.value = exportFile.name;
    updateStore(exportFile);
  }
});

const props = defineProps<{ id: string; nonUpload: boolean }>();

const emit = defineEmits(["update:isUpload", "update:nonUpload"]);

const fileContent = ref("");
const fileName = ref("");
const fileUploadError = ref("");
const isPreviewDialog = ref(false);

const handleUpload: UploadProps["onChange"] = async (uploadFile) => {
  if (uploadFile.raw) {
    const result = useUpload(["dbml"]).handleFileUploadChange(uploadFile.raw);
    if (result instanceof File) {
      updateStore(result);
      emit("update:isUpload", true);
      emit("update:nonUpload", false);
      fileName.value = result.name;
      fileContent.value = await result.text();
      fileUploadError.value = "";
    } else {
      fileName.value = "";
      fileContent.value = "";
      fileUploadError.value = result;
    }
  }
};

const removeUpload = () => {
  fileContent.value = "";
  fileName.value = "";
  dataMartStore.dbml = null;
  emit("update:nonUpload", false);
};

const updateStore = (file: File) => {
  dataMartStore.setting.fileName = file.name;
  dataMartStore.dbml = file;
};
</script>
