import { Router } from "express";
import { createGenre, deleteGenreByID, getAllGenres, getGenreByID, updateGenreByID} from "../controllers/genre.controller";

const GenreRouter = Router()

GenreRouter
    .post('/', createGenre)
    .get('/', getAllGenres)
    .put('/:genreID', updateGenreByID)
    .get('/:genreID', getGenreByID)
    .delete('/:genreID', deleteGenreByID)


export default GenreRouter