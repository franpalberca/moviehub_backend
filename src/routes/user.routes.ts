import {Router} from 'express';
import {createUser, deleteUserById, getUserById, getAllUsers, updateUserName} from '../controllers/user.controller';

const UserRouter = Router();

UserRouter
	.post('/', createUser)
    .get('/', getAllUsers) 
	.get('/:userId', getUserById)
	.put('/:userId', updateUserName)
	.delete('/:userId', deleteUserById);

export default UserRouter;
