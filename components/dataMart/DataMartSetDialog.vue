<template>
  <div class="">
    <ElForm label-width="150px">
      <ElFormItem label="連線類型: ">
        <div
          v-for="(type, index) in store.dbConnTypesRes"
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
            {{ type.itemId }}
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="資料來源: ">
        <ElSelect
          ref="ElSelectRef"
          v-model="selectConnId"
          class="ml-2"
          style="width: 425px"
          @change="changeSelectConn()"
        >
          <ElOption
            v-for="list in optionList"
            :key="list.connId"
            :label="`${list.connType}-${list.connName}`"
            :value="list.connId"
          ></ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="資料集/資料庫: ">
        <ElSelect
          v-model="selectSchemas"
          class="ml-2"
          style="width: 425px"
          @change="changeSelectSchemas()"
        >
          <ElOption
            v-for="schema in store.dbConnSchemaRes"
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
const store = useDbConnectionStore();
const dataMartStore = useDataMartStore();
const icons = dynamicImportDbConnectionIcons();
const selectConnId = ref("");
const selectSchemas = ref("");
const selectDbType = ref("postgresql");
await store.getDbConnActiveList();
await store.getDbConnTypes();

const optionList = computed(() => {
  return _useFilter(store.dbConnListMap, [
    "connType",
    _useUpperFirst(selectDbType.value),
  ]);
});

const changeSelectConn = async () => {
  dataMartStore.dataMartSetForm.connId = selectConnId.value;
  await store.getDbConnSchemas(selectConnId.value);
};
const changeSelectSchemas = () => {
  dataMartStore.dataMartSetForm.dbName = selectSchemas.value;
};

const changeDbType = (type: string) => {
  selectDbType.value = type;
  selectConnId.value = "";
};
</script>
<style>
.db-type-active {
  background-color: rgba(239, 244, 254, 1);
}
</style>
