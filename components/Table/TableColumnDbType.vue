<template>
  <ElTableColumn
    prop="dbType"
    label="資料庫類型"
    width="150"
    align="center"
    sortable
  >
    <template #default="scope">
      <div>
        <img :src="icons[`ic_${scope.row.dbType}`]" class="m-auto" width="24" />
      </div>
    </template>
  </ElTableColumn>
</template>
<script setup lang="ts">
const icons = useDbConnIcons();
</script>
