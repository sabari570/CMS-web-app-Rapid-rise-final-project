const mongoose = require("mongoose");

const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+\d{1,3}\s\d{7,15}$/;
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
      default: "Offline",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: validatePhoneNumber,
        message: "Please enter a valid phone number",
      },
    },
    profilepic: {
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
