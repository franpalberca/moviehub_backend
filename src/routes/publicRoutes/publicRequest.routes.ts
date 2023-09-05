import {Router} from 'express';
import {createGenre, createUser, deleteGenreByID, deleteUserById, getAllGenres, getAllUsers, getGenreByID, getUserById, updateGenreByID, updateUserName} from '../../controllers';

const publicRoutes = Router();

publicRoutes
	.post('/genres', createGenre)
	.get('/genres', getAllGenres)
	.put('/genres/:genreID', updateGenreByID)
	.get('/genres/:genreID', getGenreByID)
	.delete('/genres/:genreID', deleteGenreByID)
	.post('/users', createUser)
	.get('/users', getAllUsers)
	.get('/users/:userId', getUserById)
	.put('/users/:userId', updateUserName)
	.delete('/users/:userId', deleteUserById);

export default publicRoutes;
