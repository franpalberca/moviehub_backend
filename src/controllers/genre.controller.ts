import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';

export const createGenre = async (req: Request, res: Response) => {
	const {genre} = req.body;

	try {
		const newGenre = await prisma.genres.create({
			data: {genre},
		});
		res.status(201).send(newGenre);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const getAllGenres = async (req: Request, res: Response) => {
	console.log("entra")
	try {
		const allGenres = await prisma.genres.findMany();
		res.status(200).json(allGenres);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getGenreByID = async (req: Request, res: Response) => {
	const {genreID} = req.params;
	try {
		const genre = await prisma.genres.findUnique({
			where: {
				id: genreID,
			},
		});
		res.status(200).send(genre);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const updateGenreByID = async (req: Request, res: Response): Promise<Response> => {
	const {genreID} = req.params;
	const {genre} = req.body;
	try {
		if (!genre) {
			return res.status(404).send({msg: 'Genres not found'});
		}
		const genreFound = await prisma.genres.update({
			where: {
				id: genreID,
			},
			data: {genre},
		});

		return res.status(200).send(genreFound);
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const deleteGenreByID = async (req: Request, res: Response): Promise<Response> => {
	const {genreID} = req.params;
	try {
		const deleteGenre = await prisma.genres.delete({
			where: {id: genreID},
		});

		return res.status(200).send({msg: 'Genres not found', deleteGenre});
	} catch (error) {
		return res.status(500).send(error);
	}
};
