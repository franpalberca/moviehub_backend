import { Router } from "express";
import { createMovie, getAllMovies, getMovieByID, removeMovieById, updateMovieByID } from "../controllers/movies.controller";

const MoviesRouter = Router()

MoviesRouter
    .post('/:userID', createMovie)
    .put('/:movieID', updateMovieByID)
    .get('/', getAllMovies)
    .get('/:movieID', getMovieByID)
    .delete('/:movieID', removeMovieById)


export default MoviesRouter