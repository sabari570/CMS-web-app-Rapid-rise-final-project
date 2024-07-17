export const handleErrors = (error) => {
  if (error?.email !== undefined && error?.email != "") {
    return error.email;
  } else if (error?.password != undefined && error?.password != "") {
    return error.password;
  }
  return error;
};
