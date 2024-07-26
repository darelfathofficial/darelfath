import * as crypto from "crypto";

const algorithm = "aes-256-cbc";
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
const key = process.env.CRYPTO_AES_CBC_KEY ?? '';
const iv = process.env.CRYPTO_AES_CBC_IV ?? '';

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "utf8"), Buffer.from(iv, "utf8"));
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encryptedData: string) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "utf8"), Buffer.from(iv, "utf8"));
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
