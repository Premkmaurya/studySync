/**
 * Web Crypto API Service for StudySync Group Chat E2EE
 * - Asymmetric Key Exchange: RSA-OAEP (2048-bit, SHA-256)
 * - Symmetric Message Encryption: AES-256-GCM (96-bit random IV)
 */

export function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// 1. User Local Keypair Generation
export async function generateUserKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true, // extractable public key
    ["wrapKey", "unwrapKey"]
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);

  return {
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
    publicKeyJwk,
  };
}

// 2. Group Symmetric Key Generation (AES-256-GCM)
export async function generateGroupKey() {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // extractable so key can be wrapped for group members
    ["encrypt", "decrypt"]
  );
}

// 3. Wrap Group Symmetric Key for a Recipient User
export async function wrapGroupKeyForRecipient(groupKey, recipientPublicKeyJwk) {
  const recipientPublicKey = await window.crypto.subtle.importKey(
    "jwk",
    recipientPublicKeyJwk,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["wrapKey"]
  );

  const wrappedBuffer = await window.crypto.subtle.wrapKey(
    "jwk",
    groupKey,
    recipientPublicKey,
    {
      name: "RSA-OAEP",
    }
  );

  return arrayBufferToBase64(wrappedBuffer);
}

// 4. Unwrap Group Symmetric Key using User Private Key
export async function unwrapGroupKeyForUser(wrappedGroupKeyBase64, userPrivateKey) {
  const wrappedBuffer = base64ToArrayBuffer(wrappedGroupKeyBase64);

  return await window.crypto.subtle.unwrapKey(
    "jwk",
    wrappedBuffer,
    userPrivateKey,
    {
      name: "RSA-OAEP",
    },
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// 5. Encrypt Message Text with AES-GCM
export async function encryptMessage(text, groupKey, keyVersion = 1) {
  if (!text || typeof text !== "string") {
    throw new Error("Message text must be a valid non-empty string");
  }
  if (!groupKey) {
    throw new Error("Missing group encryption key");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // 96-bit (12-byte) random IV
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    groupKey,
    data
  );

  return {
    ciphertext: arrayBufferToBase64(ciphertextBuffer),
    iv: arrayBufferToBase64(iv),
    keyVersion,
    isEncrypted: true,
  };
}

// 6. Decrypt Message Text with AES-GCM
export async function decryptMessage(encryptedPayload, groupKey) {
  const { ciphertext, iv } = encryptedPayload || {};
  if (!ciphertext || !iv) {
    throw new Error("Missing ciphertext or IV for decryption");
  }
  if (!groupKey) {
    throw new Error("Missing group encryption key");
  }

  const ciphertextBuffer = base64ToArrayBuffer(ciphertext);
  const ivBuffer = base64ToArrayBuffer(iv);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(ivBuffer),
    },
    groupKey,
    ciphertextBuffer
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}

// 7. Safe Non-Sensitive Group Key Fingerprint Generator (8-character SHA-256 Hex)
export async function getGroupKeyFingerprint(groupKey) {
  if (!groupKey) return "NONE";
  try {
    const exportedJwk = await window.crypto.subtle.exportKey("jwk", groupKey);
    const keyData = JSON.stringify(exportedJwk.k || exportedJwk);
    const encoder = new TextEncoder();
    const data = encoder.encode(keyData);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex.slice(0, 8).toUpperCase();
  } catch (err) {
    console.error("[CryptoService] Error computing key fingerprint:", err);
    return "UNKNOWN";
  }
}
