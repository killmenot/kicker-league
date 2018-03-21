'use strict'

import express from 'express'
import {gameController, teamController, userController} from '../controllers'

const router = express.Router()

router.get('/teams', teamController.list)
router.post('/teams/create', teamController.create)
router.get('/teams/:id/edit', teamController.edit)
router.get('/teams/:id/delete', teamController.destroy)
router.post('/teams/:id/users/create', userController.create)
router.get('/teams/:id/users/:userId/delete', userController.destroy)
router.get('/games', gameController.list)
router.get('/games/new', gameController.new)
router.post('/games/create', gameController.create)
router.get('/games/:id/delete', gameController.destroy)

export default router
