//a simple check for the password string length
function passLen(str) {
    if (str.length > 6) {
        console.log(`Password Length is ${str.length} - i.e. greater than 6 characters!`)
        return str.length;
    } else {
        console.log(`Password length is not >6 characters, it is: ${str.length} characters in length`);
        return str.length;
    }
}

module.exports = passLen;
