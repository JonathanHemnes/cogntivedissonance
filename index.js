const tweetRetreiver = require('./tweetRetreiver');

tweetRetreiver().then(tweets => {
    console.log(tweets);
})
