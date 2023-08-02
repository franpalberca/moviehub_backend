import { Router } from "express";
import { createMovie, getAllMovies, removeMovieByID } from "../controllers/movies.controller";

const MoviesRouter = Router()

MoviesRouter
    .post('/:userID', createMovie)
    .get('/', getAllMovies)
    .delete('/:ID', removeMovieByID)


export default MoviesRouter