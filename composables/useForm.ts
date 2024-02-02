import type { FormInstance, FormRules } from "element-plus";

export default function useForm() {
  const dataMartGroupStore = useDataMartGroupStore();

  const validate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return false;
    const result = await formEl.validate((valid, fields) => {
      if (valid) {
        console.log("符合規則", fields);
        return valid;
      } else {
        console.log("缺少必填欄位", fields); // eslint-disable-line no-console
      }
    });
    return result;
  };
  const trim = <T extends Record<string, unknown>>(
    form: T
  ): Record<keyof T, string | T[keyof T]> => {
    return _useMapValues(form, (value) =>
      isString(value) ? _useTrim(value) : value
    );
  };

  const validateUsers = (_rule: any, _value: any, callback: any) => {
    if (
      isEmpty(dataMartGroupStore.members.users) &&
      isEmpty(dataMartGroupStore.members.userGroups)
    ) {
      callback(new Error("成員/使用者群組至少擇一選填"));
    } else {
      callback();
    }
  };

  interface DataMartGroupRuleForm {
    datamartGroupName: string;
    description: string;
    datamarts: [];
    users: [];
    userGroups: [];
  }

  const dataMartGroupRules = reactive<FormRules<DataMartGroupRuleForm>>({
    datamartGroupName: [
      { required: true, message: "請輸入群組名稱", trigger: "blur" },
    ],
    description: [
      { required: true, message: "請輸入群組簡述", trigger: "blur" },
    ],
    datamarts: [
      {
        type: "array",
        required: true,
        message: "請選擇資料模型",
        trigger: "change",
      },
    ],
    users: [
      {
        type: "array",
        validator: validateUsers,
        required: true,
        trigger: "change",
      },
    ],
    userGroups: [
      {
        type: "array",
        validator: validateUsers,
        required: true,
        trigger: "change",
      },
    ],
  });
  const userGroupRules = reactive<FormRules>({
    userGroupName: [
      { required: true, message: "請輸入群組名稱", trigger: "blur" },
    ],
    description: [
      { required: true, message: "請輸入群組簡述", trigger: "blur" },
    ],
  });

  return {
    validate,
    trim,
    userGroupRules,
    dataMartGroupRules,
  };
}
