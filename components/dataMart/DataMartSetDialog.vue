<template>
  <div class="">
    <ElForm label-width="70px" label-position="right" class="conn-set-form">
      <ElFormItem label="連線類型">
        <ElSelect
          v-model="select.dbType"
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
          <template v-if="select.dbType" #prefix>
            <img :src="icons[`ic_${select.dbType}`]" class="w-6" width="24" />
          </template>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="資料來源">
        <ElSelect
          ref="ElSelectRef"
          v-model="select.connId"
          placeholder="請選擇資料來源"
          class="ml-2"
          style="width: 436px"
          :disabled="select.dbType === ''"
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
          v-model="select.schemas"
          placeholder="請選擇 Schema"
          class="ml-2"
          style="width: 436px"
          :disabled="select.dbType === ''"
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
const emits = defineEmits<{
  uploadButton: [boolean];
}>();
const dbConnStore = useDbConnectionStore();
const dataMartStore = useDataMartStore();
const icons = useDbConnIcons();
const select = reactive({
  connId: "",
  dbType: "",
  schemas: "",
});
const searchText = ref("");

onNuxtReady(async () => {
  await dbConnectionApi().getList();
  await dbConnectionApi().getTypes();
  if (useRoute().query.datamartId) {
    await dbConnectionApi().getSchemas(dataMartStore.setting.connId);
    select.connId = dataMartStore.setting.connId;
    select.schemas = dataMartStore.setting.dbName;
    select.dbType = dataMartStore.setting.dbType;
  } else {
    select.connId = dbConnStore.select.connId;
    select.schemas = dataMartStore.setting.dbName;
    select.dbType = dbConnStore.select.dbType;
  }
});

const optionList = computed(() => {
  return dbConnStore.list
    ? _useFilter(dbConnStore.list, ["dbType", select.dbType])
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
  dataMartStore.setting.connId = select.connId;
  dbConnStore.schemas = [];
  await dbConnectionApi().getSchemas(dataMartStore.setting.connId);
};
const changeSelectSchemas = () => {
  dataMartStore.setting.dbName = select.schemas;
  emits("uploadButton", true);
};

const changeDbType = () => {
  select.connId = "";
  select.schemas = "";
  searchText.value = "";
  dbConnStore.schemas = [];
  emits("uploadButton", false);
};
</script>
