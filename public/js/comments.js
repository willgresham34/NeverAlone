const handleComments = async function (event) {
  event.preventDefault();

  const body = document.querySelector('textarea[name="userComment"]').value;

  if (body) {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
  }
};

document
  .querySelector("#new-comment-btn")
  .addEventListener("submit", handleComments);
