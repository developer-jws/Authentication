const express = require("express");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");

//
/* 
  Express configuration
*/
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json({ type: "*/*" }));
app.use(cookie(process.env.COOKIE_KEY));
// app.use(cookie());

//
/*
  MongoDB connection
*/
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const mongo = mongoose.connection;
mongo.on("connected", () => console.log(`MongoDB Connection`));
mongo.on("error", (error) => console.error(error));
mongo.on("disconnection", () => console.log(`MongoDB Disconnection`));

//
/*
  Router
*/
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

//
/*
  HTTP Server
*/
const PORT = process.env.PORT || 4000;
app.set("port", PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on("listening", () => console.log(`Listening on ${PORT}`));
server.on("error", (error) => console.error(error));
