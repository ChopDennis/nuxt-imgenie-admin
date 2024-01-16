<template>
  <div class="w-1/2">
    <div v-if="!props.isUpload" class="w-full">
      <ElUpload
        :on-change="handleChange"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        :drag="true"
        :class="{
          'upload-error': props.errorMessage !== '',
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
      <div class="text-red-400 p-1 text-xs">{{ props.errorMessage }}</div>
    </div>
    <div v-else class="flex w-full">
      <div
        class="flex justify-between w-full border pl-4 mr-4 rounded-lg overflow-hidden"
      >
        <div>{{ store.setting.fileName }}</div>
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
          @click="emit('openDialog', true)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UploadProps, UploadRawFile } from "element-plus";

const emit = defineEmits<{
  upload: [dbml: UploadRawFile];
  remove: [null];
  openDialog: [boolean];
}>();

const props = defineProps<{
  errorMessage: string;
  isUpload: boolean;
}>();

const store = useDataMartStore();

const handleChange: UploadProps["onChange"] = (uploadFile) => {
  if (uploadFile.raw) {
    emit("upload", uploadFile.raw);
  }
};

const clickRemoveIcon = () => {
  emit("remove", null);
};
</script>
