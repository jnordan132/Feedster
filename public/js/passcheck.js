
// checking password meets conditions and if confirm password  & password match
function check(password) {
    const password = document.getElementById('#typePasswordX');
    const confirmPassword = document.querySelector("#typePasswordAgainX");
    const up = document.getElementById('#up');
    const num = document.getElementById('#num');
    
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
function match(password,confirmPassword) {
const password = document.getElementById('#typePasswordX');
const confirmPassword = document.querySelector("#typePasswordAgainX");
const up = document.getElementById('#up');
const num = document.getElementById('#num');

    if (password === confirmPassword) {
        num.style.display = 'none';
        up.style.display = 'none';
    } else {
        num.style.display = 'block';
        up.style.display = 'block';
    }
}


function passLen(str) {
if (str.length>6){
    console.log (`Password Length is ${str.length} - i.e. greater than 6 characters!`)
    return str.length;
}
else {
    console.log (`Password length is not >6 characters, it is: ${str.length} characters in length`);
    return str.length;
}
  }

module.exports = passLen;
module.exports = check;
module.exports = match;