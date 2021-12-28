const express = require("express");
const router = new express.Router();
const donations = require("../models/donations");
const User = require("../models/users");
const ensureAuthLocal = require("../middleware/ensureAuth");
const multer = require("multer");
const sharp = require("sharp");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image"));
    }
    cb(undefined, true);
  },
});

router.post("/enlist", ensureAuthLocal, async (req, res) => {
  try {
    const donation = new donations({
      ...req.body,
      owner_id: req.user._id,
    });
    console.log(donation);

    await donation.save();
    res.status(201).send(donation);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const donation = await donations
      .find({
        isDonated: false,
      })
      .sort({ createdAt: -1 });

    let response = {};

    for (let i = 0; i < donation.length; i++) {
      const type = donation[i].item_type;
      if (!response.hasOwnProperty(type)) {
        response[type] = [donation[i]];
      } else {
        response[type].push(donation[i]);
      }
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get ?isDonated=true
//get ?limit=10&skip=0
//get ?sortBy=createdAt:asc/desc
router.get("/user", ensureAuthLocal, async (req, res) => {
  const match = {};
  const sort = {};

  const limit = req.query.limit ? req.query.limit : 10;
  const skip = req.query.skip ? req.query.skip : 0;

  if (req.query.isDonated) {
    match.isDonated = req.query.isDonated === "true";
  }

  if (req.query.sortBy) {
    const queryString = req.query.sortBy.split(":");
    sort[queryString[0]] = queryString[1] === "desc" ? -1 : 1;
  }

  try {
    const user = await User.findOne({
      _id: req.user._id,
    })
      .populate({
        path: "donations",
        match,
        options: {
          limit: parseInt(limit),
          skip: parseInt(skip),
          sort,
        },
      })
      .exec();
    res.status(200).send(user.donations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.patch("/:id", ensureAuthLocal, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["isDonated"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) return res.status(400).send("Invalid update");

  try {
    const donation = await donations.findOne({
      _id: req.params.id,
      owner_id: req.user._id,
    });

    if (!donation) return res.status(404).send("No such item found");

    updates.forEach((update) => (donation[update] = req.body[update]));
    await donation.save();
    res.status(200).send(donation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", ensureAuthLocal, async (req, res) => {
  try {
    const donation = await donations.findOneAndDelete({
      _id: req.params.id,
      owner_id: req.user._id,
    });

    if (!donation) return res.status(404).send("No such item found");

    res.status(200).send({ donation, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", ensureAuthLocal, async (req, res) => {
  const _id = req.params.id;

  try {
    const donation = await donations.findOne({ _id, owner_id: req.user._id });

    if (!donation) return res.status(404).send("No such item found");

    res.status(200).send(donation);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
