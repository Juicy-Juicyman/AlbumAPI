/**
 * Main application routes
 */
import express from "express";
import albumRouter from "./album"
import photoRouter from "./photo"
import validateRequest from "../validations/val_req";
import { login, refresh, register } from "../controllers/user.controller";
import { createUserRules } from "../validations/user.rules";
import { loginRules } from "../validations/login.rules";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "But first, let me take a selfie 🤳 https://www.youtube.com/watch?v=kdemFfbS5H0",
	});
});

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resourceRouter);

router.use("/albums", albumRouter);

router.use("/photos", photoRouter);

router.post("/login", loginRules, validateRequest, login);

router.post("/refresh", refresh);

router.post("/register", createUserRules, validateRequest, register);

router.use("/profile");

//router.use("/profile");


/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});



export default router;
