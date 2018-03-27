'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('games', [
      {
        id: 1,
        date: '18-03-2018',
        home_team_id: 2,
        home_score: 5,
        away_team_id: 1,
        away_score: 0,
        winner: 'home',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('games', null, {});
  }
};
