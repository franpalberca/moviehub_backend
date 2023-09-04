import { Router } from "express";
import { createGenre, createUser, deleteGenreByID, getAllGenres, getGenreByID, updateGenreByID } from "../../controllers";


const publicRoutes = Router()

publicRoutes
    .post('/genres', createGenre)
    .get('/genres', getAllGenres)
    .put('/genres/:genreID', updateGenreByID)
    .get('/genres/:genreID', getGenreByID)
    .delete('/genres/:genreID', deleteGenreByID)
    .post('/users', createUser)

export default publicRoutes