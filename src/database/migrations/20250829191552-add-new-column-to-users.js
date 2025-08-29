'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'bio', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('users', 'bio');
}
