/**
 * Resource Controller
 */
import Debug from 'debug';
import { Request, Response } from "express";
import { matchedData } from 'express-validator';
import bcrypt from "bcrypt";
import { createUser, getUserByEmail, getUserById } from '../services/user.service';
import { CreateUser } from '../types/user.types';
import { JwtPayLoad, JwtRefPayLoad } from '../types/jwt.types';
import jwt from "jsonwebtoken";
import { extractJWT } from '../middlewares/auth/jwt.auth.helper';

// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_LAZY_AND_HAVE_NOT_CHANGED_THIS_😛');

/**
 * Register a new user
 */

export const register = async (req: Request, res: Response) => {
	const validatedData = matchedData(req);

	const hashedPass = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);

	const data = {
		...validatedData,
		password: hashedPass,
	} as CreateUser;

	try {
		const user = await createUser(data);

		res.status(201).send({
			status: "success",
			data: {
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
			}
		});
	} catch (err) {
		return res.status(500).send({
			status: "error",
			message: "Something went wrong when trying to create a user in database"
		});
	}
}

/**
 * Login a user
 */

interface LoginReqBody {
	email: string
	password: string
}

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body as LoginReqBody

	const user = await getUserByEmail(email);
		if (!user) {
			return res.status(401).send({
				status: "fail",
				message: "no authorization"
			});
		}
	const result = await bcrypt.compare(password, user.password);
		if (!result) {
			return res.status(401).send({
				status: "fail",
				message: "no authorization"
			});
		}
	const payload: JwtPayLoad = {
		sub: user.id,
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email
	}
	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "no secret for the access token defined"
		});
	}
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
	});
	const refreshPayLoad: JwtRefPayLoad = {
		sub: user.id,
	}
	if (!process.env.REFRESH_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "no secret for the refresh token defined"
		});
	}
	const refreshToken = jwt.sign(refreshPayLoad, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "24h"
	});
	res.send({
		status: "success",
		data: {
			accessToken,
			refreshToken,
		},
	});
}

/**
 * Get a new access-token for user
 */

export const refresh = async (req: Request, res: Response) => {
	let token: string;
	try {
		token = extractJWT(req);
	}	catch (err) {
			if (err instanceof Error) {
				return res.status(401).send({
					status: "fail",
					message: err.message
				});
			}
			return res.status(500).send({
				status: "fail",
				message: "unknown authorization"
			});
		}
	if (!process.env.REFRESH_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "no secret defined for refresh token"
		});
	}
	try {
		const refreshPayload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as unknown as  JwtRefPayLoad;
		const user = await getUserById(refreshPayload.sub);
		if (!user) {
			return res.status(500).send({
				status: "error",
				message: "invalid refresh token"
			});
		}
		const payload: JwtPayLoad = {
			sub: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email
		}
		if (!process.env.ACCESS_TOKEN_SECRET) {
			return res.status(500).send({
				status: "error",
				message: "no secret defined for access token"
			});
		}
		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
		});
		res.send({
			status: "sucess",
			data: {
				accessToken,
			},
		});
	} catch (err) {
		return res.status(401).send({
			status: "fail",
			message: "no entry for you"
		});
	}
}
