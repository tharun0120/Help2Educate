const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const donations = require("./donations");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is Invalid");
      },
    },
    password: {
      type: String,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password cannot contain password");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: String,
    },
    googleID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("donations", {
  ref: "donations",
  localField: "_id",
  foreignField: "owner_id",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  // delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await users.findOne({ email });

  if (!user) {
    throw new Error("Unable to login: No such user found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login: Invalid password");
  }

  return user;
};

//Hashing Passwords
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//TO delete the tasks after the user profile is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await donations.deleteMany({ owner: user._id });
  next();
});

const users = mongoose.model("users", userSchema);

module.exports = users;
