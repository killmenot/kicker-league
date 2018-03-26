'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('matches_users', [
      {
        id: 1,
        game_id: 1,
        match_id: 1,
        position: 1,
        home_player_id: 1,
        away_player_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        game_id: 1,
        match_id: 1,
        position: 2,
        home_player_id: 5,
        away_player_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        game_id: 1,
        match_id: 2,
        position: 1,
        home_player_id: 4,
        away_player_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        game_id: 1,
        match_id: 2,
        position: 2,
        home_player_id: 7,
        away_player_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        game_id: 1,
        match_id: 3,
        position: 1,
        home_player_id: 2,
        away_player_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        game_id: 1,
        match_id: 4,
        position: 1,
        home_player_id: 1,
        away_player_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        game_id: 1,
        match_id: 5,
        position: 1,
        home_player_id: 2,
        away_player_id: 13,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        game_id: 1,
        match_id: 5,
        position: 2,
        home_player_id: 7,
        away_player_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        game_id: 1,
        match_id: 6,
        position: 1,
        home_player_id: 4,
        away_player_id: 13,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        game_id: 1,
        match_id: 6,
        position: 2,
        home_player_id: 5,
        away_player_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('matches_users', null, {});
  }
};
