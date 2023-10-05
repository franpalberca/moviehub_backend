import {Router} from 'express';
import {createGenre, createMovie, createUser, deleteGenreByID, deleteUserById, getAllGenres, getAllMovies, getAllUsers, getGenreByID, getMovieByID, getUserById, removeMovieByID, updateGenreByID, updateMovieByID, updateUserName} from '../../controllers';

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
	.delete('/users/:userId', deleteUserById)
	.post('/movies/:userID', createMovie)
    .put('/movies/:movieID', updateMovieByID)
    .get('/movies/:userID', getAllMovies)
    .get('/movie/:movieID', getMovieByID)
    .delete('/movies/:movieID', removeMovieByID)

export default publicRoutes;
