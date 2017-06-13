const tweetRetreiver = require('./tweetRetreiver');
const sources = require('./sources');
const Promise = require('bluebird');

sources.forEach(source => {
    tweetRetreiver(source).then(tweets => {
        console.log(tweets);
    })
})




