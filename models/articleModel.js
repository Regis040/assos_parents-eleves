module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Article', {
       
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