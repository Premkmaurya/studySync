import { arrayBufferToBase64, base64ToArrayBuffer } from "./cryptoService";

const DB_NAME = "StudySyncCryptoDB";
const DB_VERSION = 1;
const STORE_KEYS = "userKeys";
const STORE_GROUP_KEYS = "groupKeys";

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      return reject(new Error("IndexedDB is not supported in this environment"));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_KEYS)) {
        db.createObjectStore(STORE_KEYS, { keyPath: "userId" });
      }
      if (!db.objectStoreNames.contains(STORE_GROUP_KEYS)) {
        db.createObjectStore(STORE_GROUP_KEYS, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Persist user's RSA key pair locally in IndexedDB with JWK backup for maximum durability
 */
export async function saveUserKeyPair(userId, keyPair) {
  if (!userId || !keyPair) return false;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_KEYS, "readwrite");
    const store = tx.objectStore(STORE_KEYS);

    store.put({
      userId: userId.toString(),
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
      publicKeyJwk: keyPair.publicKeyJwk,
      privateKeyJwk: keyPair.privateKeyJwk || null,
      updatedAt: Date.now(),
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error("[CryptoStorage] Error saving user key pair:", err);
    return false;
  }
}

/**
 * Retrieve user's local RSA key pair, with automatic WebCrypto re-import fallback
 */
export async function getUserKeyPair(userId) {
  if (!userId) return null;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_KEYS, "readonly");
    const store = tx.objectStore(STORE_KEYS);
    const request = store.get(userId.toString());

    const record = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });

    if (!record) return null;

    let privateKey = record.privateKey;
    let publicKey = record.publicKey;

    // Verify or restore CryptoKey instances
    if (!privateKey || !(privateKey instanceof CryptoKey)) {
      if (record.privateKeyJwk) {
        try {
          const privJwk = {
            ...record.privateKeyJwk,
            alg: "RSA-OAEP-256",
            key_ops: ["unwrapKey"],
          };
          privateKey = await window.crypto.subtle.importKey(
            "jwk",
            privJwk,
            {
              name: "RSA-OAEP",
              hash: "SHA-256",
            },
            true,
            ["unwrapKey"]
          );
        } catch (impErr) {
          console.error("[CryptoStorage] Failed to restore privateKey from JWK:", impErr);
          return null;
        }
      } else {
        return null;
      }
    }

    if (!publicKey || !(publicKey instanceof CryptoKey)) {
      if (record.publicKeyJwk) {
        try {
          const pubJwk = {
            ...record.publicKeyJwk,
            alg: "RSA-OAEP-256",
            key_ops: ["wrapKey"],
          };
          publicKey = await window.crypto.subtle.importKey(
            "jwk",
            pubJwk,
            {
              name: "RSA-OAEP",
              hash: "SHA-256",
            },
            true,
            ["wrapKey"]
          );
        } catch {
          // Public key can still be reconstructed or used as JWK
        }
      }
    }

    return {
      privateKey,
      publicKey,
      publicKeyJwk: record.publicKeyJwk,
      privateKeyJwk: record.privateKeyJwk,
    };
  } catch (err) {
    console.error("[CryptoStorage] Error fetching user key pair:", err);
    return null;
  }
}

/**
 * Persist group symmetric AES key in IndexedDB
 */
export async function saveGroupKey(groupId, keyVersion, cryptoKey) {
  if (!groupId || !cryptoKey) return false;
  try {
    const version = keyVersion || 1;
    const id = `${groupId}_v${version}`;

    let rawKeyBase64 = null;
    try {
      const exportedRaw = await window.crypto.subtle.exportKey("raw", cryptoKey);
      rawKeyBase64 = arrayBufferToBase64(exportedRaw);
    } catch {
      // Export may not be necessary if CryptoKey clone succeeds
    }

    const db = await openDB();
    const tx = db.transaction(STORE_GROUP_KEYS, "readwrite");
    const store = tx.objectStore(STORE_GROUP_KEYS);

    store.put({
      id,
      groupId: groupId.toString(),
      keyVersion: version,
      cryptoKey,
      rawKeyBase64,
      updatedAt: Date.now(),
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error("[CryptoStorage] Error saving group key:", err);
    return false;
  }
}

/**
 * Retrieve group symmetric AES key from IndexedDB with auto re-import fallback
 */
export async function getGroupKey(groupId, keyVersion) {
  if (!groupId) return null;
  try {
    const version = keyVersion || 1;
    const id = `${groupId}_v${version}`;

    const db = await openDB();
    const tx = db.transaction(STORE_GROUP_KEYS, "readonly");
    const store = tx.objectStore(STORE_GROUP_KEYS);
    const request = store.get(id);

    const record = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });

    if (!record) return null;

    if (record.cryptoKey && record.cryptoKey instanceof CryptoKey) {
      return record.cryptoKey;
    }

    if (record.rawKeyBase64) {
      try {
        const rawBuffer = base64ToArrayBuffer(record.rawKeyBase64);
        return await window.crypto.subtle.importKey(
          "raw",
          rawBuffer,
          {
            name: "AES-GCM",
            length: 256,
          },
          true,
          ["encrypt", "decrypt"]
        );
      } catch (impErr) {
        console.error("[CryptoStorage] Failed to restore groupKey from raw buffer:", impErr);
        return null;
      }
    }

    return null;
  } catch (err) {
    console.error("[CryptoStorage] Error fetching group key:", err);
    return null;
  }
}
