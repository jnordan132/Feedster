const submit = document.getElementById("postBtn");

// Event listener for submit comment button
submit.addEventListener("click", async (event) => {
    event.preventDefault();

    const commentInput = document.querySelector(".comment-input").value.trim();
    const loggedInUserId = event.target.getAttribute("data-logged-in-user-id");
    const currentFeedId = event.target.getAttribute("data-current-feed-id");
    //post to our api
    if (commentInput && loggedInUserId && currentFeedId) {
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({
                comment: commentInput,
                user_id: loggedInUserId,
                feed_id: currentFeedId,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/feed/" + currentFeedId);
        } else {
            alert(
                "Failed to follow feed." +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    } else {
        alert("Please enter a comment before submitting.");
    }
});

//decode tweet contents and add links to urls and hashtags
const tweetTexts = document.querySelectorAll(".timeline-Tweet-text");
tweetTexts.forEach((el) => (el.innerHTML = decodeHTMLEntities(el.innerHTML)));
