const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const authr = require("./routes/auth");
const dotenv = require("dotenv");
const cors = require("cors")
const morgan = require("morgan")

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }).then(() => {
  console.log("db connected");
}).catch(err =>{
    console.log(err)
})
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
})
);
app.use(morgan("dev"));
app.use('/upload',express.static('upload'));
app.use("/api", routes);
app.use("/api", authr);




module.exports = app;
