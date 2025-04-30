import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn });
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not receieved." });
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN, (err, success) => {
            if (err) {
                res.status(401).json({ message: "Token expired." });
                reject(err.message);
            }
            else {
                console.log("Token Verified.");
                resolve();
                res.locals.jwtData = success;
                next();
            }
        });
    }).catch((err) => {
        console.error("Promise rejected", err.message);
    });
};
//# sourceMappingURL=token-manager.js.map