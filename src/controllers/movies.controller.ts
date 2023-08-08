import {Request, Response} from 'express';
import MoviesModel from '../model/movies.model'
import userModel from '../model/user.model';

export const createMovie = async (req: Request, res: Response) => {
    const {name, picture} = req.body
    const {userId} = req.params

    console.log(userId)
    try {
        const newMovie = await MoviesModel.create({
            name,
            picture
        })
        await userModel.findByIdAndUpdate({_id: userId}, {
            $push: {movies: newMovie._id}
        },)
        res.status(201).send(newMovie)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const removeMovieById = async (req: Request, res: Response) => {
    const {movieId} = req.params
    try{
        await MoviesModel.findByIdAndDelete({_id: movieId})
        res.status(204).json()
    } catch (error) {
        res.status(500).json(error)

    }
}

export const getAllMovies = async (req: Request, res: Response) => {
    try{ const allMovies = await MoviesModel.find()
        res.status(201).json(allMovies);
    } catch (error) {
        res.status(500).json(error);

}
}