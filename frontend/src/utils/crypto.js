const RSA_ALGO = {
  name: "RSA-OAEP",
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
};
const AES_ALGO = { name: "AES-GCM", length: 256 };
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const toBase64 = (bytes) => btoa(String.fromCharCode(...bytes));
const fromBase64 = (value) => Uint8Array.from(atob(value), (c) => c.charCodeAt(0));

export async function generateKeyPair() {
  const pair = await crypto.subtle.generateKey(RSA_ALGO, true, ["encrypt", "decrypt"]);
  return {
    publicKey: toBase64(new Uint8Array(await crypto.subtle.exportKey("spki", pair.publicKey))),
    privateKey: toBase64(new Uint8Array(await crypto.subtle.exportKey("pkcs8", pair.privateKey))),
  };
}

export async function generateGroupKey() { return crypto.subtle.generateKey(AES_ALGO, true, ["encrypt", "decrypt"]); }
export async function exportGroupKey(groupKey) { return new Uint8Array(await crypto.subtle.exportKey("raw", groupKey)); }
export async function importGroupKey(rawKeyBase64) { return crypto.subtle.importKey("raw", fromBase64(rawKeyBase64), AES_ALGO, true, ["encrypt", "decrypt"]); }

export async function encryptMessage(plaintext, groupKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, groupKey, textEncoder.encode(plaintext));
  return { ciphertext: toBase64(new Uint8Array(ciphertext)), iv: toBase64(iv), algorithm: "AES-GCM" };
}

export async function decryptMessage(payload, groupKey) {
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64(payload.iv) }, groupKey, fromBase64(payload.ciphertext));
  return textDecoder.decode(plaintext);
}

export async function encryptGroupKey(groupKey, recipientPublicKeyBase64) {
  const recipientPublicKey = await crypto.subtle.importKey("spki", fromBase64(recipientPublicKeyBase64), RSA_ALGO, true, ["encrypt"]);
  const encryptedGroupKey = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, recipientPublicKey, await exportGroupKey(groupKey));
  return toBase64(new Uint8Array(encryptedGroupKey));
}

export async function decryptGroupKey(encryptedGroupKeyBase64, privateKeyBase64) {
  const privateKey = await crypto.subtle.importKey("pkcs8", fromBase64(privateKeyBase64), RSA_ALGO, true, ["decrypt"]);
  const rawGroupKey = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, fromBase64(encryptedGroupKeyBase64));
  return crypto.subtle.importKey("raw", rawGroupKey, AES_ALGO, true, ["encrypt", "decrypt"]);
}

async function deriveKeyEncryptionKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" }, keyMaterial, AES_ALGO, false, ["encrypt", "decrypt"]);
}

export async function encryptPrivateKey(privateKeyBase64, password) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const kek = await deriveKeyEncryptionKey(password, salt);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, kek, textEncoder.encode(privateKeyBase64));
  return { encryptedPrivateKey: toBase64(new Uint8Array(encrypted)), iv: toBase64(iv), salt: toBase64(salt) };
}

export async function decryptPrivateKey(payload, password) {
  const kek = await deriveKeyEncryptionKey(password, fromBase64(payload.salt));
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64(payload.iv) }, kek, fromBase64(payload.encryptedPrivateKey));
  return textDecoder.decode(decrypted);
}
