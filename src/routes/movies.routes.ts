import { Router } from "express";
import { createMovie, getAllMovies, removeMovieById } from "../controllers/movies.controller";

const MoviesRouter = Router()

MoviesRouter
    .post('/:userId', createMovie)
    .get('/', getAllMovies)
    .delete('/:movieId', removeMovieById)


export default MoviesRouter