const form=document.getElementById("form")
form.addEventListener("submit",async function(event){
    try{    
        event.preventDefault()

        const expence=event.target.expence.value
        const description=event.target.description.value
        const categories=event.target.cat.value

        const expences={
            expence:expence,
            description:description,
            categories:categories
        }
        const response=await axios.post("http://localhost:3000/expence/post",expences)
        if (response.status === 201) {
            alert(response.data.message);
            showUserOnScreen(expences)
        }
    }catch(err)
    {
        console.log(err)
    }    
})
function showUserOnScreen(expences){
    const ul=document.getElementById("listofitem")
    const li=document.createElement("li")
    li.textContent=`${expences.expence}---${expences.description}---${expences.categories}`

    const deletebtn=document.createElement("button")
    const deletebtntext=document.createTextNode("Delete")
    deletebtn.appendChild(deletebtntext)

    deletebtn.addEventListener("click",async function(){
        try{
            await axios.delete(`http://localhost:3000/expence/delete/${expences.id}`)
            li.remove()
        }catch{
            console.log(`error in Deleting`)
        }
    })

    li.appendChild(deletebtn)

    ul.appendChild(li)
}
window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await axios.get("http://localhost:3000/expence/get")
        const expenses = response.data;

        expenses.forEach(expense => {
            showUserOnScreen(expense);
        });
    } catch (err) {
        console.log("Error loading expenses:", err);
    }
});
