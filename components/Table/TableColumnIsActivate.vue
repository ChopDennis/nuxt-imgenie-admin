<template>
  <ElTableColumn
    prop="isActivate"
    label="狀態"
    width="90"
    align="center"
    sortable
  >
    <template #default="scope">
      <ElSwitch
        v-model="scope.row.isActivate"
        :before-change="
          () =>
            openDialog(scope.row.id, scope.row.isActivate, scope.row.connName)
        "
      />
    </template>
  </ElTableColumn>
</template>
<script setup lang="ts">
import { ElMessageBox } from "element-plus";
const openDialog = async (id: string, value: boolean, connName: string) => {
  if (value) {
    return ElMessageBox.confirm(
      `<div class="text-base" style="color:#20222F">停用「${connName}」？</div><div class="pt-2" style="color:#999999">停用資料庫連線，任何連接此設定的資料模型、ChatSQL對話，將受到影響。<br>確定要切換狀態？</div>`,
      {
        confirmButtonText: "取消",
        cancelButtonText: "停用",
        dangerouslyUseHTMLString: true,
        type: "error",
        showClose: false,
      },
    )
      .then(() => {
        return false;
      })
      .catch(async () => {
        return await changActivate(id, value);
      });
  } else {
    return await changActivate(id, value);
  }
};
const changActivate = async (id: string, value: boolean) => {
  let state: boolean;
  switch (useRoute().path) {
    case "/db-connection": {
      state = await useDbConnectionApi().sendUpdate(id, !value);
      break;
    }
    case "/data-mart": {
      state = await useDataMartApi().sendUpdate(id, !value);
      break;
    }
    case "/user-group": {
      state = await useUserGroup().updateUserGroup(id, !value);
      break;
    }
    case "/data-mart-group": {
      state = await useDataMartGroup().updateDataMartGroup(id, !value);
      break;
    }
    default: {
      state = false;
      break;
    }
  }
  return state;
};
</script>
<style scoped>
.el-message-box__status {
  top: 13%;
}
.el-message-box__btns button:nth-child(2) {
  background-color: #ff4d4f;
}
</style>
