<template>
  <div class="">
    <ElForm label-width="70px" label-position="right">
      <ElFormItem label="連線類型">
        <div class="flex justify-between gap-2 ml-2 -mt-1">
          <div
            v-for="(type, index) in dbConnStore.dbConnTypesRes"
            :key="index"
            style="width: 140px"
            @click="changeDbType(type.itemId)"
          >
            <div
              class="flex p-3 gap-2 justify-center cursor-pointer border rounded-lg text-sm"
              :class="{
                'db-type-active': selectDbType === type.itemId,
              }"
            >
              <div>
                <img :src="icons[`ic_${type.itemId}`]" class="w-6" width="24" />
              </div>
              <div>
                {{ dbTypeTitle[`${type.itemId}`] }}
              </div>
            </div>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="資料來源">
        <ElSelect
          ref="ElSelectRef"
          v-model="selectConnId"
          placeholder="請選擇資料來源"
          class="ml-2"
          style="width: 436px"
          :disabled="selectDbType === ''"
          @change="changeSelectConn()"
        >
          <template #header
            ><div>
              <ElInput
                v-model="searchText"
                placeholder="請輸入搜尋資料庫名稱/連線名稱/主機名稱或IP"
              >
                <template #suffix>
                  <div
                    class="border-l h-full w-full flex justify-center items-center"
                  >
                    <img
                      class="ml-2"
                      src="~/assets/icons/data-mart/ic_search.svg"
                    />
                  </div>
                </template>
              </ElInput></div
          ></template>
          <ElOption
            v-for="list in filteredList"
            :key="list.connId"
            :label="`${list.connName}`"
            :value="list.connId"
          >
            <template #default>
              <div class="flex flex-col pb-2 rounded-lg">
                <div class="px-3 py-1">{{ list.connName }}</div>
                <div
                  class="text-xs px-3"
                  style="color: var(--el-text-color-secondary)"
                >
                  {{ list.connInfoHostPort }}/{{ list.connInfoDatabase }}
                </div>
              </div>
            </template>
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Schema">
        <ElSelect
          v-model="selectSchemas"
          placeholder="請選擇 Schema"
          class="ml-2"
          style="width: 436px"
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
const searchText = ref("");
await dbConnStore.getDbConnActiveList();
await dbConnStore.getDbConnTypes();
const dbTypeTitle = ref<{ [key: string]: any }>({
  postgresql: "Postgre SQL",
  bigquery: "Big Query",
  presto: "Presto",
});
const route = useRoute();

onMounted(async () => {
  if (route.query.datamartId) {
    const { data, execute } = useApi(ApiDbConnection.Schemas, {
      params: { connId: selectConnId.value },
      immediate: false,
    });
    await execute();
    const schemas = data.value as ApiResponse;
    dbConnStore.dbConnSchemaRes = schemas.data;
  }
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

const filteredList = computed(() => {
  return _useFilter(optionList.value, (list) => {
    const text = searchText.value.toLocaleLowerCase();
    const connName = list.connName.toLocaleLowerCase();
    return (
      _useIncludes(connName, text) ||
      _useIncludes(list.connInfoDatabase, text) ||
      _useIncludes(list.connInfoHostPort, text)
    );
  });
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
  searchText.value = "";
  dbConnStore.dbConnSchemaRes = [];
};
</script>
<style>
.db-type-active {
  background-color: rgba(239, 244, 254, 1);
}
</style>
