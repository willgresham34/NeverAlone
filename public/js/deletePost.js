const deletePost = async (event) => {
    event.preventDefault();
    // alert("button works");
    
    // Gets the value of the hidden input which contains the post's id
    const postId = document.querySelector('input[name="selected-post-id"]').value;
    // alert(postId);

    try{
        const response = await fetch(`/api/post/profile/edit/${postId}`, {
            method: 'DELETE'
        });
        if(response.ok){
            document.location.replace('/profile');
        }
        else{
            alert(response.statusText);
        }    
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
}
document.querySelector("#delete-post-btn").addEventListener('click', deletePost);