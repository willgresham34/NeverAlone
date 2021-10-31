// Gets the value of the hidden input which contains the post's id
const postId = document.querySelector('input[name="selected-post-id"]').value;

const editPost = async (event) => {
    event.preventDefault();
    // alert("button works");


    const content = document.querySelector('input[name="selected-post-content"]').value;
    // alert(content + postId);
     if(content){
         try{
             const response = await fetch(`/api/post/profile/edit/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    content
                }),
                 headers: { 'Content-Type': 'application/json' },
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




}
document.querySelector("#edit-post-btn").addEventListener('click', editPost);