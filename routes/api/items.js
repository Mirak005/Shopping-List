const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")

//Item Model

const Item = require("../../models/Item");

//@route GET api/items
//@desc  Get All Items
//@acess Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});
//@route POST api/items
//@desc  Create A Post
//@acess Private
router.post("/", auth , (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});
//@route DELETE api/items
//@desc  Delete A Post
//@acess Private
router.delete("/:id",auth , (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.send("the item was deleted with sucess"))
    )
    .catch(err => res.status(404).send("The item to delete dosen't exists"));
});

module.exports = router;
