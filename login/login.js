

async function login(event){
    event.preventDefault()
    try{
        const loginDetails={
            email:event.target.email.value,
            password:event.target.password.value
        }
        await axios.post(`http://localhost:3000/users/login`,loginDetails)
        if(response.status === 201)
            alert(response.data.message)
    }catch(err){
        console.log(err)
    }
}