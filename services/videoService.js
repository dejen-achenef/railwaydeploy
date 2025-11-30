import db from '../models/index.js';
import { Op } from 'sequelize';

const { Video, User } = db;

export const createVideo = async (videoData, userId) => {
  const video = await Video.create({
    ...videoData,
    userId
  });

  return await Video.findByPk(video.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar']
      }
    ]
  });
};

export const getAllVideos = async (filters = {}) => {
  const { search, category } = filters;
  
  const where = {};

  // Search filter
  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ];
  }

  // Category filter
  if (category) {
    where.category = category;
  }

  const videos = await Video.findAll({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return videos;
};

export const getVideoById = async (videoId) => {
  const video = await Video.findByPk(videoId, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar']
      }
    ]
  });

  if (!video) {
    throw new Error('Video not found');
  }

  return video;
};

export const updateVideo = async (videoId, updateData, userId) => {
  const video = await Video.findByPk(videoId);

  if (!video) {
    throw new Error('Video not found');
  }

  // Check if user owns the video
  if (video.userId !== userId) {
    throw new Error('Unauthorized. You can only update your own videos.');
  }

  await video.update(updateData);

  return await Video.findByPk(video.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar']
      }
    ]
  });
};

export const deleteVideo = async (videoId, userId) => {
  const video = await Video.findByPk(videoId);

  if (!video) {
    throw new Error('Video not found');
  }

  // Check if user owns the video
  if (video.userId !== userId) {
    throw new Error('Unauthorized. You can only delete your own videos.');
  }

  await video.destroy();

  return { message: 'Video deleted successfully' };
};