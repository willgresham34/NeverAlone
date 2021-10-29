const saveButton = document.querySelector('#save-button');

const userBioHandler = async (event) => {
    event.preventDefault();
    
    const bioField = document.querySelector('#user-bio').value.trim();
    console.log(bioField);
    
    await fetch('/api/user/update', {
        method: 'PUT',
        body: JSON.stringify({
            bio: bioField,
        }),
        headers: {'Content-Type': 'application/json'},
    });
};

saveButton.addEventListener('click', userBioHandler);