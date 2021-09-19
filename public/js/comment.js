const submit = document.getElementById("postBtn");
let commentsArr = [];


const createComment = function() {
    const commentText = document.getElementById("textBox").value;
    for (let i = 0; i < commentsArr.length; i++)
        commentText.push(commentsArr);
    console.log(commentText);
};

// Event listener for post button
submit.addEventListener('click', () => {
    createComment()
});