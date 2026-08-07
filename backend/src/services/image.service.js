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
      folder:"posts"
    })

    return response;
}

module.exports = uploadImage;