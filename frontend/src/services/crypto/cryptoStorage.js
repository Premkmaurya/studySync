const DB_NAME = "StudySyncCryptoDB";
const DB_VERSION = 1;
const STORE_KEYS = "userKeys";
const STORE_GROUP_KEYS = "groupKeys";

function openDB() {
  return new Promise((resolve, reject) => {
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

export async function saveUserKeyPair(userId, keyPair) {
  if (!userId) return;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_KEYS, "readwrite");
    const store = tx.objectStore(STORE_KEYS);
    store.put({
      userId,
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
      publicKeyJwk: keyPair.publicKeyJwk,
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

export async function getUserKeyPair(userId) {
  if (!userId) return null;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_KEYS, "readonly");
    const store = tx.objectStore(STORE_KEYS);
    const request = store.get(userId);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("[CryptoStorage] Error fetching user key pair:", err);
    return null;
  }
}

export async function saveGroupKey(groupId, keyVersion, cryptoKey) {
  if (!groupId) return;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_GROUP_KEYS, "readwrite");
    const store = tx.objectStore(STORE_GROUP_KEYS);
    const id = `${groupId}_v${keyVersion || 1}`;
    store.put({
      id,
      groupId,
      keyVersion: keyVersion || 1,
      cryptoKey,
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

export async function getGroupKey(groupId, keyVersion) {
  if (!groupId) return null;
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_GROUP_KEYS, "readonly");
    const store = tx.objectStore(STORE_GROUP_KEYS);
    const id = `${groupId}_v${keyVersion || 1}`;
    const request = store.get(id);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.cryptoKey || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("[CryptoStorage] Error fetching group key:", err);
    return null;
  }
}
