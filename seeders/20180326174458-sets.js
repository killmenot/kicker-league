'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('sets', [
      {
        id: 1,
        game_id: 1,
        match_id: 1,
        position: 1,
        home_score: 5,
        away_score: 1,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        game_id: 1,
        match_id: 1,
        position: 2,
        home_score: 5,
        away_score: 3,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        game_id: 1,
        match_id: 2,
        position: 1,
        home_score: 5,
        away_score: 1,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        game_id: 1,
        match_id: 2,
        position: 2,
        home_score: 5,
        away_score: 2,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        game_id: 1,
        match_id: 3,
        position: 1,
        home_score: 4,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        game_id: 1,
        match_id: 3,
        position: 2,
        home_score: 5,
        away_score: 1,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        game_id: 1,
        match_id: 4,
        position: 1,
        home_score: 5,
        away_score: 2,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        game_id: 1,
        match_id: 4,
        position: 2,
        home_score: 5,
        away_score: 4,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        game_id: 1,
        match_id: 5,
        position: 1,
        home_score: 5,
        away_score: 2,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        game_id: 1,
        match_id: 5,
        position: 2,
        home_score: 5,
        away_score: 3,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 11,
        game_id: 1,
        match_id: 6,
        position: 1,
        home_score: 5,
        away_score: 2,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 12,
        game_id: 1,
        match_id: 6,
        position: 2,
        home_score: 5,
        away_score: 1,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 13,
        game_id: 2,
        match_id: 7,
        position: 1,
        home_score: 1,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 14,
        game_id: 2,
        match_id: 7,
        position: 2,
        home_score: 2,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 15,
        game_id: 2,
        match_id: 8,
        position: 1,
        home_score: 0,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 16,
        game_id: 2,
        match_id: 8,
        position: 2,
        home_score: 0,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 17,
        game_id: 2,
        match_id: 9,
        position: 1,
        home_score: 4,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 18,
        game_id: 2,
        match_id: 9,
        position: 2,
        home_score: 4,
        away_score: 5,
        winner: 'away',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 19,
        game_id: 2,
        match_id: 10,
        position: 1,
        home_score: 5,
        away_score: 4,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 20,
        game_id: 2,
        match_id: 10,
        position: 2,
        home_score: 5,
        away_score: 1,
        winner: 'home',
        walkover: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 21,
        game_id: 2,
        match_id: 11,
        position: 1,
        home_score: 0,
        away_score: 0,
        winner: 'home',
        walkover: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 22,
        game_id: 2,
        match_id: 11,
        position: 2,
        home_score: 0,
        away_score: 0,
        winner: 'home',
        walkover: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 23,
        game_id: 2,
        match_id: 12,
        position: 1,
        home_score: 0,
        away_score: 0,
        winner: 'home',
        walkover: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 24,
        game_id: 2,
        match_id: 12,
        position: 2,
        home_score: 0,
        away_score: 0,
        winner: 'home',
        walkover: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('sets', null, {});
  }
};
