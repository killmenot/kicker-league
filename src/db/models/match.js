'use strict'

import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Match = sequelize.define('Match', {
    position: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('single', 'double')
    },
    winner: {
      allowNull: false,
      type: DataTypes.ENUM('home', 'away', 'draw')
    }
  }, {
    tableName: 'matches'
  })

  Match.associate = function (models) {
    Match.belongsTo(models.Game, {
      as: 'Game',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'gameId',
        field: 'game_id'
      }
    })

    Match.belongsToMany(models.User, {
      as: 'HomePlayers',
      through: 'matches_users',
      foreignKey: {
        name: 'matchId',
        field: 'match_id'
      },
      otherKey: {
        name: 'homePlayerId',
        field: 'home_player_id'
      }
    })

    Match.belongsToMany(models.User, {
      as: 'AwayPlayers',
      through: 'match_users',
      foreignKey: {
        name: 'matchId',
        field: 'match_id'
      },
      otherKey: {
        name: 'awayPlayerId',
        field: 'away_player_id'
      }
    })

    // Match.belongsToMany(User, {
    //   as: 'HomeUsers',
    //   through: {
    //     model: models.MatchUsers
    //   },
    //   foreignKey: 'match_id',
    //   otherKey: 'home_user_id'
    // });

    // Match.belongsToMany(User, {
    //   as: 'AwayUsers',
    //   through: {
    //     model: models.MatchUsers
    //   },
    //   foreignKey: 'match_id',
    //   otherKey: 'away_user_id'
    // });
  }

  return Match
}


