const tweetRetreiver = require('./tweetRetreiver');
const sources = require('./sources');
const Promise = require('bluebird');
var Database = require('better-sqlite3');
var db = new Database('database.sqlite', {});


const createSourceIfNotExists = function(screenName) {
    let rows = db.prepare('INSERT INTO Tweet(ScreenName) SELECT ? WHERE NOT EXISTS(SELECT 1 FROM Tweet WHERE screenName = ?);').run(screenName, screenName)
    console.log(rows);
}

sources.forEach(source => {
    createSourceIfNotExists(source);
    tweetRetreiver(source).then(tweets => {
        console.log(tweets);
    })
})








