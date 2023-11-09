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
        <ElButton
          style=""
          :icon="ElIconPlus"
          type="primary"
          @click="addConnection()"
          >新增連線</ElButton
        >
      </div>
      <DbConnectionList :list="dbConnStore.dbConnectionList" />
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
          v-for="(category, index) in dbConnStore.dbCategories"
          :key="index"
          class="rounded-lg p-4 h-auto flex justify-start gap-2 transition-all"
          :class="{
            'db-category-active': false,
            'shadow-custom-md': true,
          }"
          @click="editNewConnection(category.title)"
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
      :title="`${dbCategorySelected}連線設定`"
      modal-class="backdrop-blur-sm"
      align-center
      :before-close="
        (done) => {
          dialog.categories = true;
          done();
        }
      "
    >
      <DbConnectionSetting :list="dbConnStore.dbConnectionList" />
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
const dbConnStore = useDbConnectionStore();
await dbConnStore.getDbConnectionList();
const icons = dynamicImportDbConnectionIcons();
const dataColumn = ref<string[]>([]);
const dialog = ref({
  categories: false,
  connSetting: false,
});
const dbCategorySelected = ref("");

dataColumn.value = Object.keys(dbConnStore.dbConnectionList[0]);

const addConnection = async () => {
  await dbConnStore.getDbCategories();
  dialog.value.categories = true;
};

const editNewConnection = (title: string) => {
  dbCategorySelected.value = title;
  dialog.value.categories = false;
  dialog.value.connSetting = true;
};
</script>
<style scoped>
.db-category-active {
  border: 1px solid rgb(69, 109, 236);
  background-color: rgba(246, 247, 249, 1);
}
</style>
