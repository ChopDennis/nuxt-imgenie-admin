<template>
  <div class="">
    <ElForm label-width="70px" label-position="right" class="conn-set-form">
      <ElFormItem label="連線類型">
        <ElSelect
          v-model="selectDbType"
          placeholder="請選擇連線類型"
          class="ml-2"
          style="width: 436px"
          @change="changeDbType()"
        >
          <ElOption
            v-for="(type, index) in dbConnStore.types"
            :key="index"
            :label="type.title"
            :value="type.itemId"
          >
            <template #default>
              <div class="flex p-3 rounded-lg items-center gap-2">
                <div>
                  <img
                    :src="icons[type.icon.split('.')[0]]"
                    class="w-6"
                    width="24"
                  />
                </div>
                <div class="" style="color: var(--el-text-color-secondary)">
                  {{ type.title }}
                </div>
              </div>
            </template>
          </ElOption>
          <template #prefix>
            <img :src="icons[`ic_${selectDbType}`]" class="w-6" width="24" />
          </template>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="資料來源">
        <ElSelect
          ref="ElSelectRef"
          v-model="selectConnId"
          placeholder="請選擇資料來源"
          class="ml-2"
          style="width: 436px"
          :disabled="selectDbType === ''"
          no-data-text="查無資料"
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
                  {{ list.host }}/{{ list.database }}
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
          no-data-text="請選擇資料來源"
          @change="changeSelectSchemas()"
        >
          <ElOption
            v-for="schema in dbConnStore.schemas"
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
const icons = useDbConnIcons();
const selectConnId = ref("");
const selectSchemas = ref("");
const selectDbType = ref("");
const searchText = ref("");

await dbConnectionApi().getList();
await dbConnectionApi().getTypes();

const route = useRoute();

onMounted(async () => {
  if (route.query.datamartId && !isEmpty(dbConnStore.list)) {
    const { data, execute } = useApi("/api/datamart/dbconnection/schemas", {
      params: { connId: selectConnId.value },
      immediate: false,
    });
    await execute();
    const schemas = data.value as ApiResponse;
    dbConnStore.schemas = schemas.data;
  }
});

if (route.query.datamartId && !isEmpty(dbConnStore.list)) {
  selectConnId.value = dataMartStore.dataMartSetForm.connId;
  selectSchemas.value = dataMartStore.dataMartSetForm.dbName;
  selectDbType.value = dataMartStore.dataMartSetForm.dbType;
}

const optionList = computed(() => {
  return dbConnStore.list
    ? _useFilter(dbConnStore.list, ["dbType", selectDbType.value])
    : [];
});

const filteredList = computed(() => {
  return _useFilter(optionList.value, (list) => {
    const text = searchText.value.toLocaleLowerCase();
    const connName = list.connName.toLocaleLowerCase();
    return (
      _useIncludes(connName, text) ||
      _useIncludes(list.database, text) ||
      _useIncludes(list.host, text)
    );
  });
});

const changeSelectConn = async () => {
  dataMartStore.dataMartSetForm.connId = selectConnId.value;
  await dbConnectionApi().getSchemas(dataMartStore.dataMartSetForm.connId);
};
const changeSelectSchemas = () => {
  dataMartStore.dataMartSetForm.dbName = selectSchemas.value;
};

const changeDbType = () => {
  // selectDbType.value = selectDbType.value !== type ? type : "";
  selectConnId.value = "";
  selectSchemas.value = "";
  searchText.value = "";
  dbConnStore.schemas = [];
};
</script>
