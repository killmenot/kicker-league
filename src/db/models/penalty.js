'use strict'

export default (sequelize, DataTypes) => {
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

  return Penalty
}

  // game_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: 'Game',
  //     key: 'id'
  //   }
  // },

  // home_player_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: 'User',
  //     key: 'id'
  //   }
  // },

  // away_player_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: 'User',
  //     key: 'id'
  //   }
  // },

