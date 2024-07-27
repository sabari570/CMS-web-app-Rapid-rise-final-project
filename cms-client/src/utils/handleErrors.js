export const handleErrors = (error) => {
  if (error?.email !== undefined && error?.email != "") {
    return error.email;
  } else if (error?.password != undefined && error?.password != "") {
    return error.password;
  } else if (error?.phoneNumbers != undefined && error?.phoneNumbers != "") {
    return error.phoneNumbers;
  } else if (error?.phone != undefined && error?.phone != "") {
    return error.phone;
  }
  return error;
};
