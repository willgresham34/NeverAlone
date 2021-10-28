const createPost = async (event) => {
    event.preventDefault();
    alert("works");

    const postContent = document.querySelector('#userPost').value.trim();

    if(postContent){
        try{
            const response = await fetch('/api/post/',{
                method: 'POST',
                body: JSON.stringify({ 
                    postContent
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            if(response.ok){
                document.location.replace('/homepage');
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
document.querySelector("#new-post-btn").addEventListener('click', createPost);