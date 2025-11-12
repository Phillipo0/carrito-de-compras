let productosDisponibles = [
    { id: 1, nombre: "Laptop Gaming", precio: 1500, categoria: "Electrónica" },
    { id: 2, nombre: "Smartphone", precio: 800, categoria: "Electrónica" },
    { id: 3, nombre: "Auriculares Bluetooth", precio: 150, categoria: "Electrónica" },
    { id: 4, nombre: "Camiseta Deportiva", precio: 25, categoria: "Ropa" },
    { id: 5, nombre: "Zapatillas Running", precio: 120, categoria: "Ropa" },
    { id: 6, nombre: "Silla Oficina", precio: 200, categoria: "Hogar" },
    { id: 7, nombre: "Lámpara LED", precio: 45, categoria: "Hogar" },
    { id: 8, nombre: "Pelota Fútbol", precio: 30, categoria: "Deportes" },
    { id: 9, nombre: "Raqueta Tenis", precio: 85, categoria: "Deportes" },
];

let carrito = [];
let descuentoActual = 0;

// Agregar producto
function agregarProducto(idProducto) {
    const producto = productosDisponibles.find(p => p.id === idProducto);
    if (producto) {
        carrito.push(producto);
        mostrarCarrito();
    }
}

// Eliminar producto
function eliminarProducto(idProducto) {
    carrito = carrito.filter(p => p.id !== idProducto);
    mostrarCarrito();
}

// Calcular total
function calcularTotal() {
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    if (descuentoActual > 0) {
        total = aplicarDescuento(total, descuentoActual);
    }
    return total;
}

// Aplicar descuento
function aplicarDescuento(total, porcentaje) {
    return total - (total * (porcentaje / 100));
}

function aplicarDescuentoCarrito() {
    descuentoActual = 10;
    mostrarCarrito();
}

// Obtener producto más caro
function obtenerProductoMasCaro() {
    if (carrito.length === 0) return null;
    return carrito.reduce((max, p) => (p.precio > max.precio ? p : max));
}

// Filtrar por categoría
function filtrarPorCategoria(categoria) {
    if (categoria === "Todos") {
        cargarProductos(productosDisponibles);
    } else {
        const filtrados = productosDisponibles.filter(p => p.categoria === categoria);
        cargarProductos(filtrados);
    }
}

function cargarProductos(lista = productosDisponibles) {
    const productosGrid = document.getElementById("productosGrid");
    productosGrid.innerHTML = lista.map(producto =>
        `<div class="producto">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <button onclick="agregarProducto(${producto.id})">Agregar</button>
        </div>`
    ).join('');
}

// Mostrar carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    if (!carritoDiv) return;

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<h3>Carrito vacío</h3>";
        return;
    }

    let total = calcularTotal();
    let productoCaro = obtenerProductoMasCaro();

    carritoDiv.innerHTML = `
        <h3>Carrito</h3>
        ${carrito.map(p => `
            <div class="item-carrito">
                <span>${p.nombre} - $${p.precio}</span>
                <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </div>
        `).join('')}
        <hr>
        <p><strong>Total${descuentoActual > 0 ? ` (con ${descuentoActual}% de descuento)` : ""}:</strong> $${total}</p>
        <p><strong>Producto más caro:</strong> ${productoCaro.nombre} ($${productoCaro.precio})</p>
        <button class="btn-descuento" onclick="aplicarDescuentoCarrito()">Aplicar 10% Descuento</button>
    `;
}

// Header
function crearHeader() {
    const header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `
        <h1>Pipe Store</h1>
        <nav>
            <button onclick="filtrarPorCategoria('Todos')">Todos</button>
            <button onclick="filtrarPorCategoria('Electrónica')">Electrónica</button>
            <button onclick="filtrarPorCategoria('Ropa')">Ropa</button>
            <button onclick="filtrarPorCategoria('Hogar')">Hogar</button>
            <button onclick="filtrarPorCategoria('Deportes')">Deportes</button>
        </nav>
    `;
    document.body.prepend(header);
}

document.addEventListener("DOMContentLoaded", function () {
    crearHeader();
    cargarProductos();
    mostrarCarrito();
});
