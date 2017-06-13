require('dotenv').config()
const Promise = require('bluebird');
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const getReplacedTweets = function (screenName) {
    return client.get('statuses/user_timeline', { screen_name: screenName }).then(results => {
        return setLatestReadTweet(screenName, results[0].id, results)
            .then(getDonaldTrumpRelatedTweets)
            .then(replaceTrumpWithClinton)
            .then(removeUrlsFromTweets);
    })

}

const setLatestReadTweet = function (screenName, id, results) {
    return new Promise((resolve, reject) => {
        resolve(results)
    })
}

const removeUrlsFromTweets = function (tweets) {
    return new Promise((resolve, reject) => {
        resolve(tweets.map(tweet => {
            tweet.text = tweet.text.replace(/https:\/\/t.co\/.+\b/g, '').replace('…', '')
            return tweet;
        }))
    })
}


const getDonaldTrumpRelatedTweets = function (tweets) {
    return new Promise((resolve, reject) => {
        resolve(tweets.filter(result => {
            const parsedText = result.text.toUpperCase();
            return parsedText.includes('TRUMP') || parsedText.includes('DONALD TRUMP');
        }))
    })
}

const replaceTrumpWithClinton = function (tweets) {
    return new Promise((resolve, reject) => {
        resolve(tweets.map(tweet => {
            if (tweet.text.includes('Donald Trump')) {
                tweet.text = tweet.text.replace('Donald Trump', 'Hillary Clinton');
            }
            if (tweet.text.includes('Melania')) {
                tweet.text = tweet.text.replace('Melania', 'Bill');
            }
            if (tweet.text.includes('Trump')) {
                tweet.text = tweet.text.replace('Trump', 'Clinton');
            }
            return tweet;
        }))
    })
}

module.exports = getReplacedTweets;
