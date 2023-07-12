import express from 'express';
import { User } from '../model/user.js';
import { addUser, getUsers, editUser, editingUser, deleteUser} from '../controller/user-controller.js';
const router = express.Router();

router.post('/', addUser);
router.get('/', getUsers);
router.get('/:id', editUser); 
router.put('/:id', editingUser);
router.delete('/:id', deleteUser);


export default router;