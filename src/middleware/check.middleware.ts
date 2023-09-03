import { NextFunction, Request, Response } from "express";

export const checkMinimumCharacters = (req: Request, res: Response, next: NextFunction) => {
    console.log('check middleware');
    const {name} = req.body;

    if (name.length < 4) {
        res.status(400).send({error: 'Name must be at least 4 characters long'});
        return;
    }
    next()
}