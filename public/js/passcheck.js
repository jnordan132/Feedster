//a simple check for the password length
function passLen(password) {
    if (password.length > 6) {
        // console.log(`Password Length is ${password.length} - i.e. greater than 6 characters!`)
        return password.length;
    } else {
        // console.log(`Password length is not >6 characters, it is: ${password.length} characters in length`);
        return password.length;
    }
}


module.exports = passLen;


