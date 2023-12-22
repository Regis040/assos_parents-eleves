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
            unique: {
                msg: "Le nom est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom doit avoir un nombre de caractères compris entre 10 et 400.",
                    args: [5, 100]
                }
            },
        },
        articlebody: {
            type: DataTypes.STRING,
            allowNull: false,
                validate: {
                     len: {
                         msg: "Le nom doit avoir un nombre de caractères compris entre 10 et 400.",
                        args: [10, 400]
                     }
            },
        },
    }, {
        onDelete: 'CASCADE'
    }
    );
}