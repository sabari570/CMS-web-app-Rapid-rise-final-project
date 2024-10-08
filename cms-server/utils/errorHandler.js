const notFound = (req, res, next) => {
  return res
    .status(404)
    .json({ errors: { message: `Not found - ${req.originalUrl}` } });
};

//Handle errors
const handleErrors = ({
  firstName,
  lastName,
  email,
  password,
  password2,
  dob,
  phoneNumbers,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !password2 ||
    !dob ||
    !phoneNumbers
  ) {
    return {
      status: false,
      statusCode: 400,
      message: "All required fields are mandatory",
    };
  }

  if (password !== password2) {
    return {
      status: false,
      statusCode: 400,
      message: "Passwords do not match",
    };
  }

  return {
    status: true,
    statusCode: 200,
    message: "No errors",
  };
};

const handleCatchErrors = (errorObject) => {
  let errors = {};

  // handling incorrect email
  if (errorObject.message === "incorrect email") {
    errors.email = "This email is not registered";
  }

  // handling incorrect password
  if (errorObject.message === "incorrect password") {
    errors.password = "password entered is incorrect";
  }

  // handling validation errors
  if (errorObject.errors) {
    Object.values(errorObject.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // handling duplication errors
  if (errorObject.code == 11000) {
    errors.email = "This email is already registered";
  }

  return {
    status: false,
    statusCode: 400,
    message: errors,
  };
};

const handleContactErrors = ({
  firstName,
  lastName,
  address,
  companyName,
  phone,
}) => {
  if (!firstName || !lastName || !address || !companyName || !phone) {
    return {
      status: false,
      statusCode: 400,
      message: "All required fields are mandatory",
    };
  }

  return {
    status: true,
    statusCode: 200,
    message: "No errors",
  };
};

const handleContactCatchErrors = (errorObject) => {
  let errors = {};

  // handling validation errors
  if (errorObject.errors) {
    Object.values(errorObject.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // handling duplication errors
  if (errorObject.code == 11000) {
    errors.phone = "This phone number is already registered";
  }

  return {
    status: false,
    statusCode: 400,
    message: errors,
  };
};

module.exports = {
  handleErrors,
  handleCatchErrors,
  handleContactErrors,
  handleContactCatchErrors,
  notFound,
};
