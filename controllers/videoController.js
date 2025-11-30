import * as videoService from '../services/videoService.js';

export const createVideo = async (req, res) => {
  try {
    const videoData = req.body;
    const userId = req.user.id;

    const video = await videoService.createVideo(videoData, userId);

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    const filters = {};
    if (search) filters.search = search;
    if (category) filters.category = category;

    const videos = await videoService.getAllVideos(filters);

    res.status(200).json({
      success: true,
      message: 'Videos retrieved successfully',
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoService.getVideoById(id);

    res.status(200).json({
      success: true,
      message: 'Video retrieved successfully',
      data: video
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    const video = await videoService.updateVideo(id, updateData, userId);

    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    const statusCode = error.message.includes('Unauthorized') ? 403 : 404;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await videoService.deleteVideo(id, userId);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    const statusCode = error.message.includes('Unauthorized') ? 403 : 404;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};