<template>
  <div class="pt-4 px-6 pb-6">
    <DataMartSetForm
      :id="props?.id"
      ref="dataMartSetFormRef"
      :table="connSetTable"
    >
      <template #upload>
        <DataMartUpload
          :id="props?.id"
          v-model:is-upload="isUpload"
          v-model:non-upload="nonUpload"
        />
      </template>
    </DataMartSetForm>
    <div
      class="flex w-full justify-end gap-2 bg-slate-400 fixed bottom-0 left-0 py-2 px-6 data-mart-bottom"
    >
      <ElButton @click="emit('update:edit', false)">取消</ElButton>
      <ElButton type="primary" @click="clickUpload()">儲存</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataMartSetForm from "~/components/dataMart/DataMartSetForm.vue";
const dataMartSetFormRef = ref<InstanceType<typeof DataMartSetForm>>();

const props = defineProps<{ id: string }>();
const emit = defineEmits(["update:edit", "update:id", "showError"]);

const dataMartStore = useDataMartStore();
const connSetTable = ref<any>([]);
const isUpload = ref<boolean>(false);
const nonUpload = ref<boolean>(false);
onNuxtReady(async () => {
  if (Object.keys(dataMartStore.setting).length > 0) {
    await useDataMartApi().getQuery(props?.id as string);
    const { dbType, connName, host, database, dbName } = dataMartStore.setting;
    connSetTable.value.push({
      dbType,
      connName,
      host,
      database,
      dbName,
    });
  }
});

const clickUpload = async () => {
  dataMartStore.setting = useForm().trim(
    dataMartStore.setting,
  ) as DataMartSetting;

  const valid = await dataMartSetFormRef.value?.valid();
  const formData = new FormData();
  const data = new File([JSON.stringify(dataMartStore.setting)], "data.json", {
    type: "application/json",
  });

  formData.append("data", data);

  if (isUpload.value) {
    formData.append("file", dataMartStore.dbml as File);
  } else {
    const emptyFile = new File([], "", {
      type: "application/octet-stream",
    });
    formData.append("file", emptyFile);
  }

  if (valid && !isNull(dataMartStore.dbml)) {
    await useDataMartApi().sendSave(formData);
  } else {
    nonUpload.value = true;
  }
};
</script>
