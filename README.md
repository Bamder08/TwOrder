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

Puedes definir tu propio orden de clases Tailwind en tu configuración de usuario de VSCode (`settings.json`):

```json
"tworder.classOrder": [
  "flex", "block", "inline-block",
  "mt", "mb", "p", "text", "bg",
  "rounded", "shadow", "hover"
]

---

Si no defines nada, se usa un orden por defecto incluido en la extensión.