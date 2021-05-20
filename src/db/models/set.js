'use strict'

import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const _Set = sequelize.define('Set', {
    homeScore: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'home_score'
    },
    awayScore: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'away_score'
    },
    position: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    winner: {
      allowNull: false,
      type: DataTypes.ENUM('home', 'away', 'draw')
    },
    walkover: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'sets'
  })

  _Set.associate = function (models) {
    _Set.belongsTo(models.Match, {
      as: 'Match',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'matchId',
        field: 'match_id'
      }
    })

    _Set.belongsTo(models.Game, {
      as: 'Game',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'gameId',
        field: 'game_id'
      }
    })
  }

  return _Set
}
