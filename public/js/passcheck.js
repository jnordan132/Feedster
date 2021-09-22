//a simple check for the password length
function passLen(password) {
    if (password.length > 6) {
        console.log(`Password Length is ${password.length} - i.e. greater than 6 characters!`)
        return password.length;
    } else {
        console.log(`Password length is not >6 characters, it is: ${password.length} characters in length`);
        return password.length;
    }
}

// // check for password match
// function check(password, confirmPassword) {
//     if (password == confirmPassword) {
//         // document.getElementById('message').style.color = 'green';
//         // document.getElementById('message').innerHTML = 'Password is matching';
//         console.log("Password is matching");
//         return;
//     } else {
//         // document.getElementById('message').style.color = 'red';
//         // document.getElementById('message').innerHTML = 'Password is not matching';
//         console.log("Password is not matching");
//         return;
//     }
// }

// module.exports = check;
module.exports = passLen;


