// import { Router } from "express";
// import { createMovie, getAllMovies, getMovieByID, removeMovieByID, updateMovieByID, } from "../../controllers";
// import { checkJwtMiddleware } from "../../middleware/checkjwt.middleware";


// const privateRoutes = Router()

// privateRoutes
//     .post('/movies/:userID', checkJwtMiddleware, createMovie)
//     .put('/movies/:movieID', checkJwtMiddleware, updateMovieByID)
//     .get('/movies/:userID', checkJwtMiddleware, getAllMovies)
//     .get('/movies/:movieID', checkJwtMiddleware, getMovieByID)
//     .delete('/movies/:movieID', checkJwtMiddleware, removeMovieByID)

// export default privateRoutes