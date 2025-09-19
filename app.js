// Guardamos objetos { nombre, enviado }
const amigos = [];

// DOM
const input = document.getElementById("amigo");
const lista = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

// ---------- Utilidades ----------
function normalizaNombre(nombre) {
  // Quita espacios al inicio/fin y colapsa espacios múltiples
  return nombre.trim().replace(/\s+/g, " ");
}

// Solo letras (incluye acentos y ñ) y espacios.
function esNombreValido(nombre) {
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(nombre);
}

function limpiarResultado() {
  resultado.innerHTML = "";
}

function renderLista() {
  lista.innerHTML = "";
  amigos.forEach((amigo, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${amigo.nombre}`;
    if (amigo.enviado) li.classList.add("enviado"); // tachado
    lista.appendChild(li);
  });
}

function reiniciarJuego() {
  amigos.length = 0;
  renderLista();
  limpiarResultado();
  input.value = "";
  input.focus();
}

// ---------- Acciones ----------
function agregarAmigo() {
  limpiarResultado();

  // Saneamos lo escrito y validamos
  const nombreIngresado = normalizaNombre(input.value);

  if (!nombreIngresado) {
    alert("Por favor escribe un nombre.");
    input.focus();
    return;
  }

  if (!esNombreValido(nombreIngresado)) {
    alert("Nombre inválido: solo se permiten letras y espacios (sin números ni símbolos).");
    input.select();
    return;
  }

  // Evitar duplicados (case-insensitive)
  const yaExiste = amigos.some(
    (a) => a.nombre.toLocaleLowerCase() === nombreIngresado.toLocaleLowerCase()
  );
  if (yaExiste) {
    alert("Ese nombre ya está en la lista.");
    input.select();
    return;
  }

  amigos.push({ nombre: nombreIngresado, enviado: false });
  renderLista();

  input.value = "";
  input.focus();
}

function sortearAmigo() {
  limpiarResultado();

  if (amigos.length === 0) {
    alert("Primero agrega al menos un nombre para poder sortear.");
    input.focus();
    return;
  }

  const pendientes = amigos.filter((a) => !a.enviado);

  if (pendientes.length === 0) {
    alert("¡Listo! Ya se enviaron todos. Reiniciaremos el juego para que agregues otros nombres.");
    reiniciarJuego();
    return;
  }

  const indice = Math.floor(Math.random() * pendientes.length);
  const ganador = pendientes[indice];

  ganador.enviado = true;
  renderLista();

  const li = document.createElement("li");
  li.textContent = `🎉 Amigo/a sorteado/a: ${ganador.nombre}`;
  resultado.appendChild(li);
}

// ---------- Mejora UX ----------
// 1) Enter para agregar
document.addEventListener("DOMContentLoaded", () => {
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") agregarAmigo();
  });

  // 2) Sanitizar mientras se escribe: elimina cualquier carácter no permitido
  input.addEventListener("input", () => {
    // Quita todo lo que no sea letra/espacio y colapsa espacios múltiples
    const limpio = input.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+/g, "").replace(/\s+/g, " ");
    if (input.value !== limpio) input.value = limpio;
  });
});

// Exponer a window para onclick del HTML
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
