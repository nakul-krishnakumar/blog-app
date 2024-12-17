const JWT = require("jsonwebtoken");
const { validateToken } = require("../services/auth");
const User = require("../models/User");

function checkForAuthenticationCookie(cookieName) {
   return (req, res, next) => {
      const token = req.cookies?.[cookieName];

      if (!token) {
         return next();
      }

      try {
         const userPayload = validateToken(token);
         req.user = userPayload;
      } catch(error) {
         console.log("error:", error)
      }

      return next();
   }
}

module.exports = {
   checkForAuthenticationCookie
};