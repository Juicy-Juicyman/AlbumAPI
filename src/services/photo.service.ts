import prisma from "../prisma";
import { CreatePhoto, UpdatePhoto } from "../types/photo.types";

/**
 * Get all photos
 */

export const getPhotos = async () => {
	return await prisma.photo.findMany();
}

/**
 * Get a single photo
 */

export const getPhoto = async (photoId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: {
			id: photoId,
		},
		include: {
			Album: true,
		},
	});
}

/**
 * Create a new photo
 */

export const createPhoto = async (data: CreatePhoto) => {
	return await prisma.photo.create({
		data,
	});
}

/**
 * Update a Photo
 */

export const updatePhoto= async (photoId: number, data: UpdatePhoto) => {
	return prisma.photo.update({
		where: {
			id: photoId,
		},
		data,
	});
}

/**
 * Delete a photo
 */
export const deletePhoto = async (photoId: number) => {
    return await prisma.photo.delete({
        where: {
            id: photoId,
        },
    });
};
