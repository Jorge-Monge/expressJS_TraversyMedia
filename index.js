const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});
/*app.get("/hello", (req, res) => {
  res.send("Hello World!");
});*/

app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
