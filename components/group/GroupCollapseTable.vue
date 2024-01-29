<template>
  <div class="ml-2 w-full">
    <ElTable
      :data="props.table"
      max-height="650"
      size="large"
      empty-text="尚未設定"
    >
      <slot name="columns"></slot>
      <ElTableColumn label="操作" header-align="center" width="90">
        <template #default="scope">
          <div
            class="flex justify-center w-full"
            src="~/assets/icons/dbConnection/ic_db_edit.svg"
            @click="deleteRow(scope.$index)"
          >
            <div>
              <ElIconDelete width="16"></ElIconDelete>
            </div>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
<script setup lang="ts" generic="T">
const props = defineProps<{
  table: T[];
}>();

const emits = defineEmits<{ deleteRow: [number] }>();

const deleteRow = (index: number) => {
  emits("deleteRow", index);
};
</script>
