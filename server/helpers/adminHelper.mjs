import Admin from "../models/adminSchema.mjs";
import User from "../models/userSchema.mjs";

const adminLoginAccess = async (adminData) => {
  try {
    const { email, password } = adminData;
    const result = await Admin.findOne({ email });

    if (result && password === result.password) {
      return {
        status: true,
        data: result,
        message: "Admin authenticated successfully",
      };
    } else {
      return {
        status: false,
        data: null,
        message: "Admin authentication failed",
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
};

const getUsersData = async () => {
  try {
    const result = await User.find({});
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("failed to get users data");
  }
};

const deleteSelectedUser = async (id) => {
  try {
    const result = await User.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("failed to delete the user");
  }
};

export { adminLoginAccess, getUsersData, deleteSelectedUser };
