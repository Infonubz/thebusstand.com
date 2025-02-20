import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
console.log(SECRET_KEY,"SECRET_KEYSECRET_KEYSECRET_KEY");

// Encrypt Data
export const encryptData = (data) => {
  return CryptoJS?.AES?.encrypt(data, SECRET_KEY)?.toString();
};

// Decrypt Data
export const decryptData = (ciphertext) => {
  const bytes = CryptoJS?.AES?.decrypt(ciphertext, SECRET_KEY);
  return bytes?.toString(CryptoJS?.enc?.Utf8);
};
