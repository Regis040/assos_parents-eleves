// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Article', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        articletitle: {
            type: DataTypes.STRING,
            allowNull: false,          
        },
        articlebody: {
            type: DataTypes.STRING,
            allowNull: false,             
        },
    }, {
        onDelete: 'CASCADE'
    }
    );
}