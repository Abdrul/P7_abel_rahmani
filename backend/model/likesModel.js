module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Likes', {
        id: {
            type: DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey: true,
        }
    })
}