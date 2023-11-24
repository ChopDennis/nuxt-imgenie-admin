import CryptoJS from "crypto-js";

export const encryptData = (data: any, uuid: string): string => {
  const key = parseUUIDToKey(uuid);
  const parseData = JSON.stringify(data);

  const encrypted = CryptoJS.AES.encrypt(parseData, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

export const decryptData = (data: string, uuid: string): any => {
  const key = parseUUIDToKey(uuid);

  const decrypted = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  console.log(decrypted.toString(CryptoJS.enc.Base64));

  const binaryString = atob(decrypted.toString(CryptoJS.enc.Base64));
  const utf8String = new TextDecoder("utf-8").decode(
    new Uint8Array([...binaryString].map((char) => char.charCodeAt(0))),
  );

  return JSON.parse(utf8String);
};

const parseUUIDToKey = (uuid: string): CryptoJS.lib.WordArray => {
  const parseUUID = uuid
    .replace(/-/g, "")
    .split("")
    .reverse()
    .join("")
    .toString();
  return CryptoJS.enc.Utf8.parse(parseUUID);
};
