const formRegister = document.getElementById("formRegister");
formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(formRegister);
    const response = await fetch('/api/sessions/register', {
        method: 'POST',
        body: data
    })
    const result = await response.json();
    if (result.status === "success") {
        window.location.replace('/')
    }
    else {
        alert(result.error);
    }
})
