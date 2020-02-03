const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com"
  },
  {
    id: 2,
    name: "Maria Palu",
    email: "maria@gmail.com"
  },
  {
    id: 1,
    name: "Pep Rema",
    email: "pep@gmail.com"
  }
];

// Set static folder
app.use(express.static(path.join(__dirname, "Public")));

// Create route
app.get("api/members", (req, res) => {
  res.json(members);
});

/*
app.get("/", (req, res) => {
  //res.send("<h1>Hello World!!</h1>");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
