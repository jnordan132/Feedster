const submit = document.getElementById("postBtn");
let commentsArr = [];


// Template literal for comments card
const createComment = function() {
    commentsArr.push("Hey it works")
};

// Event listener for post button
submit.addEventListener('click', () => {
    console.log("working")
    createComment()
});