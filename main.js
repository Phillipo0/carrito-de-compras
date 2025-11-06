let productosDisponibles=[
    {id: 1, nombre: "Laptop Gaming", precio: 1500, categoria: "Electrónica"},
    {id: 2, nombre: "Smartphone", precio: 800, categoria: "Electrónica"},
    {id: 3, nombre: "Auriculares Bluetooth", precio: 150, categoria: "Electrónica"},
    {id: 4, nombre: "Camiseta Deportiva", precio: 25, categoria: "Ropa"},
    {id: 5, nombre: "Zapatillas Running", precio: 1500, categoria: "Ropa"},
    {id: 6, nombre: "Silla Oficina", precio: 200, categoria: "Hogar"},
    {id: 7, nombre: "Lámpara LED", precio: 45, categoria: "Hogar"},
    {id: 8, nombre: "Pelota Fútbol", precio: 30, categoria: "Deportes"},
    {id: 9, nombre: "Raqueta Tenis", precio: 85, categoria: "Deportes"},
]

let productoAgregado=[];

function cargarProductos(){
    const productosGrid = document.getElementById("productosGrid");
    productosGrid.innerHTML = productosDisponibles.map(producto =>
    `<div class="producto">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Categoria: ${producto.categoria}</p>
        <button onclick="agregarProducto('${producto}')">Agregar</button>
    </div>`
).join('');
}

function agregarProducto(producto){
    productoAgregado.push(producto);
}

document.addEventListener("DOMContentLoaded", function(){
    cargarProductos();
});
