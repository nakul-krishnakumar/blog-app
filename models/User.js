const argon2 = require('argon2')
const mongoose = require('mongoose');
const { createTokenForUser } = require("../services/auth");

const userSchema = new mongoose.Schema({
   fullName: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   profileImageURL: {
      type: String,
      default: "/images/profile-circle.svg",
   },
   role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
   }
}, { timestamps: true});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
   const user = await this.findOne({ email });
   if (!user) throw new Error('User not found!');

   const flag = await argon2.verify(user.password, password);

   const token = createTokenForUser(user);

   if (!flag) throw new Error('Incorrect Password');
   else return token;
});

userSchema.pre('save', async function (next) {
   const user = this;
   if (!user.isModified("password")) return;

   // ------------ HASHING ----------------------
   const hashedPassword = await argon2.hash(user.password);
   // -------------------------------------------
   
   this.password = hashedPassword;
   next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;