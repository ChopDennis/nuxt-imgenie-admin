import { filename } from "pathe/utils";

export const useDbConnIcons = () => {
  const glob = import.meta.glob("@/assets/icons/dbConnection/*.svg", {
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

export const useSideMenuIcons = () => {
  const glob = import.meta.glob("@/assets/icons/sideMenu/*.svg", {
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
