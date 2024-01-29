<template>
  <div class="ml-2 w-full">
    <div class="flex gap-2">
      <ElSelect
        v-model="selectedId"
        clearable
        filterable
        remote
        remote-show-suffix
        :on-change="() => {}"
        :no-data-text="props.label.selectNoDataText"
        :remote-method="remoteSearchOptions"
        :placeholder="props.label.selectPlaceholder"
        style="width: 50%"
      >
        <template #prefix>
          <div v-if="selectedDbType">
            <img :src="icons[`ic_${selectedDbType}`]" class="w-6" width="24" />
          </div>
        </template>
        <ElOption
          v-for="option in filteredOptions"
          :key="option.id"
          :label="option.name"
          :value="option.id"
          ><template #default>
            <div v-if="option.dbType" class="flex gap-3 py-1 items-center">
              <div>
                <img
                  :src="icons[`ic_${option.dbType}`]"
                  class="w-6"
                  width="24"
                />
              </div>
              <div>{{ option.name }}</div>
            </div>
          </template></ElOption
        >
      </ElSelect>
      <ElButton
        :icon="ElIconPlus"
        :disabled="!selectedId"
        type="primary"
        @click="updateSelectedId"
        >{{ props.label.updateButton }}</ElButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  options: { id: string; name: string; dbType?: string }[];
  label: {
    selectNoDataText: string;
    selectPlaceholder: string;
    updateButton: string;
  };
}>();
const emits = defineEmits<{
  updateSelectedId: [string];
}>();

const icons = useDbConnIcons();

const searchText = ref("");
const selectedId = ref("");
const selectedDbType = computed(() => {
  return _useFind(props.options, { id: selectedId.value })?.dbType;
});

const filteredOptions = computed(() => {
  if (searchText.value) {
    return _useFilter(props.options, (option) => {
      return (
        _useIncludes(_useToLower(option.id), _useToLower(searchText.value)) ||
        _useIncludes(_useToLower(option.name), _useToLower(searchText.value))
      );
    });
  } else {
    return props.options;
  }
});

const remoteSearchOptions = (text: string) => {
  searchText.value = text; // Update searchText
};

const updateSelectedId = () => {
  emits("updateSelectedId", selectedId.value);
  selectedId.value = "";
};
</script>
