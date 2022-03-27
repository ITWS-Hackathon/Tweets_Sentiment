async function getTweets() {
    const response = await fetch(`/allTweets`);
    const data = await response.json();
    return data;
}


$(document).ready(function() {
    (async ()=> {
        const tweets = await getTweets();
        console.log(tweets);
        var negative = 0;
        var neutral = 0;
        var postive = 0;

        for (const t of tweets) {
            if (t.sentiment_score > 0) {
                postive++;
            } else if (t.sentiment_score < 0) {
                negative++;
            } else {
                neutral++;
            }
            $("#tweets").append(`<p>${t.text}</p>`);
        }
        $('#data').append(`<h1>Tweets collected: ${tweets.length}</h1>`);
        
        const percentage_neg = negative/tweets.length;
        const percentage_pos = postive/tweets.length;
        const percentage_neu = neutral/tweets.length;

        console.log(percentage_neu, percentage_neg, percentage_pos);
    })();
    
})