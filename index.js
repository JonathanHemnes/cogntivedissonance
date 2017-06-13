const tweetRetreiver = require('./tweetRetreiver');
const sources = require('./sources');
const Promise = require('bluebird');
const db =  require('sqlite');

Promise.resolve()
    // First, try connect to the database and update its schema to the latest version 
    .then(() => db.open('./database.sqlite', { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .catch(err => console.error(err.stack))
    .finally(() => {
        sources.forEach(source => {
            tweetRetreiver(source).then(tweets => {
                console.log(tweets);
            })
        })
    })

