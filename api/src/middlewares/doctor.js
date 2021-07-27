export default ({
  constants: {DOCTOR},
  ErrorService: { throwAuthorizationError },
}) => (req, _res, next) => {
  if (req.loggedUser.userType !== DOCTOR) {
    throwAuthorizationError();
  }

  next();
};
