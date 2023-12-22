const express = require('express')
const router = express.Router()
const { findAllArticles, findArticleByPk, createArticle, updateArticle, deleteArticle} = require('../controllers/articleControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')
const { Article } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllArticles)
    .post(protect, createArticle)


router
    .route('/:id')
    .get(findArticleByPk)
    .put(protect, restrictToOwnUser(Article), updateArticle)
    .delete(protect, restrictToOwnUser(Article), deleteArticle)

module.exports = router