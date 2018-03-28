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
      },
      {
        id: 2,
        date: '04-03-2018',
        home_team_id: 1,
        home_score: 3,
        away_team_id: 4,
        away_score: 3,
        winner: 'awd',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('games', null, {});
  }
};
