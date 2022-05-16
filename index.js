const express = require("express");
const { getAllData, getAllDataByRange, getFieldData } = require("./controller");
var cors = require("cors");
const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => getAllData((data) => res.send(data)));

app.get("/system/:field", (req, res) => {
  getFieldData(req.params.field, (data) => res.send(data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
