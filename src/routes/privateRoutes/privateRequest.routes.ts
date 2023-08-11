import { Router } from "express";
import { createMovie, deleteUserById, getAllMovies, getAllUsers, getMovieByID, getUserById, removeMovieById, updateMovieByID, updateUserName } from "../../controllers";


const privateRouter = Router()

privateRouter
    .post('/movies/:userID', createMovie)
    .put('/movies/:movieID', updateMovieByID)
    .get('/movies', getAllMovies)
    .get('/movies/:movieID', getMovieByID)
    .delete('/movies/:movieID', removeMovieById)

    .get('/users', getAllUsers)
	.get('/users/:userId', getUserById)
	.put('/users/:userId', updateUserName)
	.delete('/users/:userId', deleteUserById);


export default privateRouter