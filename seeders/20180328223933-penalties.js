'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('penalties', [
      {
        id: 1,
        game_id: 2,
        position: 1,
        home_player_id: 10,
        home_score: 0,
        away_player_id: 15,
        away_score: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        game_id: 2,
        position: 2,
        home_player_id: 13,
        home_score: 0,
        away_player_id: 17,
        away_score: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        game_id: 2,
        position: 3,
        home_player_id: 12,
        home_score: 0,
        away_player_id: 19,
        away_score: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        game_id: 2,
        position: 4,
        home_player_id: 11,
        home_score: 0,
        away_player_id: 16,
        away_score: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('penalties', null, {});
  }
};
