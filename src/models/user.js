'use strict'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'last_name'
    }
  }, {
    getterMethods: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    }
  })

  User.associate = function (models) {
    models.User.belongsTo(models.Team, {
      foreignKey: {
        allowNull: false,
        name: 'teamId',
        field: 'team_id'
      }
    });
  };

  return User
}
