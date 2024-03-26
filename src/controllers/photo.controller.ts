/**
 * Resource Controller
 */
import Debug from 'debug';
import { Request, Response } from "express";
import { createPhoto, deletePhoto, getPhoto, getPhotos, updatePhoto } from '../services/photo.service';
import { matchedData } from 'express-validator';
import { CreatePhoto, UpdatePhoto } from '../types/photo.types';

// Create a new debug instance
const debug = Debug('prisma-boilerplate:I_AM_NOT_LAZY_AND_DID_IN_FACT_CHANGED_THIS_:)');


/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {
	try {
		const photos = await getPhotos();
		res.send({ status: "success", data: photos });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong with the database" });
	}
}

/**
 * Get a photo
 */
export const show = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);

	try {
		const photo = await getPhoto(photoId);
		res.send({ status: "success", data: photo });

	} catch (err) {
		if (err) {
			res.status(404).send({ status: "error", message: "Album Not Found" });
		} else {
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}

	}
}

/**
 * Create a photo
 */
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData(req) as CreatePhoto;

	try {
		const photo = await createPhoto(validatedData);
		res.status(201).send({ status: "success", data: photo });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when trying to create a photo" });
	}
}

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);

	const validatedData = matchedData(req) as UpdatePhoto;

	try {
		const photo = await updatePhoto(photoId, validatedData);
		res.send({ status: "success", data: photo });

	} catch (err) {
		if (err) {
			console.log(err);
			res.status(404).send({ status: "error", message: "Photo Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when trying to update a photo" });
		}
	}
}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);

	try {
		await deletePhoto(photoId);
		res.send({ status: "success", data: {} });

	} catch (err) {
		if (err) {
			console.log(err);
			res.status(404).send({ status: "error", message: "Photo Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Could not find the photo you are trying to delete" });
		}
	}
}
