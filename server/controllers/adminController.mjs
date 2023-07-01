import {
  adminLoginAccess,
  getUsersData,
  deleteSelectedUser,
} from "../helpers/adminHelper.mjs";

const adminLogin = async (req, res) => {
  try {
    const result = await adminLoginAccess(req.body);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to adminlogin" });
  }
};

const usersData = async (req, res) => {
  try {
    const result = await getUsersData();
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get users data" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteSelectedUser(id);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export { adminLogin, usersData, deleteUser };
