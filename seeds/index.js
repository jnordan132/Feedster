const sequelize = require("../config/connection");
const {
    Users,
    Feeds,
    FeedSources,
    FeedFollowers,
    Comments,
} = require("../models/");
const usersData = require("./users-seeds.json");
const feedsData = require("./feeds-seeds.json");
const feedSourcesData = require("./feedsources-seeds.json");
const feedFollowersData = require("./feedfollowers-seeds.json");
const commentsData = require("./comments-seeds.json");

//create tables and seed with test data
const seedDatabase = async ()  => {
    
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SUCCESSFULLY CHECKED AND DROPPED TABLES IF THEY PREVIOUSLY EXISTED TO AVOID CONFLICTS PRIOR TO SEEDING / SYNCING DATA-----\n')
    await Users.bulkCreate(usersData, {
        individualHooks: false,
        returning: true,
    });
    console.log('\n----- USER DATA SUCCESSFULLY SYNCED -----\n');

    await Feeds.bulkCreate(feedsData, {
        individualHooks: false,
        returning: true,
    });
    console.log('\n----- FEED DATA SUCCESSFULLY SYNCED -----\n');

    await FeedSources.bulkCreate(feedSourcesData, {
        individualHooks: false,
        returning: true,
    });
    console.log('\n----- FEED SOURCES SUCCESSFULLY SYNCED -----\n');

    await FeedFollowers.bulkCreate(feedFollowersData, {
        individualHooks: false,
        returning: true,
    });
    console.log('\n----- FEED FOLLOWERS SUCCESSFULLY SYNCED -----\n');

    await Comments.bulkCreate(commentsData, {
        individualHooks: false,
        returning: true,
    });
    console.log('\n----- COMMENTS DATA SUCCESSFULLY SYNCED -----\n');
    console.log('\n----- DATABASE CONNECTION NOW INITIATES A SUCCESSFUL EXIT -----\n');
    process.exit(0);
    

};

//call the function
seedDatabase();
