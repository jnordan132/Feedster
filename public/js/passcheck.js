//global variables
const password = document.getElementById('#typePasswordX');
const confirmPassword = document.querySelector("#typePasswordAgainX").value.trim();
const up = document.getElementById('#up');
const num = document.getElementById('#num');

// checking password meets conditions and if confirm password  & password match
function check() {

    //match is a function which matches regular expressions
    // num req
    if (password.value.match(/[0-9])/)) {
        num.style.color = 'green';
    } else {
        num.style.color = 'red';
    }
    // uppercase req
    if (password.value.match(/[A-Z])/)) {
        up.style.color = 'green';
    } else {
        up.style.color = 'red';
    }

}

// should the 2 match hide the criteria
function match() {
    if (password === confirmPassword) {
        num.style.display = 'none';
        up.style.display = 'none';
    } else {
        num.style.display = 'block';
        up.style.display = 'block';
    }
}