import User from "../models/userSchema.mjs";
import { verifyJwt, generateAccessToken } from "../middleware/jwt.mjs";

const userRegister = async (userData) => {
  try {
    const { name, email, password, phoneNumber } = userData;
    const newUser = new User({
      name,
      email,
      password,
      phoneNumber,
    });
    const result = await newUser.save();
    return result
  } catch (error) {
    console.error(error);
    throw new Error("user signup failed");
  }
};

const userLoginAccess = async (userData) => {
  try {
    const { email, password } = userData;

    const result = await User.findOne({ email: email });
    const isAuthenticated =
      email === result.email && password === result.password;

    if (isAuthenticated) {
      const accessToken = generateAccessToken(result.id);
      console.log(accessToken);
      return {
        status: true,
        data: result,
        message: "User authenticated successfully",
        accessToken: accessToken,
      };
    } else {
      return {
        status: false,
        data: result,
        message: "User not authenticated",
        accessToken: null,
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error("failed to login");
  }
};

const getUserDetails = async (userId) => {
  try {
    const result = await User.findOne({ _id: userId });
    if (result) {
      return {
        status: true,
        data: result,
        message: "user details retrieved",
      };
    } else {
      return {
        status: false,
        data: null,
        message: "User not found",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: false,
      data: null,
      message: "Failed to get user details",
    };
  }
};

const updateUserProfileImage = async (userId, imageUrl) => {
  try {
    
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.profileImage = imageUrl;  
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Failed to update user profile image');
  }
};

const userImageUrl = async(userId)=>{
  try{
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const imageUrl = user.profileImage;
    return imageUrl;
  }catch(error){
    throw new Error('Failed to get user profile image');
  }
}

export { userRegister, userLoginAccess, getUserDetails, updateUserProfileImage ,userImageUrl};
