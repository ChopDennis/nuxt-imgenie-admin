<template>
  <ElDialog
    v-model="store.dialog.categories"
    title="選擇連線類型"
    modal-class="backdrop-blur-sm"
    width="572"
    align-center
    :on-close="
      () => {
        store.setting.dbType = '';
      }
    "
  >
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="(type, index) in store.types"
        :key="index"
        class="rounded-lg p-4 h-auto flex justify-start border gap-2 transition-all items-center db-type-select"
        :class="{
          'db-type-select-active': type.itemId === store.setting.dbType,
        }"
        @click="clickEditNewConn(type.itemId, type.title)"
      >
        <div>
          <img :src="icons[type.icon.split('.')[0]]" class="w-6" />
        </div>

        <div class="font-medium text-lg">
          {{ type.title }}
        </div>
      </div>
    </div>
  </ElDialog>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const icons = useDbConnIcons();

const clickEditNewConn = (dbType: string, title: string) => {
  store.setting.dialogTitle = title;
  store.setting.dbType = dbType;
  setTimeout(() => {
    store.dialog.categories = false;
    store.dialog.connSetting = true;
  }, 500);
};
</script>
