import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    userEmail: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      min: 10,
      max: 100,
    },
    city: {
      type: String,
    },
    from: {
        type: String,
        max: 50,
    },

    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
