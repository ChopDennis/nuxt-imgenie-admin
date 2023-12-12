import type { FormInstance } from "element-plus";
interface Credentials {
  account: string;
  password: string;
}

export class LoginController {
  async clickLoginButton(
    formEl: FormInstance | undefined,
    credentials: Credentials,
  ) {
    const { signIn } = useAuth();
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        try {
          await signIn(
            { account: credentials.account, password: credentials.password },
            { callbackUrl: "/db-connection" },
          );
        } catch (error) {
          console.error(error); // eslint-disable-line no-console
        }
      } else {
        console.log("error fields!", fields); // eslint-disable-line no-console
      }
    });
  }
}
