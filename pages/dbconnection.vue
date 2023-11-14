<template>
  <div>
    <div class="px-5 flex">
      <p class="text-gray-300">首頁／系統管理／</p>
      <p>資料庫連線</p>
    </div>
    <!-- 資料庫連線 -->
    <div class="flex flex-col gap-4 p-5">
      <div class="flex justify-between">
        <h1 class="text-xl font-bold tracking-wide">資料庫連線</h1>
        <div>
          <ElButton
            style=""
            :icon="ElIconRefresh"
            type="primary"
            @click="store.getDbConnList(false)"
            >重新整理</ElButton
          >
          <ElButton
            style=""
            :icon="ElIconPlus"
            type="primary"
            @click="addConnection"
            >新增連線</ElButton
          >
        </div>
      </div>
      <DbConnectionList
        :list="store.dbConnList"
        @edit-setting="editActiveConnection"
      />
    </div>

    <!-- 選擇連線類型 -->
    <ElDialog
      v-model="dialog.categories"
      title="選擇連線類型"
      modal-class="backdrop-blur-sm"
      align-center
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(category, index) in store.dbCategories"
          :key="index"
          class="rounded-lg p-4 h-auto flex justify-start gap-2 transition-all"
          :class="{
            'db-category-active': false,
            'shadow-custom-md': true,
          }"
          @click="editNewConnection(category.title, category.itemId)"
        >
          <div><img :src="icons[`ic_${category.itemId}`]" class="w-6" /></div>

          <div class="font-medium text-lg">
            {{ _useUpperFirst(category.title) }}
          </div>
        </div>
      </div>
    </ElDialog>

    <!-- 連線設定 -->
    <ElDialog
      v-model="dialog.connSetting"
      :destroy-on-close="true"
      :title="`${dbTitle} 連線設定`"
      modal-class="backdrop-blur-sm"
      align-center
      width="576"
      :before-close="
        (done) => {
          dialog.categories = isEmpty(store.dbConnSetForm);
          store.dbConnSetForm = dbConnNewForm;
          done();
        }
      "
    >
      <DbConnectionSetting
        :form="store.dbConnSetForm"
        :is-new-conn="isNewConn"
        @disable-dialog="
          (val) => {
            dialog.connSetting = val;
          }
        "
      />
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const icons = dynamicImportDbConnectionIcons();
await store.getDbConnList(true);
const dataColumn = ref<string[]>([]);
const dialog = reactive({
  categories: false,
  connSetting: false,
});
const dbTitle = ref("");
const isNewConn = ref(false);
const dbConnNewForm = reactive({
  connName: "",
  database: "",
  host: "",
  port: "",
  username: "",
  password: "",
});
dataColumn.value = Object.keys(store.dbConnList[0]);

const addConnection = async () => {
  await store.getDbCategories();
  dialog.categories = true;
};

const editNewConnection = (title: string, dbType: string) => {
  dbTitle.value = title;
  store.dbConnSetType = dbType;
  store.dbConnSetForm = dbConnNewForm;
  isNewConn.value = true;
  dialog.categories = false;
  dialog.connSetting = true;
};

const editActiveConnection = async (id: string) => {
  await store.getDbConnQuery(id);
  dbTitle.value = store.dbConnQueryRes.dbType;
  isNewConn.value = false;
  dialog.connSetting = true;
};
</script>
<style scoped>
.db-category-active {
  border: 1px solid rgb(69, 109, 236);
  background-color: rgba(246, 247, 249, 1);
}
</style>
