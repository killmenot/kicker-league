'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('matches', [
      {
        id: 1,
        game_id: 1,
        position: 1,
        type: 'double',
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        game_id: 1,
        position: 2,
        type: 'double',
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        game_id: 1,
        position: 3,
        type: 'single',
        winner: 'draw',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        game_id: 1,
        position: 4,
        type: 'single',
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        game_id: 1,
        position: 5,
        type: 'double',
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        game_id: 1,
        position: 6,
        type: 'double',
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('matches', null, {});
  }
};
