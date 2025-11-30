import db from '../models/index.js';
import { Op } from 'sequelize';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { User, Video } = db;

export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Video,
        as: 'videos',
        attributes: ['id', 'title', 'category']
      }
    ]
  });

  return users;
};

export const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Video,
        as: 'videos',
        attributes: ['id', 'title', 'category', 'duration']
      }
    ]
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Check if email is being updated and if it's already taken
  if (updateData.email && updateData.email !== user.email) {
    const existingUser = await User.findOne({ where: { email: updateData.email } });
    if (existingUser) {
      throw new Error('Email is already in use');
    }
  }

  await user.update(updateData);
  
  return user.toJSON();
};

export const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Delete avatar file if it exists
  if (user.avatar) {
    const avatarPath = path.join(__dirname, '../uploads/avatars', path.basename(user.avatar));
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }
  }

  await user.destroy();
  
  return { message: 'User deleted successfully' };
};

export const updateAvatar = async (userId, avatarPath) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Delete old avatar if it exists
  if (user.avatar) {
    const oldAvatarPath = path.join(__dirname, '../uploads/avatars', path.basename(user.avatar));
    if (fs.existsSync(oldAvatarPath)) {
      fs.unlinkSync(oldAvatarPath);
    }
  }

  // Update user with new avatar path
  user.avatar = avatarPath;
  await user.save();

  return user.toJSON();
};