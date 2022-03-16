module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Posts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING
        }
    });
};

