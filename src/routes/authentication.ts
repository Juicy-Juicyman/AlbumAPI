import express from "express"

const router = express.Router();


/**
 * Register a new user
 */

router.post("/register");

/**
 * Login a user
 */

router.post("/login");

/**
 * Get a new access-token
 */

router.post("/refresh");



export default router;
