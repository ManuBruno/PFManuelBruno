export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const filtroCategoria = document.getElementById("filtro-categoria");
const numeroCarrito = document.querySelector("#numero-carrito");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos(productosDisponibles);
});

const cargarProductos = (productos) => {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    const { nombre, imagen, precio, id } = producto;
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
    <img class="producto-imagen" src="${imagen}" alt="${nombre}">
   <div class="producto-detalles">
    <h3 class="producto-titulo">${nombre}</h3>
    <p class="producto-precio">$${precio}</p>
    <button class="producto-agregar" id="${id}">Agregar</button>
  </div>
    `;
    contenedorProductos.appendChild(card);
  });
  actualizarAgregar();
};

botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategoria.forEach((boton) => {
      boton.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

filtroCategoria.addEventListener("click", (e) => {
  const categoriaFiltrada = e.target.innerText.toLowerCase();
  if (categoriaFiltrada !== "todos los productos") {
    const productosFiltrados = productosDisponibles.filter((producto) =>
      producto.categoria.toLowerCase().includes(categoriaFiltrada)
    );
    cargarProductos(productosFiltrados);
  } else {
    cargarProductos(productosDisponibles);
  }
});

function actualizarAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

JSON.parse(sessionStorage.getItem("carrito")) === null &&
  sessionStorage.setItem("carrito", JSON.stringify([]));

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productosDisponibles.find(
    (producto) => producto.id == idBoton
  );
  if (carrito.some((producto) => producto.id == idBoton)) {
    const index = carrito.findIndex((producto) => producto.id == idBoton);
    carrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    carrito.push(productoAgregado);
  }
  actualizarNumero();
  localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
}

function actualizarNumero() {
  let numero = carrito.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    0
  );
  numeroCarrito.innerText = numero;
}
