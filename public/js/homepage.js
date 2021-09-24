const followFeedHandler = async (event) => {
    event.preventDefault();

    const feed_id = event.target.getAttribute("data-feed-id");
    const user_following_id = event.target.getAttribute(
        "data-logged-in-user-id"
    );
    const user_created_id = event.target.getAttribute("data-user-created-id");

    if (feed_id && user_following_id && user_created_id) {
        const response = await fetch("/api/feedfollowers/", {
            method: "POST",
            body: JSON.stringify({
                feed_id,
                user_following_id,
                user_created_id,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            event.target.style.display = "none";
        } else {
            alert(
                "Failed to follow feed." +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    } else {
        alert("Error");
    }
};

//follow a feed when logged in
const followFeedButtons = document.querySelectorAll(".follow-feed-button");
followFeedButtons.forEach((el) =>
    el.addEventListener("click", (event) => followFeedHandler(event))
);

//decode tweet contents and add links to urls and hashtags
const tweetTexts = document.querySelectorAll(".timeline-Tweet-text");
tweetTexts.forEach((el) => (el.innerHTML = decodeHTMLEntities(el.innerHTML)));

// //feed-cards
// const feedCards = document.querySelectorAll(".feed-cards");
// feedCards.forEach((el) => {
//     const feedsTweets = el.querySelector(".tweet-list");
//     const feedHeaderLength = el.querySelector(".list-group-item").offsetHeight;
//     const feedContentLength = feedsTweets.offsetHeight;
//     const gridHeight = ~~((feedHeaderLength + feedContentLength) * 0.1008);
//     el.style = `height:${gridHeight}%`;
//     // const lastFeedTweet = feedsTweets.children[feedsTweets.children.length - 1];
//     // lastFeedTweet.style = `border-radius: 0px 0px 16px 16px;`;
// });
