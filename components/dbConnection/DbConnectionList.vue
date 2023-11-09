<template>
  <div class="bg-white rounded-lg p-5 shadow-custom-lg">
    <ClientOnly>
      <ElTable :data="props.list">
        <ElTableColumn prop="rowNumber" label="編號" width="60" />
        <ElTableColumn prop="connTypeName" label="連線名稱" />
        <ElTableColumn prop="connInfoDatabase" label="資料庫名稱" />
        <ElTableColumn prop="connInfoHostPort" label="主機名稱及IP" />
        <ElTableColumn label="狀態">
          <template #default="scope">
            <ElSwitch v-model="scope.row.connStatus" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作">
          <template #default>
            <img src="~/assets/icons/dbConnection/ic_db_edit.svg" />
          </template>
        </ElTableColumn>
      </ElTable>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  list: MappingDbConnectionList[];
}>();
</script>
