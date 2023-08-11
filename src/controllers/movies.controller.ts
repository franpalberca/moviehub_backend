import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';

export const createMovie = async (req: Request, res: Response): Promise<Response> => {
	const {title, year, score, genres} = req.body;
	const {userID} = req.params;
	try {
		const genreIDs: string[] = [];

		for (const genreName of genres) {
			let genre = await prisma.genres.findFirst({where: {genre: genreName}});

			if (!genre) {
				genre = await prisma.genres.create({data: {genre: genreName}});
			}
			if (genre) {
				genreIDs.push(genre.id);
			}
		}

		const newMovie = await prisma.movies.create({
			data: {
				title,
				year,
				score,
				genres: {
					connect: genreIDs.map((genreID: string) => ({id: genreID})),
				},
				Users: {
					connect: {
						id: userID,
					},
				},
				genresArray: genres,
			},
			include: {
				genres: true,
				Users: true,
			},
		});
		await prisma.users.update({
			where: {id: userID},
			data: {
				moviesArray: {push: newMovie.title},
			},
		});

		return res.status(201).send({status: 'Success', message: 'Movie created', newMovie});
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const removeMovieById = async (req: Request, res: Response) => {
	const {movieId} = req.params;
	try {
		await prisma.movies.delete({
			where: {
				id: movieId,
			},
		});
		res.status(204).json();
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getAllMovies = async (req: Request, res: Response) => {
	try {
		const allMovies = await prisma.movies.findMany({
			select: {
				id: true,
				title: true,
				year: true,
			},
		});
		res.status(200).send({data: allMovies});
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getMovieByID = async (req: Request, res: Response) => {
	const {movieId} = req.params;
	try {
		const movie = await prisma.movies.findUnique({
			where: {
				id: movieId,
			},
			include: {
				genres: true,
			},
		});

		if (!movie) {
			return res.status(404).send({msg: 'Movie not found'});
		}

		res.status(200).send({data: movie});
	} catch (error) {
		res.status(500).send(error);
	}
};

export const updateMovieByID = async (req: Request, res: Response): Promise<Response> => {
	const {movieID} = req.params;
	const {title, year, score, genres} = req.body;
	try {
		const movie = await prisma.movies.update({
			where: {id: movieID},
			data: {title, year, score, genres},
		});

		return res.status(200).send(movie);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};
