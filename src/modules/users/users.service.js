import { UserModel } from "../../db/index.js";

import {
  ApiError,
  checkRequestBody,
  generateToken,
  successRes,
  comparePassword,
  hashPassword,
  checkIfUserExist,
  getToken,
} from "../../common/index.js";

export const signupUser = async (req, res, next) => {
  const { name, email, password, phone, age } = req.body;

  console.log(UserModel);

  try {
    //check if email exist or not
    await checkIfUserExist(email);

    //hash password
    const hashedPassword = await hashPassword(password);

    //create new user
    const newUser = await UserModel.insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
    });

    return successRes(res, 201, "User has been created successfully", newUser);
  } catch (error) {
    throw new ApiError(error.message, 409);
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //check if request body is right
  await checkRequestBody(["email", email], ["password", password]);

  //search for use with email
  const user = await UserModel.findOne({ email });

  //check if user exist or not
  if (!user) throw new ApiError("Email not found", 404);

  //compare input password with hashedPassword
  const checkPassword = await comparePassword(password, user.password);

  if (checkPassword) {
    //generate jwt token with user id
    const token = generateToken(user._id, "1h");

    //add jwt token in cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });

    return successRes(res, 200, "User logged in successfully", {
      token,
    });
  } else throw new ApiError("Password is wrong", 401);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------

export const editUser = async (req, res, next) => {
  const { name, email, phone, age } = req.body;
  //check if any field exist in request body
  if (!name && !email && !phone && !age) {
    throw new ApiError("must enter at least one field to edit", 400);
  }

  //check that there is no password field in request body
  if (req.body.password) {
    throw new ApiError("can't edit password", 401);
  }

  //get userId from jwt token
  const userId = getToken(req);

  //findUser with id
  const user = await UserModel.findById({ _id: userId });

  //check if user exist or not
  if (!user) throw new ApiError("User not found", 404);

  //check if new email is not exist
  if (req.body.email) {
    const user = await UserModel.findOne({ email });
    if (user) throw new ApiError("email already exist", 409);
  }

  //edit user data
  await UserModel.updateOne(
    { _id: userId },
    { $set: req.body, $inc: { __v: 1 } },
  );

  //send token in headers
  res.header("token", req.cookies.jwt);

  return successRes(res, 200, "User data updated successfully");
};

//-----------------------------------------------------------------------------------------------------------------------------------------------

export const deleteUser = async (req, res, next) => {
  //get userId
  const userId = getToken(req);

  console.log(userId);

  //delete user
  const result = await UserModel.findOneAndDelete({ _id: userId });

  //send token with headers
  res.header("token", req.cookies.jwt);

  //clear user cookie
  res.clearCookie("jwt", { httpOnly: true });

  return successRes(res, 200, "user has been deleted successfully");
};

//-----------------------------------------------------------------------------------------------------------------------------------------------

export const getUserData = async (req, res, next) => {
  //get userId
  const userId = getToken(req);

  //get user from db
  const user = await UserModel.findById({ _id: userId });

  if (!user) throw new ApiError("user has been deleted", 400);

  //send token in the headers
  res.header("token", req.cookies.jwt);

  return successRes(res, 200, "user data retrieved successfully", user);
};
