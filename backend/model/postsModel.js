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
        },
        canDisplay: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};

