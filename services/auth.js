const JWT = require('jsonwebtoken');


const createTokenForUser = (user) => {
   const payload = {
      _id: user._id,
      email: user.email,
      profileImageURL: user.profileImageURL,
      role: user.role
   }

   console.log(process.env.JWT_SECRET);
   const token = JWT.sign(payload, process.env.JWT_SECRET);
   return token;
}

const validateToken = (token) => {
   const payload = JWT.verify(token, process.env.JWT_SECRET);
   return payload;
}

module.exports = {
   createTokenForUser,
   validateToken
}