const handleComments = async function (event) {
  event.preventDefault();
  let targetId = event.target.getAttribute("data-id");
  let commentInputs = document.querySelectorAll(".comment-input");
  let commentText;
  commentInputs.forEach(input => {
    if (input.getAttribute("data-postid") == targetId) {
      commentText = input.value;
    }
  })

  console.log(commentText)
  if (commentText) {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        body: commentText,
        // CHANGE 1 to dynamic variable
        user_id: 1,
        post_id: targetId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
  }
};

document
  .querySelector("#post-wrapper")
  .addEventListener("submit", handleComments);
