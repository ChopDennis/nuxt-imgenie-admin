<template>
  <div class="">
    <ElForm>
      <ElFormItem label="連線類型: ">
        <div v-for="(type, index) in store.dbConnTypesRes" :key="index">
          <div>
            <img :src="icons[`ic_${type.itemId}`]" class="w-6" />
          </div>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
const store = useDbConnectionStore();
const icons = dynamicImportDbConnectionIcons();
store.getDbConnTypes();
</script>
