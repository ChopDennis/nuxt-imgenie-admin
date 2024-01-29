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
          </div>
        </div>
      </ElUpload>
      <div class="text-red-400 p-1 text-xs">{{ props.errorMessage }}</div>
    </div>
    <div v-else class="flex w-full">
      {{ store.setting.form.bigqueryConnInfo }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UploadProps } from "element-plus";

const emit = defineEmits<{
  upload: [boolean];
  remove: [null];
  openDialog: [boolean];
}>();

const props = defineProps<{
  errorMessage: string;
  isUpload: boolean;
}>();

const store = useDbConnectionStore();

const handleChange: UploadProps["onChange"] = async (uploadFile) => {
  if (uploadFile.raw) {
    const info = await uploadFile.raw.text();
    console.log(JSON.parse(info));
    store.setting.form.bigqueryConnInfo = JSON.parse(info);
    store.setting.form.connName = "子齊測試 BigQuery 0115";
    emit("upload", true);
  }
};
</script>
