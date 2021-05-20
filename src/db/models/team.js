'use strict'

import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Team = sequelize.define('Team', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    },
    abbreviation: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'teams'
  })

  return Team
};
