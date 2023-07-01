import express from 'express';
const router = express.Router();
import { adminLogin, usersData, deleteUser } from '../controllers/adminController.mjs';

/* GET login page. */
router.post('/login',adminLogin)

router.get('/getUsersData',usersData)

router.delete('/deleteUser/:id',deleteUser); 


export default router;
