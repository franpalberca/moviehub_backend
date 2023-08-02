import {Request, Response} from 'express';
import MoviesModel from '../model/movies.model'
import userModel from '../model/user.model';

export const createMovie = async (req: Request, res: Response) => {
    const {name} =req.body
    const {userID} = req.params

    console.log(userID)
    try {
        const newMovie = await MoviesModel.create({
            name
        })
        await userModel.findByIdAndUpdate({_id: userID}, {
            $push: {movies: newMovie._id}
        },)
        res.status(201).send(newMovie)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const removeMovieByID = (req: Request, res: Response) => {
    const {ID} = req.params

    res.status(200).send({msg: 'Movie removed successfully', data: ID})
}

export const getAllMovies = (req: Request, res: Response) => {
    res.status(200).send({msg: 'All Movies'})
}