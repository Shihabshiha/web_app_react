import {
  userRegister,
  userLoginAccess,
  getUserDetails,
  updateUserProfileImage,
  userImageUrl
} from "../helpers/userHelper.mjs";
import multer from "multer";

const userSignUp = async (req, res) => {
  try {
    const result = await userRegister(req.body);
    if (result) {
      res.json({ result });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to signup" });
  }
};

const userLogin = async (req, res) => {
  try {
    const result = await userLoginAccess(req.body);
    console.log('login result is',result)
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const userDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await getUserDetails(userId);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user details" });
  }
};

const saveProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const image = req.file;
    console.log('User ID:', userId);
    console.log('Image:', image);
    if (!image) {
      console.log('No image uploaded');
      return res.status(400).json({ error: 'No image uploaded' });
    }
    const imageUrl = `http://localhost:3000/images/${image.filename}`; 

    // Update the user's profile image URL or file path in the database
    console.log('Updating user profile image...');
    await updateUserProfileImage(userId, imageUrl);

    console.log('Profile image saved successfully');
    res.json({ message: 'Profile image saved successfully',imageUrl });
  } catch (error) {
    console.log('Error saving profile image:', error);
    console.error(error);
    res.status(500).json({ error: 'Failed to save profile image' });
  }
};

const getUserProfileImage= async(req,res)=>{
  try{
    const data = req.body;
    console.log('requested body',data)
    const userId=data._id;
    const imageUrl = await userImageUrl(userId)
    res.json({imageUrl})
  }catch(error){
    console.error(error)
    res.status(500).json({ error: 'Failed to get profile image' });
  }
}




export { userSignUp, userLogin, userDetails, saveProfileImage ,getUserProfileImage };
