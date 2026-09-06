const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const config = require("./config/config");

const authRoutes = require("./routes/auth.routes");
const groupRoutes = require("./routes/group.routes");
const noteRoutes = require("./routes/notes.routes");
const messageRoutes = require("./routes/messages.routes");
const groupKeyRoutes = require("./routes/groupKey.routes");

const cors = require("cors");
const authMiddleware = require("./middlewares/auth.middleware");
const compression = require("compression");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/error.middleware");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", groupKeyRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
