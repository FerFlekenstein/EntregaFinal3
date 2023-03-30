const formProd = document.getElementById("formProd");
formProd.addEventListener("submit", async (e) => {
  e.preventDefault();
})
let carrito = [];
const obtenerProductos = async () => {
  try {
    const respuesta = await fetch("/api/productos", { method: "GET" });
    const productos = await respuesta.json();
    productos.forEach((prod, indice) => {
      let btnSuma = document.getElementById(`btnSuma${indice}`)
      btnSuma.addEventListener('click', () => {
        const prodExists = carrito.some((obj) => obj.id === prod._id)
        if(prodExists) {
          const newCart = carrito.map((producto) => {
            if (producto.id === prod._id) {
              producto.cantidad ++
              return producto
            }
            return producto
          })
          carrito = [...newCart]
        } else {
          const prodCart = {
            id: prod._id,
            cantidad: 1
          }
          carrito.push(prodCart)
        }
      })
    })
    productos.forEach((prod, indice) => {
      let btnResta = document.getElementById(`btnResta${indice}`)
      btnResta.addEventListener("click", () => {
        const prodExists = carrito.some((obj) => obj.id === prod._id)
        if(prodExists) {
          const newCart = carrito.map((producto) => {
            if (producto.id === prod._id) {
              producto.cantidad --
              return producto
              }
            return producto
          })
          const finalCart = newCart.filter((producto) => producto.cantidad !== 0)
          carrito = [...finalCart]
        } else {
          alert("No tienes este producto en tu carrito")
        }
      })
    })
  } catch (error) {
  console.log(error);
  }
};
const FinishSale = document.getElementById("Boca");
const arrProd = obtenerProductos();
FinishSale.addEventListener("click", async() => {
  await fetch("/api/carrito/add", {
    method: "POST",
    body: JSON.stringify(carrito),
    headers: {
      "Content-Type": "application/json"
    }
  })
})

