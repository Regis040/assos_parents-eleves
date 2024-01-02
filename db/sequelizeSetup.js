
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const ArticleModel = require(`../models/articleModel`)
const commentModel = require(`../models/commentModel`)
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const Users = require('./users')
const Articles = require(`./articles`)


const sequelize = new Sequelize(
    'assos_parents-eleves',
     'root', 
     '', 
     {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Article = ArticleModel(sequelize, DataTypes)
const Comment = commentModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Article)
Article.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Article.hasMany(Comment)
Comment.belongsTo(Article)


const setUsers = (User) => {
    return Promise.all(Users.map(user => {
        return bcrypt.hash(user.password, 10)
            .then(hashResult => {
                return User.create({ ...user, password: hashResult })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    }))
}
const setRoles = (Role) => {
    return Promise.all([Role.create({ label: "superadmin" }), Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}
const setArticles = (Article) => {
    return Promise.all(Articles.map((element) => {
        const newArticle = { ...element, id: null }
        return Article.create(newArticle)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}

sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setArticles(Article)
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { User, Role, Article, Comment, sequelize }