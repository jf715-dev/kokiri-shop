<div align="center">
  <img src="assets/logo.png" alt="Kokiri Shop Logo" width="140" />
  <h1>Kokiri Shop 🎮 | Catálogo Gamer E-commerce</h1>
  <p>
    Catálogo interactivo mobile-first para la venta de camisetas gamer con conversión directa a WhatsApp y cálculo automático de tasa BCV (USD / VES).
  </p>

  <!-- Botón principal de acceso a la tienda -->
  <p>
    <a href="https://jf715-dev.github.io/kokiri-shop/" target="_blank">
      <img src="https://img.shields.io/badge/🛒_VISITAR_TIENDA-25D366?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Visitar Tienda en Vivo" />
    </a>
  </p>

  <!-- Badges de tecnologías -->
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/JavaScript_Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/API_BCV-Tiempo_Real-142C14?style=flat-square" alt="Tasa BCV" />
  </p>
</div>

---

## ✨ Características Principales

* **Conversión Directa a WhatsApp:** Botón de compra rápida por prenda (con selección de talla) y carrito lateral consolidado que genera el mensaje listo para enviar.
* **Multimoneda en Tiempo Real (USD / Bs.):** Consulta automática a la API oficial del Banco Central de Venezuela (`ve.dolarapi.com`) con tasa de respaldo configurable y guardado en `localStorage`.
* **Diseño Mobile-First:** Interfaz optimizada para compras desde redes sociales (Instagram, TikTok, WhatsApp) con paleta de colores inspirada en el universo Kokiri.
* **Cero Dependencias de Backend:** Arquitectura estática ultrarrápida alojada en GitHub Pages.

---

## 📸 Vista Previa

<!-- Puedes subir una captura de pantalla a assets/preview.png para mostrar cómo luce tu tienda -->
<div align="center">
  <img src="assets/banner.jpg" alt="Banner Kokiri Shop" width="100%" />
</div>

---

## ⚙️ Configuración Rápida de la Tienda

Para personalizar los datos comerciales de la tienda, edita el archivo `config.js`:

### 1. Número de WhatsApp de Ventas
```javascript
whatsappNumber: "584120000000", // Formato internacional sin '+' ni espacios (Ej: 584121234567)
