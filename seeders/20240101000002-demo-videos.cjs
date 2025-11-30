export default {
  async up(queryInterface, Sequelize) {
    // Get the first user ID
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users LIMIT 1",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0) {
      return;
    }

    const userId = users[0].id;

    await queryInterface.bulkInsert('videos', [
      {
        title: 'Introduction to Node.js',
        description: 'Learn the basics of Node.js programming',
        youtube_video_id: 'TlB_eWDSMt4',
        category: 'Education',
        duration: 3600,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Express.js Tutorial',
        description: 'Building REST APIs with Express.js',
        youtube_video_id: 'L72fhGm1haE',
        category: 'Education',
        duration: 2400,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Funny Cat Compilation',
        description: 'The funniest cat videos of the year',
        youtube_video_id: 'J---aiyznGQ',
        category: 'Entertainment',
        duration: 600,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('videos', null, {});
  }
};