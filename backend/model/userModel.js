module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : {
                msg : 'Le nom est déjà pris.'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING
        }
    });
};