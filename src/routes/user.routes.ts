import {Router} from 'express';
import {createUser, deleteUserById, getUserById, getAllUsers, updateUserName} from '../controllers/user.controller';

const UserRouter = Router();

UserRouter
    .get('/', getAllUsers) //Declaration of routes with corresponding method for each one
	.get('/', getUserById)

	.post('/', createUser)

	.put('/:userId', updateUserName)

	.delete('/:userId', deleteUserById);

export default UserRouter;
