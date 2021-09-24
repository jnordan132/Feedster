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

//feed-cards
const feedCards = document.querySelectorAll(".feed-cards");
console.log(feedCards);
// feedCards.forEach((el) => (el.style = "grid-row-end: span 50;"));
feedCards.forEach((el) => {
    const feedLength = el
        .querySelector(".list-group-flush")
        .querySelectorAll(".tw-block-parent").length;
    let gridHeight = 20 * feedLength;
    if (gridHeight === 0) {
        gridHeight = 1;
    }
    el.style = `grid-row-end: span ${gridHeight};`;
});
// //grid-row-end: span 50
// feedCards.forEach((el) => (el.style = "grid-row-end: span 50;"));
// feedCards[0].style = "grid-row-end: span 10;";
// feedCards[1].style = "grid-row-end: span 100;";
