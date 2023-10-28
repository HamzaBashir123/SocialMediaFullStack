import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const registeration = async (req, res) => {
  console.log("user ki registration ki api");

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).send({
      status: "Success",
      message: "User Signed up Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error, "<<==Error");
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};

//  ////////////////////  Login  ///////////////////////////
export const login = async (req, res) => {
  console.log("Login user ki Api");
  try {
    const user = await User.findOne({
      userEmail: req.body.userEmail,
    });
    if (!user) {
      return res.status(404).send({
        status: "Failed",
        message: "User not found",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).send({
        status: "Failed",
        message: "Wrong Password",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "User Login in Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error, "<<==Error");
    res.status(200).send({
      status: "Failed",
      message: error.message,
    });
  }
};
