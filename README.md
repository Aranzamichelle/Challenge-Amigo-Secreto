# README — Amigo Secreto (JS)

Aplicación web sencilla para organizar un **sorteo de Amigo Secreto**.  
Permite **agregar nombres**, **validarlos**, **listarlos en pantalla** y **sortear** aleatoriamente. Cada nombre sorteado se **tacha** de la lista y, cuando todos han salido, el juego se **reinicia** automáticamente.

---

## 📂 Estructura del proyecto

```
/ (raíz)
│── index.html        # Maquetado y accesibilidad básica
│── style.css         # Estilos y variables CSS
│── app.js            # Lógica del sorteo y validaciones
└── /assets           # Imágenes e íconos (opcional)
```

---

## 🚀 Cómo ejecutar

1. Descarga los tres archivos (`index.html`, `style.css`, `app.js`) y colócalos en la misma carpeta.
2. Abre `index.html` en tu navegador favorito (doble clic).
3. Escribe nombres y usa los botones **“Añadir”** y **“Sortear amigo”**.

> No requiere servidor ni dependencias externas.

---

## 🧠 ¿Qué hace el código?

- **Captura nombres** desde un `<input>` y los guarda en memoria.
- **Valida** que el nombre:
  - No esté vacío.
  - Solo contenga **letras** (incluye acentos/ñ) y **espacios**.
  - No esté **repetido** (comparación insensible a mayúsculas/minúsculas).
- **Muestra la lista** de amigos en pantalla.
- **Sortea** un nombre aleatoriamente entre los que **aún no han salido**.
- **Tacha** (con `text-decoration: line-through`) los nombres ya sorteados.
- Cuando **todos** han salido:
  - Muestra un **alert** y **reinicia** el juego (lista vacía, listo para empezar de nuevo).
- **Mejoras de UX**:
  - Presionar **Enter** en el input equivale a “Añadir”.
  - Sanitiza mientras escribes: elimina cualquier carácter no permitido.
  - `aria-live="polite"` para anunciar resultados a tecnologías de asistencia.

---

## ✅ Reglas y validaciones

1. **Formato del nombre permitido**  
   Solo **letras** (A–Z), **letras acentuadas**, **ñ/Ñ** y **espacios**.
   - Expresión regular usada:  
     ```regex
     /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/
     ```
   - Se eliminan caracteres inválidos mientras se escribe.

2. **No duplicados**  
   - Un nombre no puede repetirse.  
   - La verificación ignora mayúsculas/minúsculas (p. ej., “Aranza” = “aranza”).

3. **Sorteo**  
   - Solo se sortean nombres **pendientes** (no enviados).
   - El sorteado se **marca como enviado** y se **tacha** visualmente.
   - Si ya **no quedan pendientes**, aparece un **alert** y se **reinicia** el juego.

4. **Campos vacíos**  
   - Si el input está vacío, se muestra un **alert** pidiendo un nombre válido.

---

## 🖱️ Flujo de uso

1. Escribe un nombre y haz clic en **Añadir** (o presiona **Enter**).
2. Repite hasta cargar todos los participantes.
3. Presiona **Sortear amigo** para obtener un nombre al azar.
4. Continúa sorteando; los ya sorteados aparecerán **tachados**.
5. Al finalizar, verás un **alert** y el juego se **reiniciará** para cargar un nuevo grupo.

---

## ♿ Accesibilidad

- El resultado del sorteo se muestra en una lista con `aria-live="polite"`, para que lectores de pantalla anuncien el cambio.
- Botones con etiquetas y textos descriptivos.
- Tamaños de fuente y contraste adecuados definidos en `style.css`.

---

## 🎨 Estilos relevantes

- Variables CSS para colores (ver `:root`).
- Clase `.name-list li.enviado` para **tachar** sorteados:
  ```css
  .name-list li.enviado {
    text-decoration: line-through;
    opacity: 0.6;
  }
  ```

---

## 🧩 Personalizaciones útiles

- **Permitir guiones o apóstrofes** en nombres (opcional):  
  Cambia la regex en `app.js`:
  ```js
  // Permite letras, espacios, guiones y apóstrofes:
  const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ '-]+$/;
  ```
- **Reinicio manual**: el código incluye una función `reiniciarJuego()`.  
  Si deseas un botón de “Reiniciar”, agrégalo en el HTML y llama a `reiniciarJuego()`.

---

## 🛡️ Manejo de errores (qué verás y por qué)

- “**Por favor escribe un nombre.**” → El input está vacío.
- “**Nombre inválido…**” → Tiene números o símbolos no permitidos.
- “**Ese nombre ya está en la lista.**” → Está duplicado.
- “**Primero agrega al menos un nombre…**” → Intentaste sortear sin participantes.
- “**¡Listo! Ya se enviaron todos…**” → No quedan pendientes; el juego se reinicia.

---

## 🔍 Detalles técnicos (resumen de funciones clave)

- `normalizaNombre(str)` — recorta y colapsa espacios.
- `esNombreValido(str)` — valida con regex.
- `renderLista()` — dibuja la lista y aplica `.enviado` a los sorteados.
- `agregarAmigo()` — valida, evita duplicados y agrega a `amigos`.
- `sortearAmigo()` — elige al azar entre pendientes, marca y muestra resultado.
- `reiniciarJuego()` — limpia arreglo, UI y enfoca el input.

---

## 🗺️ Roadmap (ideas futuras)

- Persistir participantes en `localStorage`.
- Evitar que una persona se sortee a sí misma (modo “emparejar”).
- Exportar resultado o historial a CSV.
- Animaciones en el sorteo.
- Temas claro/oscuro.

---


