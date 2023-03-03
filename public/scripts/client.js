console.log(timeago)
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
  const date = new Date(tweet.created_at)
  console.log(date)
  const $tweet = $(`<article class="tweet">
  <div class="tweet-header">
    <div class = "tweet-header-left"> 
    <img class="tweet--avatar" src="${tweet.user.avatars}"> 
      <h2 class="user-name">${tweet.user.name}</h2>
    </div>

    <span class="user-handle">${tweet.user.handle}</span>
  </div>
  <p class="tweet-text">${tweet.content.text}</p>
  <div name="text" id="tweet-text"></div>
  <footer class = "tweet-footer">
    <span class="timestamp">${timeago.format(date)} </span>
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
  const sortedTweets = tweets.sort((a,b)=>{
      const keya = new Date(a.created_at)
      const keyb = new Date(b.created_at)
      if (keya < keyb) return -1
      if (keya > keyb) return 1
      return 0
  }).reverse()
  console.log("sorted", sortedTweets)
  for (let i = 0; i < sortedTweets.length; i++) {
    console.log("tweet",sortedTweets[i])
    const $tweet = createTweetElement(sortedTweets[i])
    $("#tweets-container").append($tweet);
  }
}
// renderTweets(data);

$(document).ready(function() {
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetLength = $('#tweet-text').val().length
    $('.error').slideUp();
if (tweetLength === 0 ) {
      $('.error').text("🚫 Tweet cannot be empty 🚫").slideDown();
    } else if (tweetLength > 140) {
      $('.error').text("🚫 Tweet cannot be more than 140 characters 🚫").slideDown();
    } else {
      $('.error').text('')
      $('.counter').text('140')
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function(response) {
          console.log("response",response)
          const $tweet = createTweetElement(response)
          $('#tweets-container').prepend($tweet);
          $('#tweet-form')[0].reset();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus + ': ' + errorThrown);
        }
      });
    }

  });
});

const loadTweets = function() {
  $.get("/tweets/", function(newTweet) {
    renderTweets(newTweet.reverse());
  });
};

loadTweets();