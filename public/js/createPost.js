const createPost = async (event) => {
    event.preventDefault();
    alert("button works");

    const content = document.querySelector('#new-post').value.trim();
    alert("Content: " + content);
    
    if(content){
        try{
            alert("up to fetch works" + content);

            const response = await fetch('/api/post/homepage',{
                method: 'POST',
                body: JSON.stringify({ 
                    content
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            alert("fetch done");
            if(response.ok){
                alert("post worked");
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