import { NextFunction } from "express";
import { Request, Response } from "express";

export const publicRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.status(200).send({message:"Public Request"})
    } catch (error) {
        next(error);
    }
}

export const protectedRequest = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({message:"Protected Request"})
}