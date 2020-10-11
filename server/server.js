const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const cors = require("cors");

// mongoose
const connectDB = require("./config/db");

// connect Database
connectDB();

// init middleware
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => console.log(`server is listening on port: ${port}`));

module.exports = server;
