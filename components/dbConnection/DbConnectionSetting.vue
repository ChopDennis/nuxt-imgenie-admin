<template>
  <div>
    <ElForm :model="form" label-width="100px">
      <ElFormItem
        v-for="(value, key) in form"
        :key="key"
        :label="_useToString(key)"
      >
        <ElInput v-if="typeof value === 'string'" v-model="form[key]" />
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
// const props = defineProps<{
//   form: {};
// }>();
const form = reactive({});
// const store = useDbConnectionStore();
// const form = reactive(store.dbConnSetting);
console.log("==============Inside DbConnectionSetting===============");
// console.table(form);
onMounted(() => {
  console.log("onMounted");
});
onUpdated(() => {
  console.log("onUpdated");
  // form = props.form;
});
</script>
