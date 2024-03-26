import { body } from "express-validator";

export const createPhotoRules = [
	body("title")
		.isString().withMessage("title must be of type string").bail()
		.isLength({ min: 3 }).withMessage("title must be atleast 3 chars long"),

	body("url")
		.isString().withMessage("url must be of type string").bail()
		.isURL().withMessage("url must be a valid URL"),

	body("comment")
		.isString().withMessage("comment must be of type string").bail()
		.isLength({ min: 3 }).withMessage("comment needs to be atleast 3 chars long")

]
