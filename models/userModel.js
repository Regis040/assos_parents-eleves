module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        name : {
            type: DataTypes.STRING,
            allowNull: false,                     
        },
        firstname : {
            type: DataTypes.STRING,
            allowNull: false,                     
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom d'utilisateur est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 4 et 40.",
                    args: [4, 40]
                }
            },
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            validate : {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender_kid:{
            type: DataTypes.ENUM('fille', 'garcon'),
            allowNull: false
        },
        firstname_kid:{
            type:DataTypes.STRING,
            allowNull: false
        },
        etablishment: {
            type: DataTypes.ENUM('école Meyrie', 'école Petit prince', 'collége Jean-Mermoz', 'Lycée gaspard Proust'),
            allowNull: false 
        },
        school_class:{
            type:DataTypes.STRING,
            allowNull: false
        }
    }, {
        onDelete: 'CASCADE',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    }
    );
}