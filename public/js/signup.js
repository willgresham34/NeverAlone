const signUpHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#fName');
    const lastName = document.querySelector('#lName');
    const emailUser = document.querySelector('#userEmail');
    const username = document.querySelector('#username');
    const passwordUser = document.querySelector('#userPassword');

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            first_name: firstName.value,
            last_name: lastName.value,
            email: emailUser.value,
            username: username.value,
            password: passwordUser.value,
        }),
        headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/homepage');
    } else {
        alert('Sign up failed');
    }

};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signUpHandler);