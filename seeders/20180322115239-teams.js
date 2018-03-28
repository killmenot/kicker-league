'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('teams', [
      {
        id: 1,
        name: 'Рахима Турдиева',
        location: 'Доберман',
        abbreviation: 'РT',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Crab Attack!',
        location: 'Пинта',
        abbreviation: 'CA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Зерно тебе за воротник',
        location: 'Доберман',
        abbreviation: 'ЗЕР',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Холодный Душ',
        location: 'Пинта',
        abbreviation: 'ХД',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Sweet Revolver',
        location: 'Пинта',
        abbreviation: 'SR',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('teams', null, {});
  }
};
