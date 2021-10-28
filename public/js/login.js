const loginHandler = async (event) => {
    event.preventDefault();

    const userEmail = document.querySelector('#userEmail').value;
    const userPassword = document.querySelector('#userPassword').value;
    console.log(userEmail);
    console.log(userPassword);

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            email: userEmail, 
            password: userPassword,
        }),
        headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/homepage');
    } else {
        alert('Login attempt failed, please try again');
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginHandler);