<template>
  <div class="w-1/2">
    <div v-if="!isUpload" class="w-full">
      <ElUpload
        :on-change="handleChange"
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        :drag="true"
      >
        <p>將資料拖曳此處，或點擊上傳</p>
      </ElUpload>
    </div>
    <div v-else class="flex w-full">
      <div class="flex justify-between w-full border pl-4 mr-4 rounded-lg">
        <div>{{ uploadName }}</div>
        <div class="flex justify-center w-8 h-8" @click="clickRemoveIcon">
          <ElIconCircleCloseFilled width="14" class="self-center" />
        </div>
      </div>
      <div
        class="border p-2 rounded-lg"
        style="box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15)"
      >
        <img
          class="m-auto"
          src="~/assets/icons/data-mart/data-mart-export-dbml.svg"
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
}>();

const isUpload = ref(false);
const uploadName = ref("");

const dbmlPreviewDialog = ref(false);
const dbmlPreviewContent = ref();

const userUploadFile = ref<UploadRawFile | File>();

const store = useDataMartStore();
const route = useRoute();
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
      uploadName.value = userUploadFile.value.name;
      dbmlPreviewContent.value = await userUploadFile.value.text();
      emit("upload", userUploadFile.value);
    } else {
      ElMessageBox.confirm("檔案大小超過 1MB 限制", "系統提示", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
      })
        .then(() => (isUpload.value = false))
        .catch(() => false);
    }
  }
}

const handleChange: UploadProps["onChange"] = async (uploadFile) => {
  if (uploadFile.raw) {
    if (uploadFile.raw.name.split(".")[1] === "dbml") {
      if (uploadFile.raw.size < 1000 * 1000) {
        userUploadFile.value = uploadFile.raw;
        isUpload.value = true;
        uploadName.value = uploadFile.name;
        dbmlPreviewContent.value = await userUploadFile.value.text();
        emit("upload", userUploadFile.value);
      } else {
        isUpload.value = await ElMessageBox.confirm(
          "檔案大小超過 1MB 限制",
          "系統提示",
          {
            confirmButtonText: "確認",
            cancelButtonText: "取消",
          },
        )
          .then(() => false)
          .catch(() => false);
      }
    } else {
      isUpload.value = await ElMessageBox.confirm(
        "限制只能上傳 DBML 檔",
        "系統提示",
        {
          confirmButtonText: "確認",
          cancelButtonText: "取消",
        },
      )
        .then(() => false)
        .catch(() => false);
    }
  }
};

const clickRemoveIcon = () => {
  isUpload.value = false;
};
</script>
