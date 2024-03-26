import { body } from "express-validator";
import { getUserByEmail } from "../services/user.service";

export const createUserRules = [

	body("email")
		.isString().withMessage("email has to be of type string").bail()
		.trim().isEmail().withMessage("must be a vaild email").bail()
		.custom(async (v) => {
			const user = await getUserByEmail(v)

			if (user) {
				throw new Error("Email already exists you sneaky you");
			}
		}),

	body("password")
		.isString().withMessage("password has to be of type string").bail()
		.trim().isLength({ min: 6 }).withMessage("password has to be atleast 6 characters long"),

	body("first_name")
		.isString().withMessage("name must be of type string").bail()
		.trim().isLength({ min: 3 }).withMessage("name must be atleast 3 chars long, sorry Bo"),

	body("last_name")
		.isString().withMessage("last name must be of type string").bail()
		.trim().isLength({ min: 3 }).withMessage("last name must be atleast 3 chars long, sorry Elin Ny")
]
