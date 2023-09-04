const productosEnCarrito = JSON.parse(
  localStorage.getItem("productos-en-carrito")
);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

if (productosEnCarrito) {
  contenedorCarritoVacio.classList.add("disabled");
  contenedorProductos.classList.remove("disabled");
  contenedorCarritoAcciones.classList.remove("disabled");
  contenedorCarritoComprado.classList.add("disabled");

  contenedorProductos.innerHTML = "";

  productosEnCarrito.forEach((producto) => {
    const div = document.createElement("div");
    const { nombre, imagen, cantidad, id, precio } = producto;
    div.classList.add("carrito-producto");
    div.innerHTML = `<img class="carrito-producto-imagen" src="${imagen}" alt="${nombre}">
                      <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${nombre}</h3>
                      </div>
                      <div class="carrito-prodcuto-cantidad">
                        <small>Cantidad</small>
                        <p>${cantidad}</p>
                      </div>
                      <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${precio}</p>
                      </div>
                      <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${precio * cantidad}</p>
                      </div>
                      <button class="carrito-producto-eliminar" id="${id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
    `;
    contenedorProductos.append(div);
  });
}
