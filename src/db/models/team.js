'use strict'

export default (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'teams'
  })

  return Team
};
