import CryptoJS from "crypto-js";

const keySize = 256;
const ivSize = 128;

export const encryptData = (data: any): string => {
  const randomKey = CryptoJS.lib.WordArray.random(keySize / 16).toString();
  const randomIv = CryptoJS.lib.WordArray.random(ivSize / 16).toString();
  const parseKey = CryptoJS.enc.Utf8.parse(randomKey);
  const parseIv = CryptoJS.enc.Utf8.parse(randomIv);

  console.log("key: ", randomKey.toString());
  console.log("iv: ", randomIv.toString());

  const parseData = randomIv + JSON.stringify(data);

  // encrypted
  const encrypted = CryptoJS.AES.encrypt(parseData, parseKey, { iv: parseIv });

  // decrypted
  const decrypted = CryptoJS.AES.decrypt(encrypted, parseKey, { iv: parseIv });

  console.log("parseData: ", parseData.toString());
  console.log("encrypt: ", encrypted.toString());
  console.log("encrypt key: ", encrypted.key.toString());
  console.log("encrypt iv: ", encrypted.iv.toString());
  console.log(
    "connInfo: ",
    encrypted.iv.toString(CryptoJS.enc.Base64) + encrypted.toString(),
  );
  console.log("decrypted", decrypted.toString(CryptoJS.enc.Utf8));

  return (
    encrypted.key.toString() + encrypted.iv.toString() + encrypted.toString()
  );
};

export const decryptData = (encryptedData: string, key: string): any => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
