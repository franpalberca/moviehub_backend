import { Router } from "express";
import { createGenre, getGenreById, updateGenre, getAllGenres, removeGenreById } from "../controllers/genre.controller";

const GenreRouter = Router()

GenreRouter
    .post('/', createGenre)
    .get('/', getAllGenres)
    .get('/:genreId', getGenreById)
    .put('/:genreId', updateGenre)
    .delete('/:genreId', removeGenreById)


export default GenreRouter