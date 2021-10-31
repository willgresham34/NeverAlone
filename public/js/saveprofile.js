const saveButton = document.querySelector('#save-button');
const editButton = document.querySelector('#edit-button');

const modal = document.querySelector('#myModal');
const closeModal = document.querySelector('.close');

const openModal = () => {
    modal.style.display = "block";
};

const modalClose = () => {
    modal.style.display = "none";
};

const clickAnywhere = (event) => {
    if(event.target == modal) {
        modal.style.display = "none";
    }
};

const userBioHandler = async (event) => {
    event.preventDefault();
    
    const bioField = document.querySelector('#myModal').querySelector('#user-bio').value.trim();
    console.log(bioField);
    
    await fetch('/api/user/update', {
        method: 'PUT',
        body: JSON.stringify({
            bio: bioField,
        }),
        headers: {'Content-Type': 'application/json'},
    });
};

window.addEventListener('click', clickAnywhere);
editButton.addEventListener('click', openModal);
closeModal.addEventListener('click', modalClose);
saveButton.addEventListener('click', userBioHandler);