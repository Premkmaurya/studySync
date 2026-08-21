const ImageKit = require("imagekit");
const {v4 : uuidv4} = require("uuid")
const config = require("../config/config");


const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file) {
  const response = await imagekit.upload({
    file: file,
    fileName: uuidv4(),
    folder: "posts",
  });

  return response;
}

async function deleteImage(fileId) {
  if (!fileId || typeof fileId !== "string") return null;
  try {
    const response = await imagekit.deleteFile(fileId);
    return response;
  } catch (error) {
    console.error("ImageKit deletion error:", error?.message || error);
    return null;
  }
}

uploadImage.uploadImage = uploadImage;
uploadImage.deleteImage = deleteImage;

module.exports = uploadImage;
module.exports.uploadImage = uploadImage;
module.exports.deleteImage = deleteImage;