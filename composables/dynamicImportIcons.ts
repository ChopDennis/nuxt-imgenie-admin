import { filename } from "pathe/utils";

export const dynamicImportIcons = () => {
  const glob = import.meta.glob("@/assets/icons/dbconnection/*.svg", {
    eager: true,
  });
  const imageUrls = Object.fromEntries(
    Object.entries(glob).map(([key, value]: [string, any]) => [
      filename(key),
      value.default,
    ]),
  );
  return imageUrls;
};
