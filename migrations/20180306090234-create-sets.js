'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sets', {
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
      match_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'matches',
          key: 'id'
        }
      },
      position: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      home_score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      away_score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      winner: {
        allowNull: false,
        type: Sequelize.ENUM('home', 'away')
      },
      walkover: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
  down: (queryInterface) => {
    return queryInterface.dropTable('sets');
  }
};
