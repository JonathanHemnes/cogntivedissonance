const tweetRetreiver = require('./tweetRetreiver');
const sources = require('./sources');
const Promise = require('bluebird');
var Database = require('better-sqlite3');
var db = new Database('database.sqlite', {});


const createSourceIfNotExists = function (screenName) {
    db.prepare('INSERT INTO Tweet(ScreenName) SELECT ? WHERE NOT EXISTS(SELECT 1 FROM Tweet WHERE screenName = ?);').run(screenName, screenName)
}

setTimeout(() => {
    sources.forEach(source => {
        console.log(`Fetching tweets for ${source}`)
        createSourceIfNotExists(source);
        tweetRetreiver.getReplacedTweets(source).then(tweets => {
            return Promise.resolve(tweets.map(tweet => {
                tweet.text = `@${source} what if ${tweet.text}?`
                console.log(tweet)
            }))
        }).then(tweets => {
            tweetRetreiver.sendTweets(tweets);
        })
    })
}, 1000 * 30)









