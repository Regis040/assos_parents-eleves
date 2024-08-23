const express = require('express')
const router = express.Router()
const { findAllComments, findCommentByPk, createComment, updateComment, deleteComment } = require('../controllers/commentControllers')
const { protect, restrictToOwnUser, restrict } = require('../controllers/authControllers')
const { Comment } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllComments)
    .post(protect, createComment)

router
    .route('/:id')
    .get(findCommentByPk)
    .put(protect, restrict("admin"), updateComment)
    .delete(protect, restrict("admin"), deleteComment)

module.exports = router 