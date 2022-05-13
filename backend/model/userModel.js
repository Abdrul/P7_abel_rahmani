module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : {
                msg : 'Le mail est déjà pris.'
            },
            validate: {
                isEmail: {msg: "Choisir un email valide"}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate :{
                isAlpha: true,
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
        }, 
        admin: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};