/* eslint-disable no-unused-vars */
// Crypto utility functions for message and key operations

export const decryptPrivateKey = async (privateKeyBlob, passphrase) => {
  return privateKeyBlob;
};

export const decryptGroupKey = async (encryptedGroupKey, privateKey) => {
  return encryptedGroupKey;
};

export const decryptMessage = async (encryptedContent, groupKey) => {
  return encryptedContent || "";
};

export const encryptMessage = async (messageText, groupKey) => {
  return messageText || "";
};
