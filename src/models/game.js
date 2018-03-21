'use strict'

export default (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
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
    },
    walkover: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
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
