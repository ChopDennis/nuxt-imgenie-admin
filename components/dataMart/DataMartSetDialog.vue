<template>
  <div class="">
    <ElForm label-width="150px">
      <ElFormItem label="連線類型">
        <div
          v-for="(type, index) in dbConnStore.dbConnTypesRes"
          :key="index"
          style="width: 130px"
          class="flex items-center gap-2 cursor-pointer border p-2 mx-2 rounded-lg justify-center text-sm"
          :class="{
            'db-type-active': selectDbType === type.itemId,
          }"
          @click="changeDbType(type.itemId)"
        >
          <div>
            <img :src="icons[`ic_${type.itemId}`]" class="w-6" width="24" />
          </div>
          <div>
            {{ dbTypeTitle[`${type.itemId}`] }}
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="資料來源">
        <ElSelect
          ref="ElSelectRef"
          v-model="selectConnId"
          placeholder="請選擇資料來源"
          class="ml-2"
          style="width: 425px"
          :disabled="selectDbType === ''"
          @change="changeSelectConn()"
        >
          <ElOption
            v-for="list in optionList"
            :key="list.connId"
            :label="`${list.connName}`"
            :value="list.connId"
          >
            <span style="float: left">{{ list.connName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ list.connInfoHostPort }}/{{ list.connInfoDatabase }}</span
            >
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Schema">
        <ElSelect
          v-model="selectSchemas"
          placeholder="請選擇 Schema"
          class="ml-2"
          style="width: 425px"
          :disabled="selectDbType === ''"
          @change="changeSelectSchemas()"
        >
          <ElOption
            v-for="schema in dbConnStore.dbConnSchemaRes"
            :key="schema"
            :label="schema"
            :value="schema"
          ></ElOption>
        </ElSelect>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
const dbConnStore = useDbConnectionStore();
const dataMartStore = useDataMartStore();
const icons = dynamicImportDbConnectionIcons();
const selectConnId = ref("");
const selectSchemas = ref("");
const selectDbType = ref("");
await dbConnStore.getDbConnActiveList();
await dbConnStore.getDbConnTypes();
const dbTypeTitle = ref<{ [key: string]: any }>({
  postgresql: "Postgre SQL",
  bigquery: "Big Query",
  presto: "Presto",
});
const route = useRoute();

onMounted(async () => {
  const { data, execute } = useApi(ApiDbConnection.Schemas, {
    params: { connId: selectConnId.value },
    immediate: false,
  });
  await execute();
  const schemas = data.value as ApiResponse;
  dbConnStore.dbConnSchemaRes = schemas.data;
});

if (route.query.datamartId) {
  selectConnId.value = dataMartStore.dataMartSetForm.connId;
  selectSchemas.value = dataMartStore.dataMartSetForm.dbName;
  selectDbType.value = dataMartStore.dataMartSetForm.dbType;
}

const optionList = computed(() => {
  return _useFilter(dbConnStore.dbConnListMap, [
    "connType",
    _useUpperFirst(selectDbType.value),
  ]);
});

const changeSelectConn = async () => {
  dataMartStore.dataMartSetForm.connId = selectConnId.value;
  await dbConnStore.getDbConnSchemas(dataMartStore.dataMartSetForm.connId);
};
const changeSelectSchemas = () => {
  dataMartStore.dataMartSetForm.dbName = selectSchemas.value;
};

const changeDbType = (type: string) => {
  selectDbType.value = type;
  selectConnId.value = "";
  selectSchemas.value = "";
};
</script>
<style>
.db-type-active {
  background-color: rgba(239, 244, 254, 1);
}
</style>
