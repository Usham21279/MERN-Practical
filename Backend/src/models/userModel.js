import User from "../database/schemas/user.js";
import UserToken from "../database/schemas/userToken.js";

export const findUser = async (query) => {
  return await User.findOne(query);
}

export const createUser = async (body) => {
  return await User.create(body);
}

export const createUserToken = async (body) => {
  return await UserToken.create(body);
}