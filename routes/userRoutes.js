const express = require('express')
const router = express.Router()


router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router