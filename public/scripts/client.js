const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
function createTweetElement (tweet) {
  const $tweet = $(`<article class="tweet">
  <div class="tweet-header">
    <div class = "tweet-header-left"> 
      <h2 class="user-name">${tweet.user.name}</h2>
    </div>

    <span class="user-handle">${tweet.user.handle}</span>
  </div>
  <p class="tweet-text">${tweet.content.text}</p>
  <div name="text" id="tweet-text"></div>
  <footer class = "tweet-footer">
    <span class="timestamp">10 days ago</span>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`);
  console.log($tweet)
  return $tweet.get(0)
}

function renderTweets (tweets) {
  for (let i = 0; i < tweets.length; i++) {
    console.log(tweets[i])
    const $tweet = createTweetElement(tweets[i])
    $("#tweets-container").append($tweet);
  }
}
renderTweets(data);
