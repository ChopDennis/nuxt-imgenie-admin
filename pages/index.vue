<template>
  <div class="p-5">
    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <h1 class="text-xl font-bold tracking-wide">資料庫連線</h1>
        <ElButton
          style=""
          :icon="ElIconPlus"
          type="primary"
          @click="goToLogin()"
          >登入</ElButton
        >
        <ElButton
          style=""
          :icon="ElIconPlus"
          type="primary"
          @click="addConnection()"
          >新增連線</ElButton
        >
      </div>
      <div class="bg-white rounded-lg p-5 shadow-custom-lg">
        <ClientOnly>
          <ElTable :data="store.dbConnectionList" class="w-4/5">
            <ElTableColumn prop="rowNumber" label="編號" />
            <ElTableColumn prop="connTypeName" label="連線名稱" />
            <ElTableColumn prop="connInfoDatabase" label="資料庫名稱" />
            <ElTableColumn prop="connInfoHostPort" label="主機名稱及IP" />
            <ElTableColumn label="狀態">
              <template #default="scope">
                <ElSwitch v-model="scope.row.connStatus" />
              </template>
            </ElTableColumn>
          </ElTable>
        </ClientOnly>
      </div>
    </div>

    <ElDialog
      v-model="dbCategoriesDialogVisible"
      title="選擇連線類型"
      modal-class="backdrop-blur-sm"
      align-center
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(category, index) in store.dbCategories"
          :key="index"
          class="rounded-lg p-4 h-auto flex justify-start gap-2"
          :class="{ 'db-category-active': true, 'shadow-custom-md': true }"
          @click="editNewConnection()"
        >
          <div><img :src="icons[`ic_${category.itemId}`]" class="w-6" /></div>

          <div class="font-medium text-lg">{{ category.title }}</div>
        </div>
      </div>
    </ElDialog>

    <ElDialog
      v-model="dbConnectionSettingDialogVisible"
      title="連線設定"
      modal-class="backdrop-blur-sm"
      align-center
      :before-close="
        (done) => {
          dbCategoriesDialogVisible = true;
          done();
        }
      "
    >
      <DbConnectionSetting :list="store.dbConnectionList" />
    </ElDialog>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const store = useDbConnectionStore();
await store.getDbConnectionList();
const icons = dynamicImportIcons();
const dataColumn = ref<string[]>([]);
const dbCategoriesDialogVisible = ref(false);
const dbConnectionSettingDialogVisible = ref(false);

// console.table(store.dbConnectionList);
dataColumn.value = Object.keys(store.dbConnectionList[0]);

const addConnection = async () => {
  await store.getDbCategories();
  dbCategoriesDialogVisible.value = true;
};

const editNewConnection = () => {
  dbCategoriesDialogVisible.value = false;
  dbConnectionSettingDialogVisible.value = true;
};

const goToLogin = () => {
  router.push({ path: "/login" });
};
</script>
<style scoped>
.db-category-active {
  border: 1px solid rgb(69, 109, 236);
  background-color: rgba(246, 247, 249, 1);
}
</style>
