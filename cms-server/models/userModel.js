const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const phoneNumberRegex = /^\+\d{1,3}\s\d{10}$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter the first name"],
      trim: true,
    },
    lastName: {
      type: String,
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
      minlength: [6, "Password length must be atleast 6 characters"],
    },
    dob: {
      type: String,
      default: "00/00/0000",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    phoneNumbers: {
      type: [String],
      validate: {
        validator: function (value) {
          console.log("value: ", value);
          if (!value || value.length === 0) return true;
          let phoneNumbers;
          try {
            phoneNumbers =
              typeof value[0] === "string" ? value[0].split(",") : value[0];
          } catch (error) {
            return false;
          }
          console.log("Obtained phone numbers: ", phoneNumbers);
          const response = phoneNumbers.every(
            (number) =>
              typeof number === "string" && phoneNumberRegex.test(number.trim())
          );
          console.log("Response: ", response);
          return phoneNumbers.every(
            (number) =>
              typeof number === "string" && phoneNumberRegex.test(number.trim())
          );
        },
        message: `Invalid phone number`,
      },
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
