'use strict'

export default (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })

  return Team
};
