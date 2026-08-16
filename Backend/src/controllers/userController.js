import bcrypt from "bcrypt";
import { createUser, createUserToken, findUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, password } = req.body;

    if (!(firstName && lastName && mobile && email && password)) {
      return res.handler.badRequest("Request inputs are not valid!");
    }

    const checkUserExist = await findUser({ email });

    if (checkUserExist) {
      return res.handler.badRequest("User already exist!")
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await createUser({ firstName, lastName, mobile, email, password: hashedPassword });

    let userDetails = {
      firstName: user?._doc.firstName,
      lastName: user?._doc.lastName,
      mobile: user?._doc.mobile,
      email: user?._doc.email
    };

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      await createUserToken({ userId: user._id, token });
      userDetails.token = token;
    }

    return res.handler.success("User has been signed-up successfully!", userDetails)
  } catch (error) {
    console.log("🚀 ~ signUp ~ error:", error)
    return res.handler.internalServerError("Internal Server error!")
  }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.handler.badRequest("Request inputs are not valid!");
    }

    const user = await findUser({ email });

    if (!user) {
      return res.handler.badRequest("Invalid Email!");
    }

    if (!bcrypt.compareSync(password, user?.password)) {
      return res.handler.badRequest("Incorrect password!");
    }

    let userDetails = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      mobile: user?.mobile,
      email: user?.email
    };

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    await createUserToken({ userId: user._id, token });
    userDetails.token = token;

    return res.handler.success("User has been logged in successfully!", userDetails);
  } catch (error) {
    console.log("🚀 ~ userLogin ~ error:", error);
    return res.handler.internalServerError("Internal Server error!")
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await findUser({ _id: req.userId });
    let data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email
    }

    return res.handler.success("User profile has been fetched successfully!", data);
  } catch (error) {
    console.log("🚀 ~ getUserProfile ~ error:", error);
    return res.handler.internalServerError("Internal Server error!")
  }
}