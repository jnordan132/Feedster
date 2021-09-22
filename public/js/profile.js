//https://dev.to/ara225/how-to-use-bootstrap-modals-without-jquery-3475
function openModal() {
    document.getElementById("backdrop").style.display = "block";
    document.getElementById("createFeedModal").style.display = "block";
    document.getElementById("createFeedModal").classList.add("show");
}

function closeModal() {
    document.getElementById("backdrop").style.display = "none";
    document.getElementById("createFeedModal").style.display = "none";
    document.getElementById("createFeedModal").classList.remove("show");
}

const openCreateFeedModal = async (event) => {
    event.preventDefault();
    openModal();
};

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

const addFeedSource = async (event) => {
    event.preventDefault();
    const feedEntryContainer = document.querySelector(".feed-entries");
    const html =
        "<label for='feedTitle'>Enter a Feed Source:</label><input type='text' class='form-control feed-sources' placeholder='@twitter'>";
    feedEntryContainer.innerHTML += html;
};

//create feed: http://localhost:3001/api/feeds/
/*
{
   "title":"Node.js Programming",
   "user_id":"1",
   "sources":[
      {
         "source":"@nodejs"
      },
      {
         "source":"@trott"
      },
      {
         "source":"@adamzdanielle"
      }
   ]
}
*/
const submitNewFeed = async (event) => {
    event.preventDefault();
    const feedTitle = document.querySelector("#feedTitle").value;
    const elements = document.querySelectorAll(".feed-sources");
    const loggedInUserId = event.target.getAttribute("data-logged-in-user-id");
    const sourceArray = [];
    elements.forEach((element) => {
        sourceArray.push(element.value);
    });
    let json = `
        {
        "title":"${feedTitle}",
        "user_id":"${loggedInUserId}",
        "sources":[`;
    let sourcesJson = "";
    sourceArray.forEach((element) => {
        sourcesJson += `{"source":"${element}"},`;
    });
    sourcesJson = sourcesJson.substring(0, sourcesJson.length - 1);
    let endOfJson = "]}";
    const combinedJson = json + sourcesJson + endOfJson;
    console.log(combinedJson);
    if (loggedInUserId && feedTitle && sourceArray) {
        const response = await fetch("/api/feeds/", {
            method: "POST",
            body: combinedJson,
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/profile/" + loggedInUserId);
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

function toggleAddButton() {
    const loggedInUserId =
        document.querySelector(".logged-in-user-id").innerHTML;
    const profileId = document.querySelector(".current-profile-id").innerHTML;
    if (loggedInUserId !== profileId) {
        document.querySelector(".new-feed-button").classList.add("d-none");
    }
}

toggleAddButton();

document
    .querySelector(".new-feed-button")
    .addEventListener("click", openCreateFeedModal);

const followFeedButtons = document.querySelectorAll(".follow-feed-button");
followFeedButtons.forEach((el) =>
    el.addEventListener("click", (event) => followFeedHandler(event))
);

document
    .querySelector(".add-feed-button")
    .addEventListener("click", addFeedSource);

document.querySelector(".submit-feed").addEventListener("click", submitNewFeed);

const tweetTexts = document.querySelectorAll(".timeline-Tweet-text");
tweetTexts.forEach((el) => (el.innerHTML = decodeHTMLEntities(el.innerHTML)));

//https://stackoverflow.com/questions/5796718/html-entity-decode
function decodeHTMLEntities(text) {
    var entities = [
        ["amp", "&"],
        ["apos", "'"],
        ["#x27", "'"],
        ["#x2F", "/"],
        ["#39", "'"],
        ["#47", "/"],
        ["lt", "<"],
        ["gt", ">"],
        ["nbsp", " "],
        ["quot", '"'],
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(
            new RegExp("&" + entities[i][0] + ";", "g"),
            entities[i][1]
        );

    return text;
}
