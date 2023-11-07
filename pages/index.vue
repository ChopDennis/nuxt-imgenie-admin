<template>
  <div>
    <PrimeDialog
      v-model:visible="dbCategoriesDialog"
      modal
      header="選擇連線類型"
      :style="{ width: 'auto' }"
      :pt="{
        mask: {
          style: 'backdrop-filter: blur(2px)',
        },
        header: {
          class: 'datamart-list-dialog-header',
        },
        headerTitle: {
          class: 'datamart-list-dialog-header-title font-mono',
        },
        content: {
          class: 'datamart-list-dialog-content font-mono',
        },
      }"
    >
      <div style="margin-top: 3.5rem">
        <div class="flex gap-5">
          <div
            v-for="(category, index) in store.dbCategories"
            :key="index"
            class="bg-gray-100 rounded-lg p-5 flex flex-col gap-2"
            style="width: 300px; height: 182px"
          >
            <div>
              <!-- <img :src="image" /> -->
              {{ category }}
            </div>
          </div>
        </div>
      </div>
    </PrimeDialog>
    <PrimeButton
      label="Show Categories Dialog"
      @click="clickDbCategoriesDialog()"
    />
    <PrimeButton label="TEST DB CONNECTION" @click="store.testConnection" />
    <PrimeDataTable
      class="p-datatable-sm"
      :value="store.dbConnectionList"
      paginator
      striped-rows
      scrollable
      scroll-height="450px"
      :rows="10"
      :rows-per-page-options="[10, 20, 50]"
      table-style="min-width: 50rem"
      :pt="{
        paginator: {
          style: {
            color: 'red',
          },
        },
      }"
    >
      <PrimeColumn
        v-for="(col, index) in dataColumn"
        :key="index"
        :field="col"
        :header="col"
        sortable
        style="min-width: 50px"
      ></PrimeColumn>
    </PrimeDataTable>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
await store.getDbConnectionList();
// const images = dynamicImportIcons();
const dataColumn = ref<string[]>([]);
const dbCategoriesDialog = ref(false);

dataColumn.value = Object.keys(store.dbConnectionList[0]);

const clickDbCategoriesDialog = () => {
  store.getDbCategories();
  dbCategoriesDialog.value = true;
};
</script>
<style scoped>
.datamart-list-dialog-header {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.datamart-list-dialog-header-title {
  margin: auto;
  top: 3.5rem;
  position: relative;
  padding-left: 1rem;
}

.datamart-list-dialog-content {
  margin-top: -2px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.datamart-list-dialog-active {
  border: 1px solid rgba(69, 109, 236, 1);
  background-color: rgba(69, 109, 236, 0.1);
}
</style>
