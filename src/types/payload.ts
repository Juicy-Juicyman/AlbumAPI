import { User } from "@prisma/client";
import { JwtPayLoad } from "./jwt.types";



declare global {
	namespace Express {
		export interface Request {
			token?: JwtPayLoad
			user?: User
		}
	}
}
