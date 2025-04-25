# 🌀 TWorder - Tailwind Class Organizer for VSCode

Organiza automáticamente las clases de Tailwind CSS en el orden que tú quieras, de forma rápida y profesional.  
Compatible con `class` y `className` en HTML, React, Vue y más.

---

## ✨ Características

- 🔄 Ordena clases Tailwind automáticamente.
- 🧠 Detecta y organiza clases sin necesidad de selección manual de todo el archivo (tambien ordena la  clase que usted seleccione).
- ⚙️ Permite configurar tu **propio orden de clases**.
- 🧹 **Formatea** el documento automáticamente después de ordenar.
- 💡 Compatible con archivos `.html`, `.jsx`, `.tsx`, `.vue`, etc.

---

## 📦 Instalación

1. Clona este repositorio.
2. Ejecuta en la terminal:

   ```bash
   npm install
   npm run package

## ⚙️ Configuración Personalizada

Puedes definir tu propio orden de clases Tailwind en tu configuración de usuario de VSCode (`settings.json`), ejemplo:

```json
    "tworder.classOrder": [
    "flex", "block", "inline-block",
    "mt", "mb", "p", "text", "bg",
    "rounded", "shadow", "hover"
    ]
```

Si no define nada, se usa un orden por defecto incluido en la extensión.

# 🚀 Cómo usar
1. Abre el archivo que quieras ordenar.

2. Abre la paleta de comandos (`Ctrl+Shift+P`).

3. Escribe y selecciona:
**"TWorder: Ordenar Clases Tailwind"**

¡Listo! Las clases se ordenan automáticamente y tu archivo se formatea.

# 📋 Ejemplo
**Antes**
```bash
    <div class="text-white flex justify-center mt-4 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
    Botón
    </div>
```

**Después**
```bash
    <div class="flex mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 justify-center">
    Botón
    </div>
```

# 🙌 Contribuciones
¿Tienes ideas para mejorar la extensión?
¡Sientete libre de abrir un issue o pull request!