import {Request, Response} from 'express';
import UserModel from '../model/user.model';

export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password) {
            res.status(400).json({error: 'Missing required fields'});
            return;
    }

    const newUser = await UserModel.create({
        name,
        email,
        password
    })

    res.status(201).json(newUser);
} catch (error) {
    res.status(500).json(error);
}
}

export const updateUserName = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const {name, email} = req.body;
    try{
        const user = await UserModel.findByIdAndUpdate({_id:userId}, {
            $set: {name:name, email:email}
        }, {new: true})

        res.status(201).json(user);
    } catch (error) {
    res.status(500).json(error);
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const allUsers = await UserModel.find()
        res.status(201).json(allUsers);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try{
        const user = await UserModel.findById({_id: userId}).populate('movies')
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        await UserModel.findByIdAndDelete({_id: userId})
        res.status(204).json();
    } catch (error) {
        res.status(500).json(error);
    }
}
