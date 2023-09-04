import { Router } from "express";
import { createMovie, deleteUserById, getAllMovies, getAllUsers, getMovieByID, getUserById, removeMovieByID, updateMovieByID, updateUserName } from "../../controllers";


const privateRoutes = Router()

privateRoutes
    .post('/movies/:userID', createMovie)
    .put('/movies/:movieID', updateMovieByID)
    .get('/movies', getAllMovies)
    .get('/movies/:movieID', getMovieByID)
    .delete('/movies/:movieID', removeMovieByID)

    .get('/users', getAllUsers)
	.get('/users/:userId', getUserById)
	.put('/users/:userId', updateUserName)
	.delete('/users/:userId', deleteUserById);


export default privateRoutes