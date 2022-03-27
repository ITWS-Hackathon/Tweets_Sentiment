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
        $('#data').prepend(`<h1 id = "count">Tweets collected: ${tweets.length}</h1>`);

        const percentage_neg = negative/tweets.length;
        const percentage_pos = postive/tweets.length;
        const percentage_neu = neutral/tweets.length;

        $('#percentage').append(`<td style="--size: calc( ${percentage_neg} / 1 ); --color: rgba(230, 30, 30, 0.5);"> ${percentage_neg} </td>`);
        $('#percentage').append(`<td style="--size: calc( ${percentage_pos} / 1 ); --color: rgba(0,255,0,0.5);"> ${percentage_pos} </td>`);
        $('#percentage').append(`<td style="--size: calc( ${percentage_neu} / 1 ); --color: rgba(0,0,255,0.3);"> ${percentage_neu} </td>`);
        
        console.log(percentage_neu, percentage_neg, percentage_pos);
    })();
    
})