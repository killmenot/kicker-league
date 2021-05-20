'use strict'

import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Game = sequelize.define('Game', {
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY
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
    },
    winner: {
      allowNull: false,
      type: DataTypes.ENUM('home', 'away', 'draw')
    }
  }, {
    tableName: 'games'
  })

  Game.associate = function (models) {
    models.Game.belongsTo(models.Team, {
      as: 'HomeTeam',
      foreignKey: {
        allowNull: false,
        name: 'homeTeamId',
        field: 'home_team_id'
      }
    })

    models.Game.belongsTo(models.Team, {
      as: 'AwayTeam',
      foreignKey: {
        allowNull: false,
        name: 'awayTeamId',
        field: 'away_team_id'
      }
    })
  }

  return Game
};
