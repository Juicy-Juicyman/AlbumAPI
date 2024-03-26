import express from "express"

const router = express.Router();

/**
 * Get the user's profile
 */

router.get("/profile");

/**
 * Update the user's profile
 */

router.patch("/profile");

export default router;
