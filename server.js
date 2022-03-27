const express = require('express');
const app = express();
const port = 3000;
// const fetch = require('node-fetch');
// const fs = require('file-system');
const needle = require('needle');
var Sentiment = require('sentiment');

var sentiment = new Sentiment();


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

const token = `AAAAAAAAAAAAAAAAAAAAAPwtawEAAAAAbSvSJlsXz0F%2Biva6IYGOL9asQ9Q%3D28WwpGpoo8z1PVOZ3pa3IgBqrma2D7hbVk6X5aM7wjVxkRwKEh`;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {

    const params = {
        'query': '#Ukraine -is:retweet',
        'max_results': 100
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`,
            'lang': 'en'
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

app.get("/allTweets", (req, res) => {
    (async ()=> {
        try {
            var tweets = [];
            const response = await getRequest();
            for (const t of response.data) {
                var result = sentiment.analyze(t.text);
                // console.dir(result);
                var sentiment_score = {
                    sentiment_score: result.score
                };
                tweets.push(Object.assign(sentiment_score,t));
            }
            console.log(tweets);
            res.json(tweets);
        } catch (e) {
            console.log(e);
            process.exit(-1);
        }
    })();
    
})

app.listen(port, () => {
	console.log('Listening on *:3000');
})

