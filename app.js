const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./Routes/index");
const path = require("path");
require("./Models/dbModel");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
