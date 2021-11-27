const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3000;

app.use(fileUpload({ createParentPath: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

//routers
app.use("/player", require("./src/routers/player"));
app.use("/registration", require("./src/routers/registration"));
app.use("/login", require("./src/routers/login"));
app.use("/data", require("./src/routers/getData"));
app.use("/search", require("./src/routers/search"));
app.use("/setdb", require("./src/routers/setData"));

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
