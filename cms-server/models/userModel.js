const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter the first name"],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "Please enter the last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      // required: [true, "Please enter the password"],
      minlength: [6, "Password length must be atleast 6 characters"],
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    address: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "default-profile-pic.png",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to fire a functions before saving the doc to the database
userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// static method for logging users in
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  console.log({ user });
  if (!user) throw new Error("incorrect email");

  if (!user.password) throw new Error("incorrect email");

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw new Error("incorrect password");

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
