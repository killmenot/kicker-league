'use strict'

import express from 'express'
import teamController from './teamController'

const router = express.Router()

router.get('/teams/:id/users', teamController.getUsersByTeamId)

export default router
