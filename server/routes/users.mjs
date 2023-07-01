import express from "express";
import {
  userSignUp,
  userLogin,
  userDetails,
  saveProfileImage,
  getUserProfileImage
} from "../controllers/userController.mjs";
import { verifyJwt } from "../middleware/jwt.mjs";
import upload from "../middleware/multer.mjs";

const router = express.Router();

router.post("/signup", userSignUp);

router.post("/login", userLogin);

// router.get("/getUserDetails", verifyJwt, userDetails);

router.post('/upload',verifyJwt,upload.single('image'),saveProfileImage );

router.post('/profileImage', getUserProfileImage)

export default router;
