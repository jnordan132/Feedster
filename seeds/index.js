const sequelize = require("../config/connection");
const {
    Test,
    Users,
    Feeds,
    FeedSources,
    FeedFollowers,
    Comments,
} = require("../models/");
const testData = require("./test-seeds.json");
const usersData = require("./users-seeds.json");
const feedsData = require("./feeds-seeds.json");
const feedSourcesData = require("./feedsources-seeds.json");
const feedFollowersData = require("./feedfollowers-seeds.json");
const commentsData = require("./comments-seeds.json");

//create tables and seed with test data
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Test.bulkCreate(testData, {
        individualHooks: true,
        returning: true,
    });

    await Users.bulkCreate(usersData, {
        individualHooks: false,
        returning: true,
    });

    await Feeds.bulkCreate(feedsData, {
        individualHooks: false,
        returning: true,
    });

    await FeedSources.bulkCreate(feedSourcesData, {
        individualHooks: false,
        returning: true,
    });

    await FeedFollowers.bulkCreate(feedFollowersData, {
        individualHooks: false,
        returning: true,
    });

    await Comments.bulkCreate(commentsData, {
        individualHooks: false,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
