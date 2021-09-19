const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#typeUsernameX").value.trim();
    const email = document.querySelector("#typeEmailX").value.trim();
    const password = document.querySelector("#typePasswordX").value.trim();
    console.log(username);
    //new accounts by default are not admins
    const is_admin = false;
    console.log(JSON.stringify({
        username,
        email,
        password,
        is_admin
    }));
    if (username && email && password) {
        const response = await fetch("/api/users/", {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password,
                is_admin
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(
                "Failed to sign up. " +
                response.status +
                ": " +
                response.statusText
            );
        }
    } else {
        alert("Please fill out all fields.");
    }
};

document
    .querySelector(".submit-signup")
    .addEventListener("click", signupFormHandler);