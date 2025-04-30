
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from './constants.js';

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload,
        process.env.JWT_TOKEN,
        { expiresIn });

    return token
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not receieved." })
    }

    return new Promise<void>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN, (err, success) => {
            if (err) {
                res.status(401).json({ message: "Token expired." })
                reject(err.message);
            } else {
                console.log("Token Verified.")
                resolve()
                res.locals.jwtData = success;
                next();
            }
        });
    }).catch((err) => {
        console.error("Promise rejected", err.message)
    });
}