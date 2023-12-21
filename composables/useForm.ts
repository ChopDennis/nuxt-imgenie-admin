import type { FormInstance } from "element-plus";

export default function useForm() {
  const validate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return false;
    const result = await formEl.validate((valid, fields) => {
      if (valid) {
        return valid;
      } else {
        console.log("缺少必填欄位", fields); // eslint-disable-line no-console
      }
    });
    return result;
  };
  const trim = <T extends Record<string, unknown>>(
    form: T,
  ): Record<keyof T, string | T[keyof T]> => {
    return _useMapValues(form, (value) =>
      isString(value) ? _useTrim(value) : value,
    );
  };

  return {
    validate,
    trim,
  };
}
