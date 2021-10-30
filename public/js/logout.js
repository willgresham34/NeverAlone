const logOutBtn = document.querySelector('#logout-btn');

const logOut = async () => {

    const response = await fetch ('/api/user/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/login');
    } else {
        alert('Logout failed');
    }
};

logOutBtn.addEventListener('click', logOut);