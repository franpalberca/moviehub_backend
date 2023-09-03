import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';
import {uploadImage} from '../utils/cloudinary';
import fs from 'fs-extra';

export const createMovie = async (req: Request, res: Response): Promise<Response> => {
	const {userID} = req.params;
	const title = req.body.title as string;
	const year = parseInt(req.body.year as string, 10);
	const score = parseFloat(req.body.score as string);
	const country = req.body.country as string;
	const genres = Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres];

	try {
		const genreIDs: string[] = [];

		for (const genreName of genres) {
			let genre = await prisma.genres.findUnique({where: {id: genreName}});

			if (!genre) {
				genre = await prisma.genres.create({data: {genre: genreName}});
			}
			genreIDs.push(genre.id);
		}
		if (!req.files || !req.files.image) {
			return res.status(400).json({error: 'Image is missing'});
		}

		if ((req.files as any)?.image) {
			const upload = await uploadImage((req.files as any).image.tempFilePath);
			await fs.unlink((req.files as any).image.tempFilePath);

			const newMovie = await prisma.movies.create({
				data: {
					title,
					year,
					score,
					country,
					genres: {
						connect: genreIDs.map((genreID: string) => ({id: genreID})),
					},
					Users: {
						connect: {
							email: userID,
						},
					},
					imageUrl: upload.secure_url,
					imageId: upload.public_id,
					genresArray: genres,
				},
				include: {
					genres: true,
					Users: true,
				},
			});
			await prisma.users.update({
				where: {email: userID},
				data: {
					moviesArray: {push: newMovie.title},
				},
			});

			return res.status(201).send({status: 'Success', message: 'Movie created', newMovie});
		}
		return res.status(404).send('File not found');
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const getMovieByID = async (req: Request, res: Response): Promise<Response> => {
	const {movieID} = req.params;
	try {
		const movie = await prisma.movies.findUnique({
			where: {id: movieID},
			include: {genres: true},
		});

		if (!movie) {
			return res.status(404).send({msg: 'Movie not found'});
		}

		return res.status(200).send(movie);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};

export const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
	try {
		const movies = await prisma.movies.findMany({
			include: {
				genres: true,
			},
		});

		return res.status(200).send(movies);
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const updateMovieByID = async (req: Request, res: Response): Promise<Response> => {
	const {movieID} = req.params;
	const {title, score, year, country, genres} = req.body;
	try {
		const movie = await prisma.movies.update({
			where: {id: movieID},
			data: {title, score, year, country, genres},
		});

		return res.status(200).send(movie);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};

export const removeMovieByID = async (req: Request, res: Response): Promise<Response> => {
	const {movieID} = req.params;

	try {
		const movie = await prisma.movies.findUnique({
			where: {id: movieID},
			include: {
				Users: true,
			},
		});

		if (!movie) {
			return res.status(404).send({status: 'Error', msg: 'Movie not found'});
		}

		const userID = movie.Users?.id;

		if (userID) {
			await prisma.users.update({
				where: {id: userID},
				data: {
					moviesArray: {set: movie.Users?.moviesArray.filter((title: string) => title !== movie.title)},
				},
			});
		}

		await prisma.movies.delete({
			where: {id: movieID},
		});

		return res.status(200).send({status: 'Success', msg: 'Deleted movie by ID'});
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};
