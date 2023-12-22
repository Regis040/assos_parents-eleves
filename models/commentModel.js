module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },       
    })
}