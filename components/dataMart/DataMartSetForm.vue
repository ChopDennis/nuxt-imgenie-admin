<template>
  <div class="pt-4 px-6 pb-6">
    <div
      class="bg-white rounded-lg p-5 shadow-custom-lg grid-cols-1 grid gap-0 overflow-scroll"
    >
      <div>
        <h1 class="font-bold tracking-wide">資料模型資料</h1>
        <ElDivider />
        <ElForm
          ref="dataMartSetFormRef"
          class="data-mart-form"
          :model="dataMartStore.setting"
          :rules="formRules"
          label-width="120px"
        >
          <ElFormItem label="資料模型名稱" prop="datamartName">
            <div class="ml-2 w-full">
              <ElInput v-model="dataMartStore.setting.datamartName"></ElInput>
            </div>
          </ElFormItem>
          <ElFormItem label="資料模型說明" prop="description">
            <div class="ml-2 w-full">
              <ElInput
                v-model="dataMartStore.setting.description"
                :autosize="{ minRows: 2, maxRows: 6 }"
                type="textarea"
                resize="none"
                maxlength="100"
                style=""
              ></ElInput>
            </div>
            <div class="flex justify-between w-full pl-2">
              <div>限制 100 字元</div>
              <div class="text-gray-400">
                {{ dataMartStore.setting.description.length }}/100
              </div>
            </div>
          </ElFormItem>
          <ElFormItem label="資料庫連線設定" prop="connId">
            <ElInput
              hidden
              :model="dataMartStore.setting.connId"
              class="hiddenInput"
            ></ElInput>
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
                <slot name="upload"></slot>
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
import type { FormInstance, FormRules } from "element-plus";
const dataMartSetFormRef = ref<FormInstance>();

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

const emits = defineEmits<{
  showError: [string];
}>();

const dataMartStore = useDataMartStore();
const dbConnStore = useDbConnectionStore();
const icons = useDbConnIcons();
const connSetTable = ref<ConnSetTable[]>(props.table);
const dialog = ref(false);

const clickUpload = async () => {
  dataMartStore.setting = useForm().trim(
    dataMartStore.setting,
  ) as DataMartSetting;
  const valid = await useForm().validate(dataMartSetFormRef.value);
  const formData = new FormData();
  const data = new File([JSON.stringify(dataMartStore.setting)], "data.json", {
    type: "application/json",
  });
  formData.append("data", data);
  formData.append("file", dataMartStore.dbml as File);
  if (valid && !isNull(dataMartStore.dbml)) {
    await dataMartApi().sendSave(formData);
    await dataMartApi().getTable();
    navigateTo({ path: "/data-mart" });
  } else {
    emits("showError", "請上傳DBML(必填)");
  }
};

const clickConfirm = async () => {
  dialog.value = false;
  await dbConnectionApi().getQuery(dataMartStore.setting.connId);
  if (connSetTable.value) connSetTable.value.pop();
  connSetTable.value.push({
    ...dbConnStore.select,
    dbName: dataMartStore.setting.dbName,
  });
  dataMartStore.setting.dbType = dbConnStore.select.dbType;
  dataMartStore.setting.connName = dbConnStore.select.connName;
  dataMartStore.setting.database = dbConnStore.select.database;
  dataMartStore.setting.host = dbConnStore.select.host;
};

const formRules = reactive<FormRules<ConnectionSetForm>>({
  datamartName: [{ required: true, message: "請輸入資料模型名稱" }],
  description: [{ required: true, message: "請輸入資料模型說明" }],
  connId: [{ required: true, message: "請選擇資料庫連線" }],
});
</script>
