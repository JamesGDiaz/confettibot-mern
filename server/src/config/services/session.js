"use strict";

const crypto = require("crypto");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const options = {
  mongooseConnection: mongoose.connection
};
const mongoStore = new MongoStore(options);

const sessionParser = session({
  store: mongoStore,
  secret: crypto.randomBytes(48).toString("hex"),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: auto,
    httpOnly: true,
    maxAge: 60 * 60 * 1000 // 1hr
  }
});

/**
 * Initialize mongo for session cache
 */
const init = app => {
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sessionParser.cookie.secure = true; // serve secure cookies
  }
  app.use(sessionParser);
};

module.exports = {
  init,
  sessionParser
};
