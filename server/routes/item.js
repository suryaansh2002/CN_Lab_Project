const router = require("express").Router();
const User = require("../models/User");
const Item = require("../models/Item");
let express = require("express"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");




router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const {name, title, content, imgUrl } = req.body;

  try {
    const updatedStory = new Story({
      _id: new mongoose.Types.ObjectId(),
      imgUrl: imgUrl,
      name:name,
      title:title,
      content: content
    });

    res.status(200).json(updatedStory);
    console.log(updatedStory);
    console.log("Done");
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const items = await Item.findById(req.params.id);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

