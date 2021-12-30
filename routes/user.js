const express = require("express");
const User = require("../models/users");
const Donations = require("../models/donations");
const sharp = require("sharp");
const router = new express.Router();
const ensureAuthLocal = require("../middleware/ensureAuth");
const multer = require("multer");

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

router.get("/me", ensureAuthLocal, async (req, res) => {
  res.send({ user: req.user, message: "User Fetched Successfully" });
});

router.patch("/me", ensureAuthLocal, async (req, res) => {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "displayName",
    "firstName",
    "lastName",
    "email",
    "password",
    "address",
    "contact",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid update!" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    if (!req.user) return res.status(404).send({ message: "No such user" });

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/me", ensureAuthLocal, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.user._id,
    });
    await Donations.deleteMany({
      owner_id: req.user._id,
    });

    if (!user) return res.status(404).send({ message: "No Such User" });

    res.send({ user: user, message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/me/avatar",
  ensureAuthLocal,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.status(201).send({ message: "Avatar uploaded successfully" });
  },
  (error, req, res, next) => {
    console.log("this is an error ", error);
    res.status(400).send({ error: error });
  }
);

router.delete("/me/avatar", ensureAuthLocal, async (req, res) => {
  try {
    // const seed = "fhlsdkfjdshfdsjlhfjdkslhfdsjhfls";
    // req.user.avatar = `https://avatars.dicebear.com/api/pixel-art-neutral/${seed}.svg?mood[]=happy`;
    // await req.user.save();
    req.user.avatar = undefined;
    await req.user.save();
    res.send({ message: "Profile Avatar Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id/avatar", ensureAuthLocal, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
