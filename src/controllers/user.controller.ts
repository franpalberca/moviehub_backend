import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';

export const createUser = async (req: Request, res: Response) => {
	// console.log(req.body);
	try {
		const {nickname, email, name, picture} = req.body;

		const user = await prisma.users.findFirst({
			where: {
				email: email,
			},
		});
		if (user) {
			return res.status(305).send(user.id);
		}
		const newUser = await prisma.users.create({
			data: {
				email: email,
				name: name,
				nickname: nickname,
				picture: picture,
			},
		});
		res.status(201).send(newUser.id);
	} catch (err) {
		console.log(err);
		res.status(500).send('Error creating user');
	}
};

export const updateUserName = async (req: Request, res: Response) => {
	const {userId} = req.params;
	const {name, email} = req.body;
	try {
		const user = await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				name,
				email,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await prisma.users.findMany();
		res.status(201).json(allUsers);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getUserById = async (req: Request, res: Response) => {
	const {userId} = req.params;
	try {
		const user = await prisma.users.findUnique({
			where: {
				email: userId,
			},
			include: {
				movies: {
					include: {
						genres: true,
					},
				},
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const deleteUserById = async (req: Request, res: Response) => {
	const {userId} = req.params;
	try {
		await prisma.users.delete({
			where: {
				id: userId,
			},
		});
		res.status(204).json();
	} catch (error) {
		res.status(500).json(error);
	}
};
