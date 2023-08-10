import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';

export const createUser = async (req: Request, res: Response) => {
	const {name, email, password} = req.body;

	try {
		if (!name || !email || !password) {
			res.status(400).json({error: 'Missing required fields'});
			return;
		}

		const newUser = await prisma.users.create({
			data: {
				name,
				email,
				password,
			},
		});

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const updateUserName = async (req: Request, res: Response) => {
	const {userId} = req.params;
	const {name, email} = req.body;
	try {
		const user = await prisma.users.update({
            where:{
                id: userId
            },
            data: {
                name,
                email
            }
    })
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
                id: userId
            },
            include: {
                movies: {
                    include: {
                        genres:true
                    }
                }
            }
            })
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
                id: userId
            }
            });
		res.status(204).json();
	} catch (error) {
		res.status(500).json(error);
	}
};
