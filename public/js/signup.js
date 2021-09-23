    const signupFormHandler = async (event) => {
        event.preventDefault();

        const username = document.querySelector("#typeUsernameX").value.trim();
        const email = document.querySelector("#typeEmailX").value.trim();
        const password = document.querySelector("#typePasswordX").value.trim();
        const confirmPassword = document.querySelector("#typePasswordAgainX").value.trim();

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

    };

    document.querySelector(".submit-signup").addEventListener("click", signupFormHandler);

//     const form = document.getElementById('demoForm');
//     FormValidation.formValidation(form, {
//         fields: {
//             firstName: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The first name is required'
//                     }
//                 }
//             },
//             lastName: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The last name is required'
//                     }
//                 }
//             },
//             username: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The username is required'
//                     },
//                     stringLength: {
//                         min: 6,
//                         max: 30,
//                         message: 'The username must be more than 6 and less than 30 characters long'
//                     },
//                     regexp: {
//                         regexp: /^[a-zA-Z0-9_]+$/,
//                         message: 'The username can only consist of alphabetical, number and underscore'
//                     }
//                 }
//             },
//             email: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The email address is required'
//                     },
//                     emailAddress: {
//                         message: 'The input is not a valid email address'
//                     }
//                 }
//             },
//             password: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The password is required'
//                     },
//                     stringLength: {
//                         min: 8,
//                         message: 'The password must have at least 8 characters'
//                     },
//                     different: {
//                         message: 'The password cannot be the same as username',
//                         compare: function() {
//                             return form.querySelector('[name="username"]').value;
//                         }
//                     }
//                 }
//             },
//             gender: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The gender is required'
//                     }
//                 }
//             },
//             captcha: {
//                 validators: {
//                     callback: {
//                         message: 'Wrong answer',
//                         callback: function(input) {
//                             const items = document.getElementById('captchaOperation').innerHTML.split(' ');
//                             const sum = parseInt(items[0]) + parseInt(items[2]);
//                             return input.value == sum;
//                         }
//                     }
//                 }
//             },
//             agree: {
//                 validators: {
//                     notEmpty: {
//                         message: 'You must agree with the terms and conditions'
//                     }
//                 }
//             }
//         },
//         plugins: {
//             trigger: new FormValidation.plugins.Trigger(),
//             tachyons: new FormValidation.plugins.Tachyons(),
//             submitButton: new FormValidation.plugins.SubmitButton(),
//             icon: new FormValidation.plugins.Icon({
//                 valid: 'fa fa-check',
//                 invalid: 'fa fa-times',
//                 validating: 'fa fa-refresh'
//             }),
//         }
//     });  
// });