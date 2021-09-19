const createFeedHandler = async (event) => {
    event.preventDefault();
    console.log("createFeedHandler");
    // const email = document.querySelector("#typeEmailX").value.trim();
    // const password = document.querySelector("#typePasswordX").value.trim();
    // if (email && password) {
    //     const response = await fetch("/api/users/login", {
    //         method: "POST",
    //         body: JSON.stringify({ email, password }),
    //         headers: { "Content-Type": "application/json" },
    //     });

    //     if (response.ok) {
    //         document.location.replace("/");
    //     } else {
    //         alert(
    //             "Failed to login. " +
    //                 response.status +
    //                 ": " +
    //                 response.statusText
    //         );
    //     }
    // } else {
    //     alert("Please fill out all fields.");
    // }
};

const followFeedHandler = async (event) => {
    event.preventDefault();
    console.log("followFeedHandler");
    // const email = document.querySelector("#typeEmailX").value.trim();
    // const password = document.querySelector("#typePasswordX").value.trim();
    // if (email && password) {
    //     const response = await fetch("/api/users/login", {
    //         method: "POST",
    //         body: JSON.stringify({ email, password }),
    //         headers: { "Content-Type": "application/json" },
    //     });

    //     if (response.ok) {
    //         document.location.replace("/");
    //     } else {
    //         alert(
    //             "Failed to login. " +
    //                 response.status +
    //                 ": " +
    //                 response.statusText
    //         );
    //     }
    // } else {
    //     alert("Please fill out all fields.");
    // }
};

document
    .querySelector(".new-feed-button")
    .addEventListener("click", createFeedHandler);

document
    .querySelector(".follow-feed-button")
    .addEventListener("click", followFeedHandler);
