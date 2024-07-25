const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const {
  dashboardTotalsData,
  dashboardContactPerMonth,
  dashboardContactsByCompany,
} = require("../utils/helperFunctions");
const { default: mongoose } = require("mongoose");

// controller for fetching user profile detail
// ==================== FETCH USER PROFILE DETAIL
// GET: api/users/fetch-user-profile/
// PROTECTED
module.exports.fetchUserDetail = async (req, res) => {
  try {
    const userDetail = await User.findById(req.userId).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      password: 0,
    });
    if (!userDetail)
      throw {
        statusCode: 404,
        message: `User detail not found`,
      };

    return res.status(200).json({ userDetail });
  } catch (error) {
    console.log("Error while fetching user profile detail: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for updating user profile detail
// ==================== UPDATE USER PROFILE DETAIL
// PATCH: api/users/update-user-profile/
// PROTECTED
module.exports.updateUserDetail = async (req, res) => {
  try {
    const { firstName, lastName, dob, gender, address } = req.body;
    const updatedData = { firstName, lastName, dob, gender, address };

    console.log("Before: ", updatedData);

    // Remove any undefined fields
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    console.log("After: ", updatedData);

    const user = await User.findById(req.userId);
    if (!user)
      throw {
        statusCode: 404,
        message: `User with id: ${req.userId} not found`,
      };

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $set: updatedData,
      },
      { new: true, runValidators: true }
    ).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      password: 0,
    });
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error while updating user profile: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for updating user profile pic
// ==================== UPDATING USER PROFILE PIC
// PATCH: api/users/change-user-avatar/
// PROTECTED
module.exports.changeUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      throw { statusCode: 400, message: "File is missing" };
    }
    const user = await User.findById(req.userId);
    if (!user)
      throw {
        statusCode: 404,
        message: `User with id: ${req.userId} not found`,
      };

    const oldFileName = user.profilePic;
    const newFileName = req.file.filename;
    console.log("Old filename: ", oldFileName);
    console.log("New filename: ", newFileName);

    if (!oldFileName.startsWith("default")) {
      // Remove the old file from uploads folder
      const filePath = path.join(__dirname, "../uploaded_files", oldFileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error detecting file: ", err);
          throw { statusCode: 500, message: "Error while uploading" };
        } else {
          console.log("File deleted successfully", req.file.filename);
        }
      });
    }

    // Now update the profilePic name in the database
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        $set: {
          profilePic: newFileName,
        },
      },
      { new: true }
    ).select({
      __v: 0,
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    return res.status(200).json({
      messgae: "User avatar changed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error while changing the profile pic of user: ", error);
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../uploaded_files",
        req.file.filename
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error detecting file: ", err);
          throw { statusCode: 500, message: "Error while uploading" };
        } else {
          console.log("File deleted successfully", req.file.filename);
        }
      });
    }
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for fetching dashboard data
// ==================== FETCHING DATA FOR DASHBOARD PAGE
// GET: api/users/dashboard-data
// PROTECTED
module.exports.dashboardData = async (req, res) => {
  try {
    const adminId = new mongoose.Types.ObjectId(req.userId);
    const totals = await dashboardTotalsData(Contact, adminId);

    // Contacts created each month
    const contactsPerMonth = await dashboardContactPerMonth(Contact, adminId);

    // recently created contacts
    const recentContacts = await Contact.find({ adminId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Contacts by company
    const contactsByCompany = await dashboardContactsByCompany(
      Contact,
      adminId
    );

    return res.status(200).json({
      dashboardData: {
        totals,
        contactsPerMonth,
        recentContacts,
        contactsByCompany,
      },
    });
  } catch (error) {
    console.log("Error while fetching dashboard data: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};
