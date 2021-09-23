const username = document.querySelector("#typeUsernameX").value.trim();
const email = document.querySelector("#typeEmailX").value.trim();
const password = document.querySelector("#typePasswordX").value.trim();
const confirmPassword = document.querySelector("#typePasswordAgainX").value.trim();
const agree =document.querySelector("#Terms").value;
const form = document.getElementById('.form-white');

 const signupFormHandler = async (event) => {
        event.preventDefault();

        // const username = document.querySelector("#typeUsernameX").value.trim();
        // const email = document.querySelector("#typeEmailX").value.trim();
        // const password = document.querySelector("#typePasswordX").value.trim();
        // const confirmPassword = document.querySelector("#typePasswordAgainX").value.trim();

        console.log(username);
        //new accounts by default are not admins
        const is_admin = false;
        console.log(JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
            is_admin
        }));

        if (username && email && password && confirmPassword) {
            const response = await fetch("/api/users/", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword,
                    is_admin
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                document.location.replace("/");
            } else {
                // need to convert this alert to modal: https://kanecohen.github.io/modal-vanilla/
                alert(
                    "Failed to sign up. " + response.status + ": " + response.statusText
                );
            }
        } else {
            alert("Please fill out all fields.");
        }

        FormValidation.formValidation(form, {
            fields: {
                username: {
                    validators: {
                        notEmpty: {
                            message: 'The username is required'
                        },
                        stringLength: {
                            min: 3,
                            message: 'The username must be more than 3 characters long'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9]+$/,
                            message: 'The username can only consist of alphabets and or numbers'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'An email address is required'
                        },
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        stringLength: {
                            min: 6,
                            message: 'The password must have at least 6 characters'
                        },
                        different: {
                            message: 'The password cannot be the same as username',
                            compare: function() {
                                return form.querySelector('[name="username"]').value;
                            }
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        stringLength: {
                            min: 6,
                            message: 'The password must have at least 6 characters'
                        },
                        different: {
                            message: 'The password cannot be the same as username',
                            compare: function() {
                                return form.querySelector('[name="password"]').value;
                            }
                        }
                    }
                },
                agree: {
                    validators: {
                        notEmpty: {
                            message: 'You must agree with the terms and conditions'
                        }
                    }
                }
            }
        });  

    };

    document.querySelector(".submit-signup").addEventListener("click", signupFormHandler);