import CryptoJS from "crypto-js";

const SECRET_KEY = 'your-secret-key'; // Store in .env for better security

export const saveEncrypted = (key: string, data: any) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  localStorage.setItem(key, ciphertext);
};

export const loadEncrypted = (key: string): any | null => {
  const ciphertext = localStorage.getItem(key);
  if (!ciphertext) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};
