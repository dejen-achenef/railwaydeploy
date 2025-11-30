export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      youtubeVideoId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'youtube_video_id'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Duration in seconds'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        field: 'user_id'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });

    await queryInterface.addIndex('videos', ['category'], {
      name: 'videos_category_idx'
    });

    await queryInterface.addIndex('videos', ['youtube_video_id'], {
      name: 'videos_youtube_video_id_idx'
    });

    await queryInterface.addIndex('videos', ['user_id'], {
      name: 'videos_user_id_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('videos');
  }
};