require("dotenv").config();

const _config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/studysync",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "your_jwt_secret_key",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || "",
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
};

module.exports = _config;
