import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,

  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken:String,
  verifyTokenExpiry:Date,  
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
