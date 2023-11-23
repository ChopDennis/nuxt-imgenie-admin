import CryptoJS from "crypto-js";

export const encryptData = (data: any, uuid: string): string => {
  const parseUUID = uuid
    .replace(/-/g, "")
    .split("")
    .reverse()
    .join("")
    .toString();
  const key = CryptoJS.enc.Utf8.parse(parseUUID);

  console.log("original uuid", uuid);
  console.log("parse uuid", parseUUID);

  const parseData = JSON.stringify(data);

  // encrypted
  const encrypted = CryptoJS.AES.encrypt(parseData, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  // decrypted
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  console.log("parseData:========");
  console.log(parseData);
  console.log("encrypt:========");
  console.log(encrypted.toString());
  console.log("encrypt key:========");
  console.log(encrypted.key.toString());
  console.log("decrypted", decrypted.toString(CryptoJS.enc.Utf8));

  return encrypted.toString();
};

// export const decryptData = (encryptedData: string, key: string): any => {
//   const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
//   const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
//   return decryptedData;
// };
