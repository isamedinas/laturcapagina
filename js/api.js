const API_URL = "https://backendturca.onrender.com/api";

// Cargar productos en catálogo
async function cargarProductos() {
  const contenedor = document.getElementById("productos-container");

  if (!contenedor) return;

  try {
    const respuesta = await fetch(`${API_URL}/productos`);
    const productos = await respuesta.json();

    contenedor.innerHTML = "";

    productos.forEach(producto => {
      contenedor.innerHTML += `
        <div class="col-md-6 col-lg-3">
          <div class="card h-100">
            <div class="card-body text-center">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="mini-muted">${producto.descripcion}</p>
              <p><strong>Categoría:</strong> ${producto.categoria}</p>
              <p><strong>Marca:</strong> ${producto.marca}</p>
              <p><strong>Precio:</strong> $${producto.precio}</p>
              <p><strong>Stock:</strong> ${producto.stock}</p>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar productos.</p>";
    console.error(error);
  }
}

// Enviar cotización desde contacto
async function enviarCotizacion(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;

  const cotizacion = {
    nombre,
    telefono,
    mensaje
  };

  try {
    const respuesta = await fetch(`${API_URL}/cotizaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cotizacion)
    });

    if (respuesta.ok) {
      alert("Cotización enviada correctamente");
      document.getElementById("form-cotizacion").reset();
    } else {
      alert("Error al enviar cotización");
    }
  } catch (error) {
    alert("Error de conexión con el servidor");
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", cargarProductos);