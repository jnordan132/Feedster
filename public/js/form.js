// form validation
const agree =document.querySelector("#Terms").value;
const form = document.getElementById('.form-white');
const username = document.querySelector("#typeUsernameX").value.trim();
const email = document.querySelector("#typeEmailX").value.trim();
const password = document.querySelector("#typePasswordX").value.trim();
const confirmPassword = document.querySelector("#typePasswordAgainX").value.trim();

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


document.querySelector(".submit-signup").addEventListener("click", form);