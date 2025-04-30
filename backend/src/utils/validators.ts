import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(422).json({ errors: errors.array() })
    }
}

export const loginValidator = [
    body("email").trim().notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please provide an email."),

    body("password").trim().isLength({ min: 6 }).withMessage("Password needs to be at least 6 characters.")
]

export const signUpValidator = [
    body("name").trim()
        .notEmpty()
        .withMessage("Name is a required field."),
    ...loginValidator
]

export const chatValidator = [
    body("message").trim()
        .notEmpty()
        .withMessage("Message is a required field."),

]
