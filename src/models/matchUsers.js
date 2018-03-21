'use strict';

export default (sequelize, DataTypes) => {
  const MatchUsers = sequelize.define('matchUsers', {
    position: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'matches_users',
  })

  MatchUsers.associate = function (models) {
    MatchUsers.belongsTo(models.Match, {
      as: 'Match',
      foreignKey: {
        allowNull: false,
        name: 'matchId',
        field: 'match_id'
      }
    })

    MatchUsers.belongsTo(models.User, {
      as: 'HomePlayer',
      foreignKey: {
        name: 'homePlayerId',
        field: 'home_player_id'
      }
    })

    MatchUsers.belongsTo(models.User, {
      as: 'AwayPlayer',
      foreignKey: {
        name: 'awayPlayerId',
        field: 'away_player_id'
      }
    })
  }

  return MatchUsers
}
