import express from 'express';
const router = express.Router();
import * as videoController from '../controllers/videoController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

// POST /videos - Create a new video (protected)
router.post('/', authenticate, validate(schemas.createVideo), videoController.createVideo);

// GET /videos - Get all videos with optional filters (search, category)
router.get('/', videoController.getAllVideos);

// GET /videos/:id - Get video by ID
router.get('/:id', videoController.getVideoById);

// PUT /videos/:id - Update video (protected)
router.put('/:id', authenticate, validate(schemas.createVideo), videoController.updateVideo);

// DELETE /videos/:id - Delete video (protected)
router.delete('/:id', authenticate, videoController.deleteVideo);

export default router;
