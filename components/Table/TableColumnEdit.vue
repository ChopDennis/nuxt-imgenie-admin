<template>
  <ElTableColumn label="操作" width="90" align="center">
    <template #default="scope">
      <img
        class="m-auto"
        src="~/assets/icons/dbConnection/ic_db_edit.svg"
        @click="clickEdit(scope.row.id)"
      />
    </template>
  </ElTableColumn>
</template>
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["update:edit", "update:id"]);
const isConnSetting = openConnectionSetting();

const clickEdit = async (id: string) => {
  switch (useRoute().path) {
    case "/db-connection": {
      await useDbConnectionApi().getQuery(id);
      isConnSetting.value = true;
      break;
    }
    case "/data-mart": {
      useDataMartApi().resetForm();
      emit("update:edit", true);
      emit("update:id", id);
      break;
    }
    case "/data-mart-group": {
      navigateTo({
        path: "/data-mart-group/edit",
        query: {
          datamartGroupId: id,
        },
      });
      break;
    }
    case "/user-group": {
      navigateTo({
        path: "/user-group/edit",
        query: {
          userGroupId: id,
        },
      });
      break;
    }
  }
};
</script>
