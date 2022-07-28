const router = require("express").Router();
const Message = require("../models/Message");
const { route } = require("./conversations");

//post message
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const msg = await newMessage.save();
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get message
router.get("/:conversationId", async (req, res) => {
  try {
    const msg = await Message.find({
      conver̥sationId: req.params.conversationId,
    });
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
