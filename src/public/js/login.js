const logForm = document.getElementById("formLogin");
logForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = new FormData(logForm)
    const obj = {}
    data.forEach((value, key) => {
        obj[key] = value;
    })
    const result = await fetch('/api/sessions/', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (result.status === 200) {
        await fetch('/api/carrito', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        window.location.replace('/productos')
    }
    else {
        alert("Contraseña incorrecta");
    }
})