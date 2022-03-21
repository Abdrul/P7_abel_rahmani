module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Posts', {
        id: {
            type: DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING
        },
        imageUrl: {
            type: DataTypes.STRING,
            // validate: {
            //     isUrl: {msg: "Utilisez une URL pour l'image"}
            // }
        }
    });
};

