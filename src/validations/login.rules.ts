import { body } from "express-validator";

export const loginRules = [
	body("email")
		.trim().isString().withMessage("email has to be of type string").bail()
		.trim().isEmail().withMessage("has to be a valid email"),
	body("password")
		.trim().isString().withMessage("password has to be of type string").bail()
		.trim().isLength({ min: 6 }).withMessage("password has to be atleast 6 chars long"),
];
