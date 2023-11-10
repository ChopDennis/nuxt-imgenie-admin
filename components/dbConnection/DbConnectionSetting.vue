<template>
  <div>
    <ElForm :model="form" label-width="150px">
      <ElFormItem
        v-for="(value, key) in form"
        :key="key"
        :label="_useToString(key)"
      >
        <ElInput v-if="typeof value === 'string'" v-model="form[key]" />
        <el-checkbox
          v-else-if="typeof value === 'boolean'"
          v-model="form[key]"
        />
        <!-- <el-upload
          v-else-if="value === null"
          v-model="form[key]"
          :action="yourUploadUrl"
          :show-file-list="false"
        >
          <el-button slot="trigger" size="small">上传文件</el-button>
        </el-upload> -->
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  form: {};
}>();
const form = reactive(props.form);
// const yourUploadUrl = () => {
//   return "";
// };
</script>
