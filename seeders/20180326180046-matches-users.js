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
      },
      {
        id: 11,
        game_id: 2,
        match_id: 7,
        position: 1,
        home_player_id: 14,
        away_player_id: 17,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 12,
        game_id: 2,
        match_id: 7,
        position: 2,
        home_player_id: 12,
        away_player_id: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 13,
        game_id: 2,
        match_id: 8,
        position: 1,
        home_player_id: 11,
        away_player_id: 19,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 14,
        game_id: 2,
        match_id: 8,
        position: 2,
        home_player_id: 12,
        away_player_id: 16,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 15,
        game_id: 2,
        match_id: 9,
        position: 1,
        home_player_id: 14,
        away_player_id: 19,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 16,
        game_id: 2,
        match_id: 10,
        position: 1,
        home_player_id: 10,
        away_player_id: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 17,
        game_id: 2,
        match_id: 11,
        position: 1,
        home_player_id: 10,
        away_player_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 18,
        game_id: 2,
        match_id: 11,
        position: 2,
        home_player_id: 13,
        away_player_id: 17,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 19,
        game_id: 2,
        match_id: 12,
        position: 1,
        home_player_id: 11,
        away_player_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 20,
        game_id: 2,
        match_id: 12,
        position: 2,
        home_player_id: 13,
        away_player_id: 16,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('matches_users', null, {});
  }
};
