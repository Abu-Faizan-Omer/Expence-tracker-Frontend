async function login(event) {
    event.preventDefault();
    try {
        const loginDetails = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        const response = await axios.post(`http://localhost:3000/users/login`, loginDetails);
        
        if (response.status === 200) {
            alert(response.data.message);
        }
    } catch (err) {
        console.log(err);
        document.body.innerHTML += `<div style="color:red;">${err.response ? err.response.data.message : 'Login failed'}</div>`;
    }
}
