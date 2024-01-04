const express = require("express");
const mongoose = require("mongoose");
const router = require("./route");
const app = express();
app.use(express.json());
app.use("/", router);
mongoose
  .connect(
    "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Node",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.error(err));

app.listen(3000, () => console.log("server is runing on port 3000"));
