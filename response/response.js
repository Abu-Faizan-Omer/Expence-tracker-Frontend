// Ensure token is globally available
const token = localStorage.getItem('token');
console.log("Token from localStorage:", token); // Debug line to ensure token is present

// Check if token is found before proceeding
if (!token) {
    console.error("No token found in localStorage. Authorization will fail.");
}

// Form submission handler
form.addEventListener("submit", async function(event) {
    try {
        event.preventDefault();

        const expence = event.target.expence.value;
        const description = event.target.description.value;
        const categories = event.target.cat.value;

        const expences = {
            expence: expence,
            description: description,
            categories: categories
        };

        const token=localStorage.getItem('token')
        const response = await axios.post("http://localhost:3000/expence/post", expences, {
            headers: { 'Authorization': token }
        });

        if (response.status === 201) {
            alert(response.data.message);
            showUserOnScreen(expences);
        }
    } catch (err) {
        console.error("Error during form submission:", err);
    }
})
function showUserOnScreen(expenses) {
    const ul = document.getElementById("listofitem");
    const li = document.createElement("li");
    li.textContent = `${expenses.expence}---${expenses.description}---${expenses.categories}`;

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";

    deletebtn.addEventListener("click", async function() {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/expence/delete/${expenses.id}`,{headers: { 'Authorization': token }});
            li.remove();
        } catch (err) {
            console.error("Error in deleting:", err);
        }
    });

    li.appendChild(deletebtn);
    ul.appendChild(li);
}


// Display expenses on page load
window.addEventListener("DOMContentLoaded", async function () {
    try {
        if (token) {
            const token=localStorage.getItem('token')
            const response = await axios.get("http://localhost:3000/expence/get", {
                headers: { 'Authorization':token }
            });
            const expenses = response.data;

            expenses.forEach(expense => {
                showUserOnScreen(expense);
            });
        } else {
            console.log("Token not found in localStorage");
        }
    } catch (err) {
        console.error("Error loading expenses:", err);
    }
});
