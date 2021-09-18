const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FeedFollowers extends Model {}

FeedFollowers.init(
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
        user_following_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        user_created_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "feed_followers",
    }
);

module.exports = FeedFollowers;
