import prisma from "../prisma";
import { CreateUser, UpdateUser } from "../types/user.types";

/**
 * Create a new user
 */

export const createUser = async (data: CreateUser) => {
	return await prisma.user.create({
		data,
	});
}

/**
 * Find user by email for vaildation
 */

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}

/**
 * Find a user by their id
 */

export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}




