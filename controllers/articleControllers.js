const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const {  User, Article, Comment, sequelize } = require('../db/sequelizeSetup')


const findAllArticles = (req, res) => {    
    Article.findAll({ include: [Comment, User] }) 
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}


const findArticleByPk = (req, res) => {
    Article.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un article a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun article n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createArticle = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }
            const newArticle = { ...req.body, UserId: user.id }

            Article.create(newArticle)
                .then((article) => {
                    res.status(201).json({ message: 'Larticle a bien été créé', data: article })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `L'article n'a pas pu être créé`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateArticle = (req, res) => {
    Article.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'Larticle a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun article à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteArticle = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Article.findByPk(req.params.id)
        .then((result) => {
            // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `Le article a bien été supprimé.`, data: result })
                    })
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun article trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllArticles, findArticleByPk, createArticle, updateArticle, deleteArticle }