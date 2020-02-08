const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Create route
router.get("/", (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No member with the ID of ${req.params.id} found` });
  }
});

// Create member
// Initially, the response to the line below, in Postman, is empty
// This is because there is no body parser.
// We need to create a middleware function to parse it,
// in 'index.js'
router.post("/", (req, res) => {
  // At this point we installed >>npm i uuid
  // in order to have access to randomly generated IDs.
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and an email" });
  }

  // Add the new member to the list of members
  members.push(newMember);

  res.json(members);
});

// Update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({
          msg: "Member updated!",
          member: member
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the ID of ${req.params.id} found` });
  }
});

// Delete a member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted!",
      member: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with the ID of ${req.params.id} found` });
  }
});

module.exports = router;
