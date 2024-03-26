/**
 * Resource Controller
 */
import Debug from 'debug';
import { Request, Response } from "express";
import { addMultiplePhotosToAlbum, addPhotoToAlbum, createAlbum, deleteAlbum, getAlbum, getAlbums, removePhotoFromAlbum, updateAlbum } from '../services/album.service';
import { CreateAlbum, UpdateAlbum } from '../types/album.types';
import { matchedData } from 'express-validator';

// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_NOT_LAZY_AND_DID_IN_FACT_CHANGED_THIS_:)');

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {
	try {
		const albums = await getAlbums();
		res.send({ status: "success", data: albums });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong with the database" });
	}
}

/**
 * Get an album
 */
export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);

	try {
		const album = await getAlbum(albumId);
		res.send({ status: "success", data: album });

	} catch (err) {
		if (err) {
			debug("Album with ID %d could not be found: %O", albumId);
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
			debug("Error when looking for album with ID %d: %O", albumId);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}

	}
}

/**
 * Create an album
 */
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData(req) as CreateAlbum;

	try {
		const album = await createAlbum(validatedData);
		res.status(201).send({ status: "success", data: album });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when trying to create an album" });
	}
}

/**
 * Update a album
 */
export const update = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);

	const validatedData = matchedData(req) as UpdateAlbum;

	try {
		const album = await updateAlbum(albumId, validatedData);
		res.send({ status: "success", data: album });

	} catch (err) {
		if (err) {
			console.log(err);
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when trying to update an album" });
		}
	}
}

/**
 * Delete a album
 */
export const destroy = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);

	try {
		await deleteAlbum(albumId);
		res.send({ status: "success", data: {} });

	} catch (err) {
		if (err) {
			console.log(err);
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Could not find the album you are trying to delete" });
		}
	}
}

/**
 * Add a photo to an album
 */
export const connectPhotoToAlbum = async (req: Request, res: Response) => {

    const albumId = Number(req.params.albumId);
    const photoId = Number(req.body.photoId);

    try {
        const updatedAlbum = await addPhotoToAlbum(photoId, albumId);
        res.send({ status: "success", data: updatedAlbum });
    } catch (err) {

        if (err) {
            res.status(404).send({ status: "error", message: "Album or Photo Not Found" });
        } else {
            res.status(500).send({ status: "error", message: "Something went wrong when adding the photo to the album" });
        }
    }
};


/**
 * Add multiple photos to an album
 */
export const connectPhotosToAlbum = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);
    const photoIds = req.body.photoIds.map(Number);

    try {
        const updatedAlbum = await addMultiplePhotosToAlbum(photoIds, albumId);
        res.send({ status: "success", data: updatedAlbum });
    } catch (err) {

        if (err) {
            res.status(404).send({ status: "error", message: "Album or one of the Photos Not Found" });
        } else {
            res.status(500).send({ status: "error", message: "Something went wrong when adding photos to the album" });
        }
    }
};


/**
 * Remove a photo from an album
 */
export const removeAPhotoFromAlbum = async (req: Request, res: Response) => {
    const albumId = Number(req.params.albumId);
    const photoId = Number(req.body.photoId);

    try {
        await removePhotoFromAlbum(photoId, albumId);
        res.send({ status: "success", message: "Photo removed from the album successfully." });
    } catch (err) {

        if (err) {
            res.status(404).send({ status: "error", message: "Album or Photo Not Found" });
        } else {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }
};

