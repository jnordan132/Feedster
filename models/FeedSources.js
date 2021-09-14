const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FeedSources extends Model {}

FeedSources.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        feed_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "feeds",
                key: "id",
            },
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "feed_sources",
    }
);

module.exports = FeedSources;
