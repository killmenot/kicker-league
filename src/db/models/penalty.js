'use strict'

import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Penalty = sequelize.define('Penalty', {
    position: {
      allowNull: false,
      type: DataTypes.STRING
    },
    homeScore: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'home_score'
    },
    awayScore: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'away_score'
    }
  }, {
    tableName: 'penalties'
  })

  Penalty.associate = function (models) {
    Penalty.belongsTo(models.Game, {
      as: 'Game',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'gameId',
        field: 'game_id'
      }
    })

    Penalty.belongsTo(models.User, {
      as: 'HomePlayer',
      foreignKey: {
        name: 'homePlayerId',
        field: 'home_player_id'
      }
    })

    Penalty.belongsTo(models.User, {
      as: 'AwayPlayer',
      foreignKey: {
        name: 'awayPlayerId',
        field: 'away_player_id'
      }
    })
  }

  return Penalty
}
