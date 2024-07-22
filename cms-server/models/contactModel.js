const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+\d{1,3}\s\d{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
    status: {
      type: String,
      default: "Trainee",
      enum: ["Employee", "Trainee"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      validate: {
        validator: validatePhoneNumber,
        message: "Please enter a valid phone number",
      },
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
