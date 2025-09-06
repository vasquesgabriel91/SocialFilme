'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('communities', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,           
      references: {
        model: 'users',          
        key: 'id'                 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',        
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('communities', 'creator_id');
  }
};
