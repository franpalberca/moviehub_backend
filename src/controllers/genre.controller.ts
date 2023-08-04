import {Request, Response} from 'express';
import GenreModel from '../model/genre.model'

export const createGenre = async (req: Request, res: Response) => {
    const {name} =req.body

    try {
        const newGenre = await GenreModel.create({
            name
        })
        res.status(201).send(newGenre)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getGenreById = async (req: Request, res: Response) => {
    const {genreId} = req.params;
    try{
        const genre = await GenreModel.findById({_id: genreId})
        res.status(201).json(genre);

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllGenres = async (req: Request, res: Response) => {
    try{ const allGenres = await GenreModel.find()
        res.status(201).json(allGenres);
    } catch (error) {
        res.status(500).json(error);

}
}

export const updateGenre = async (req: Request, res: Response) => {
    const {genreId} = req.params;
    const {name} = req.body;
    try{
        const genre = await GenreModel.findByIdAndUpdate({_id:genreId}, {
            $set: {name:name}
        }, {new: true})

        res.status(201).json(genre);
    } catch (error) {
    res.status(500).json(error);
    }
}

export const removeGenreById = async (req: Request, res: Response) => {
    const {genreId} = req.params
    try{
        await GenreModel.findByIdAndDelete({_id: genreId})
        res.status(204).json()
    } catch (error) {
        res.status(500).json(error)

    }
}