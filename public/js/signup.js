const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#typeUsernameX").value.trim();
    const email = document.querySelector("#typeEmailX").value.trim();
    const password = document.querySelector("#typePasswordX").value.trim();
    const confirmPassword = document
        .querySelector("#typePasswordAgainX")
        .value.trim();
    //new accounts by default are not admins
    const is_admin = false;
    //try to create account with api post
    if (username && email && password && confirmPassword) {
        const response = await fetch("/api/users/", {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password,
                confirmPassword,
                is_admin,
            }),
            headers: {
                "Content-Type": "application/json",
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
