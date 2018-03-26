'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('teams', [
      {
        id: 1,
        name: 'Рахима Турдиева',
        location: 'Доберман',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Crab Attack!',
        location: 'Пинта',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('teams', null, {});
  }
};
