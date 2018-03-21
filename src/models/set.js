'use strict'

export default (sequelize, DataTypes) => {
  const _Set = sequelize.define('set', {
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
  }

  return _Set
}
