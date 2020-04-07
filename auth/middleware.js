//AUTH MIDDLEWARE

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).send('No Autorizado FIADUMAPUTA');
  }
};

module.exports = authMiddleware;
