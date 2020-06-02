const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let Users = require("./routes/Users");
app.use("/users", Users);

app.get("/", (req, res) => {
  console.log("Wbito na endpoint /");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
