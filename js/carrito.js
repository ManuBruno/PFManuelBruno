const carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#vaciar-carrito");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-comprar");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

function cargarProductosCarrito() {
  if (carrito && carrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorProductos.innerHTML = "";

    carrito.forEach((producto) => {
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
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }

  actualizarEliminar();
  actualizarTotal();
}
cargarProductosCarrito();

function actualizarEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = carrito.findIndex((producto) => producto.id == idBoton);
  carrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  carrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
  cargarProductosCarrito();
}

function actualizarTotal() {
  const totalCalculado = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
  carrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

  contenedorCarritoVacio.classList.add("disabled");
  contenedorProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}
