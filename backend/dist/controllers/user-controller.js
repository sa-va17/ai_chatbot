import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("Email already exists. Try logging in instead.");
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            domain: "localhost",
            signed: true
        });
        const token = createToken(user.id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User doesn't exist. Try signing up instead.");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password or email.");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            domain: "localhost",
            signed: true
        });
        const token = createToken(user.id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        //verify user token.
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User doesn't exist or token authentication failed.");
        }
        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Unauthorized action.");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
export const logoutUser = async (req, res, next) => {
    try {
        //verify user token.
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User doesn't exist or token authentication failed.");
        }
        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Unauthorized action.");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            domain: "localhost",
            signed: true
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map