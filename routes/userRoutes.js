import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import uploadAvatar from '../middleware/upload.js';

// All user routes are protected
router.use(authenticate);

// GET /users - Get all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// PUT /users/:id - Update user
router.put('/:id', validate(schemas.updateUser), userController.updateUser);

// DELETE /users/:id - Delete user
router.delete('/:id', userController.deleteUser);

// POST /users/:id/avatar - Upload user avatar
router.post('/:id/avatar', uploadAvatar, userController.uploadAvatar);

export default router;
