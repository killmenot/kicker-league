'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'games',
          key: 'id'
        }
      },
      position: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('single', 'double')
      },
      winner: {
        allowNull: false,
        type: Sequelize.ENUM('home', 'away', 'draw')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('matches');
  }
};
