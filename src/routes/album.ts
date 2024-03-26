import express from "express"
import { destroy, index, show, store, update, removeAPhotoFromAlbum, connectPhotoToAlbum, connectPhotosToAlbum } from "../controllers/album.controller";

const router = express.Router();

/**
 * Get all albums
 */

router.get("/", index);

/**
 * Get a single album
 */

router.get("/:albumId", show);

/**
 * Create a new album
 */

router.post("/", store);

/**
 * Update a album
 */

router.patch("/:albumId", update);

/**
 * Add an photo to a album
 */

router.post("/:albumid/photos", connectPhotoToAlbum);

/**
 * Add multiple photos to an album
 */

router.post("/:albumId/photos", connectPhotosToAlbum);

/**
 * Remove a photo from the album (not the photo itself, just the link)
 */

router.delete("/:albumId/photos/:photoId", removeAPhotoFromAlbum);

/**
 * Delete an album
 */

router.delete("/:albumId", destroy);


export default router;
