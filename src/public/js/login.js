const logForm = document.getElementById("formLogin");
logForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = new FormData(logForm)
    const obj = {}
    data.forEach((value, key) => {
        obj[key] = value;
    })
    fetch('/',{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
            'Content-Type':'application/json'
        }
    })
})