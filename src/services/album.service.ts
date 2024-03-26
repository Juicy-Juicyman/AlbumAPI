import prisma from "../prisma";
import { CreateAlbum, UpdateAlbum } from "../types/album.types";

/**
 * Get all albums
 */

export const getAlbums = async () => {
	return await prisma.album.findMany();
}

/**
 * Get a single album
 */

export const getAlbum = async (userId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: userId,
		},
		include: {
			Photos: true,
		},
	});
}

/**
 * Create a new album
 */

export const createAlbum = async (data: CreateAlbum) => {
	return await prisma.album.create({
		data,
	});
}


/**
 * Update a album
 */

export const updateAlbum = async (userId: number, data: UpdateAlbum) => {
	return prisma.album.update({
		where: {
			id: userId,
		},
		data,
	});
}

/**
 * Add a photo to an album
 */

export const addPhotoToAlbum = async (photoId: number, albumId: number) => {
    return await prisma.album.update({
        where: {
            id: albumId,
        },
        data: {
            Photos: {
                connect: [{ id: photoId }],
            },
        },
    });
};

/**
 * Add multiple photos to an album
 */

export const addMultiplePhotosToAlbum = async (photoIds: number[], albumId: number) => {
    const connections = photoIds.map(id => ({ id }));
    return await prisma.album.update({
        where: {
            id: albumId,
        },
        data: {
            Photos: {
                connect: connections,
            },
        },
    });
};

/**
 * Remove a photo from an album
 */

export const removePhotoFromAlbum = async (photoId: number, albumId: number) => {
    return await prisma.photo.update({
        where: {
            id: photoId,
        },
        data: {
            Album: {
                disconnect: [{ id: albumId }],
            },
        },
    });
};


/**
 * Delete an album
 */

export const deleteAlbum = async (albumId: number) => {
    return await prisma.album.delete({
        where: {
            id: albumId,
        },
    });
};
