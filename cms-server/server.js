const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const { notFound } = require("./utils/errorHandler.js");
const passport = require("passport");
const passportMiddleware = require("./middlewares/passportMiddleware.js");
require("dotenv").config();

// Initialising the express app
const app = express();

const PORT = process.env.PORT || 3000;

// For securing the headers
app.use(helmet());
// For managing sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
// For accessing json requests
app.use(express.json());
app.use(bodyParser.json());
// middleware for using cookies
app.use(cookieParser());

// Initialising passport
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // Check if the request origin is allowed
      if (!origin || origin === "http://localhost:5173") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
// code to access the files uploaded to server
app.use(
  "/uploaded-files",
  express.static(path.join(__dirname, "uploaded_files"))
);

// Limits the request hit for authenticated APIs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Connecting to MongoDB and starting the server
const dbURI = process.env.MONGODB_URL;
mongoose
  .connect(dbURI)
  .then((client) => {
    // Listening to PORT
    app.listen(PORT, () => console.log(`SERVER LISTENING TO PORT:${PORT}`));
  })
  .catch((err) => console.log("Mongoose connection errro: ", err));

app.use("/api/auth", authRoutes);

app.use(notFound);
