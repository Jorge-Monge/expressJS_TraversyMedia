const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const app = express();
const PORT = process.env.PORT || 5000;

const members = require("./Members");

// Init middleware
app.use(logger);

// Set static folder
app.use(express.static(path.join(__dirname, "Public")));

// Create route
app.get("/api/members", (req, res) => res.json(members));

// Get single member
app.get("/api/members/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No member with the ID of ${req.params.id} found` });
  }
});

/*
app.get("/", (req, res) => {
  //res.send("<h1>Hello World!!</h1>");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
