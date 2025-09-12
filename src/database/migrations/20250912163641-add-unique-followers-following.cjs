'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('followers', {
      fields: ['followersId', 'followingId'],
      type: 'unique',
      name: 'unique_followers_following'
    }, {

    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('followers', 'unique_followers_following');
  }
};
