export const signUpErrorHandler = (err: any): string => {
  let message;
  const { errno } = err;
  switch (errno) {
    case 1406:
      message = "Password is 8 symbols";
      break;
    case 1062:
      message = "Such user is already registered";
      break;
    default:
      message = "Server problem";
  }
  return message;
};
