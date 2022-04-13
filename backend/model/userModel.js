module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey: true,
            onDelete: 'CASCADE'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : {
                msg : 'Le nom est déjà pris.'
            },
            validate: {
                isEmail: {msg: "Choisir un email valide"}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                notNull : {msg: "Un mot de passe est requis pour s'inscrire"},
                notEmpty: {msg: "Un mot de passe doit être remplie"}
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // lastname: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // admin : {
        //     type : DataTypes.BOOLEAN,
        //     allowNull: false
        // }
    });
};