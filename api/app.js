const express = require("express");
const app = express();
const port = 8000;
app.set("port", port);

const router = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(port, () => {
  console.log("App runing on port 8000");
});
