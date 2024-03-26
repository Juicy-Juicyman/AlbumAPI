import express from "express"
import { show, destroy, index, store, update } from "../controllers/photo.controller";
import { createPhotoRules } from "../validations/photo.rules";
import validateRequest from "../validations/val_req";


const router = express.Router();

/**
 * Get all photos
 */

router.get("/", index);

/**
 * Get a single photo
 */

router.get("/:photoId", show);

/**
 * Create a new photo
 */

router.post("/", createPhotoRules, validateRequest, store);

/**
 * Update a photo
 */

router.patch("/:photoId", update);

/**
 * Delete a photo
 */

router.delete("/:photoId", destroy);

export default router;
