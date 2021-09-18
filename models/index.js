// import models
const Users = require("./Users");
const Feeds = require("./Feeds");
const FeedSources = require("./FeedSources");
const Comments = require("./Comments");
const FeedFollowers = require("./FeedFollowers");

Feeds.belongsTo(Users, {
    foreignKey: "user_id",
});

Users.hasMany(Feeds, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

FeedSources.belongsTo(Feeds, {
    foreignKey: "feed_id",
});

Feeds.hasMany(FeedSources, {
    foreignKey: "feed_id",
    onDelete: "CASCADE",
});

Comments.belongsTo(Feeds, {
    foreignKey: "feed_id",
});

Feeds.hasMany(Comments, {
    foreignKey: "feed_id",
    onDelete: "CASCADE",
});

Comments.belongsTo(Users, {
    foreignKey: "user_id",
});

Users.hasMany(Comments, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

FeedFollowers.belongsTo(Feeds, {
    foreignKey: "feed_id",
});

Feeds.hasMany(FeedFollowers, {
    foreignKey: "feed_id",
    onDelete: "CASCADE",
});

FeedFollowers.belongsTo(Users, {
    foreignKey: "user_id",
});

Users.hasMany(FeedFollowers, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

module.exports = {
    Users,
    Feeds,
    FeedSources,
    Comments,
    FeedFollowers,
};
