import { Request, Response, NextFunction } from "express";
import { extractJWT } from "./jwt.auth.helper";
import jwt from "jsonwebtoken";
import { JwtPayLoad } from "../../types/jwt.types";

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	let token: string;
	try {
		token = extractJWT(req);
	} catch (err) {
		if (err instanceof Error) {
			return res.status(401).send({
				status: "fail",
				message: err.message
		});
	}
	return res.status(401).send({
		status: "fail",
		message: "Authorization error"
	});
	}
	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "no secret defined for the access token"
		});
	}
	try {
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as unknown as JwtPayLoad;

		req.token = payload;
	} catch (err) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}
	next();
}
