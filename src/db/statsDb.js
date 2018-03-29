'use strict'

import db from './models'
import {logger} from '../core'

export default {

  getMatchesStats: async () => {
    logger.info('db/statsDb|getMatchesStats')

    const sql = `
      SELECT DISTINCT
        mu.home_player_id AS homePlayerId,
        mu.away_player_id AS awayPlayerId,
        m.winner,
        m.type
      FROM matches_users AS mu
      INNER JOIN matches AS m ON mu.match_id = m.id
      INNER JOIN sets AS s ON s.match_id = m.id
      WHERE s.walkover = 0`
    const options = {
      type: db.sequelize.QueryTypes.SELECT
    }

    return await db.sequelize.query(sql, options)
  },

  getMatchesCountByPlayers: async () => {
    logger.info('db/statsDb|getMatchesCountByPlayers')

    const sql = `
      SELECT
        u.id AS playerId,
        COUNT(stats.match_id) AS count
      FROM users AS u

      LEFT OUTER JOIN (
        SELECT DISTINCT
          s.match_id,
          mu.home_player_id AS player_id
        FROM matches_users AS mu
        LEFT OUTER JOIN sets AS s
        ON s.match_id = mu.match_id
        WHERE s.walkover = 0

        UNION

        SELECT DISTINCT
          s.match_id,
          mu.away_player_id AS player_id
        FROM matches_users AS mu
        LEFT JOIN sets AS s
        ON s.match_id = mu.match_id
        WHERE s.walkover = 0
      ) AS stats
      ON u.id = stats.player_id
      GROUP BY u.id`
    const options = {
      type: db.sequelize.QueryTypes.SELECT
    }

    return await db.sequelize.query(sql, options)
  }
}
