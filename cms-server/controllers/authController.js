const fs = require("fs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const TokenBlackList = require("../models/tokenBlacklistModel.js");
const { handleErrors, handleCatchErrors } = require("../utils/errorHandler.js");
const path = require("path");
const { CLIENT_URL } = require("../constants/constants.js");
require("dotenv").config();

const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

// array that stores the valid refresh token
let refreshTokens = [];

// Function to create token
const createToken = (id) => {
  // creating access token that expires after every 15m
  const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });

  // creating refresh token that expires each day
  const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
};

// controller for registering users
module.exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
      address,
      phoneNumbers,
    } = req.body;

    console.log("Request body:", req.body);

    const errors = handleErrors(req.body);

    if (!errors.status) {
      throw errors;
    }

    let userBody = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      dob,
      gender,
      address,
      phoneNumbers,
    };

    if (req.file) {
      console.log("filename: ", req.file.filename);
      userBody.profilePic = req.file.filename;
    }

    console.log("User body: ", userBody);

    const user = await User.create(userBody);
    const { accessToken, refreshToken } = createToken(user._id);
    const formattedUserObject = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    res.status(201).json({
      user: {
        ...formattedUserObject,
        "access-token": accessToken,
        "refresh-token": refreshToken,
      },
    });
  } catch (err) {
    console.log("Error while registering: ", err);

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
    if (!err.statusCode) err = handleCatchErrors(err);
    return res
      .status(err.statusCode || 500)
      .json({ errors: { message: err.message || "Something went wrong" } });
  }
};

// controller for logging users in
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) throw { statusCode: 400, message: "Please enter your email" };
    if (!password)
      throw { statusCode: 400, message: "Please enter your password" };
    const user = await User.login(email, password);
    const { accessToken, refreshToken } = createToken(user._id);

    // placing the refresh token inside the array
    refreshTokens.push(refreshToken);

    const {
      password: _,
      createdAt,
      updatedAt,
      __v,
      ...formattedUserObject
    } = user._doc;
    const userInfo = {
      ...formattedUserObject,
      "access-token": accessToken,
      "refresh-token": refreshToken,
    };
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    req.session.message = {
      type: "success",
      message: "Google Authentication successfull",
    };
    res.status(200).json({ user: userInfo });
  } catch (err) {
    console.log("Error while logging in: ", err);
    if (!err.statusCode) {
      err = handleCatchErrors(err);
    }
    return res
      .status(err.statusCode || 500)
      .json({ errors: { message: err.message || "Something went wrong" } });
  }
};

// controller for re-generating the access token
module.exports.regenerateToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res
      .status(401)
      .json({ errors: { message: "You are not authenticated" } });

  if (!refreshTokens.includes(refreshToken))
    return res
      .status(403)
      .json({ errors: { message: "Refresh token is not valid" } });

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, (err, decodedToken) => {
    if (err)
      return res
        .status(403)
        .json({ errors: { message: "Refresh token is not valid" } });

    // remove the earlier refresh token placed in the array
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const tokens = createToken(decodedToken.id);
    const newAccessToken = tokens.accessToken;
    const newRefreshToken = tokens.refreshToken;
    refreshTokens.push(newRefreshToken);
    return res.status(200).json({
      "access-token": newAccessToken,
      "refresh-token": newRefreshToken,
    });
  });
};

// controller for handling successfull login using passport
module.exports.loginSuccessController = (req, res) => {
  try {
    console.log("google user id: ", req.userId);
    const { accessToken, refreshToken } = createToken(req.userId);
    console.log("Access tooken: ", accessToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    req.session.message = "Successfully logged user in";
    console.log("Session message in success: ", req.session.message);
    res.redirect(`${CLIENT_URL}/dashboard`);
  } catch (error) {
    console.log("Error in login success controller: ", error);
    return res.redirect(`${CLIENT_URL}/login`);
  }
};

// controller for accessing the session message
module.exports.fetchSessionMessage = (req, res) => {
  try {
    const message = req.session.message || null;
    req.session.message = null;
    console.log("Message after: ", message);
    return res.status(200).json({ message });
  } catch (error) {
    console.log("Error while fetching session: ", error);
    return res
      .status(500)
      .json({ errors: { message: "Something went wrong" } });
  }
};

// controller for logging users out and update the tokenBlackList in the database
module.exports.logout = async (req, res) => {
  const { accessToken } = req.cookies;

  if (!accessToken)
    return res
      .status(401)
      .json({ errors: { message: "You are not authenticated" } });

  try {
    await TokenBlackList.create({ token: accessToken });
    res.cookie("accessToken", "", { expires: new Date(0) });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log("Error while logging out: ", err.message, err.code);
    if (err.code == 11000) {
      return res
        .status(400)
        .json({ errors: { message: "Access Token already exists" } });
    }
    return res
      .status(500)
      .json({ errors: { message: "Something went wrong" } });
  }
};

// controller for forgot password
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw { statusCode: 400, message: "Email is required" };

    const user = await User.findOne({ email });
    if (!user)
      throw {
        statusCode: 404,
        message: "User with this email is not registered",
      };

    if (user.provider === "google")
      throw {
        statusCode: 400,
        message: "Password reset is not allowed for Google sign-in users",
      };

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "2m" }
    );

    const resetUrl = `${CLIENT_URL}/reset-password/${user._id}/${token}`;

    // sending the mail
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: "rsabarisai2000@gmail.com", // temporary email
      subject: "Reset your password",
      text: `You are receiving this email because you (or someone else) have requested a password reset. Please click on the following link, or paste it into your browser to complete the process(This link is valid only for 2 minutes):\n ${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error while sending reset link: ", error.message);
        throw { statusCode: 400, message: error.message };
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    console.log("Error in forgot password: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};

// controller for resetting password
module.exports.resetPassword = async (req, res) => {
  try {
    const { id: userId, token } = req.params;
    const { password, password2 } = req.body;

    if (!password || !password2)
      throw { statusCode: 400, message: "Password fields are required" };

    if (password !== password2)
      throw { statusCode: 400, message: "Passwords do not match" };

    if (password.length < 6)
      throw {
        statusCode: 400,
        message: "Password length must be atleast 6 characters",
      };

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
    } catch (error) {
      console.log("Error while decoding token: ", error);
      return res
        .status(400)
        .json({ errors: { message: "Invalid or expired token" } });
    }

    const user = await User.findById(userId);
    if (!user) throw { statusCode: 404, message: "User not found" };

    if (user.provider === "google")
      throw {
        statusCode: 400,
        message: "Password reset is not allowed for Google sign-in users",
      };

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ message: "Password has been successfully reset" });
  } catch (error) {
    console.log("Error while resetting password: ", error);
    return res
      .status(error.statusCode || 500)
      .json({ errors: { message: error.message || "Something went wrong" } });
  }
};
