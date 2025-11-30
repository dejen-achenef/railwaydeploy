import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController.js";
import { validate, schemas } from "../middleware/validation.js";

// POST /auth/register - Register a new user
router.post("/register", validate(schemas.register), authController.register);

// POST /auth/login - Login user
router.post("/login", validate(schemas.login), authController.login);

export default router;
