# Kokiri Shop 🎮 | Catálogo Gamer E-commerce

Sitio web de catálogo interactivo, modular y de alto impacto visual para la venta de camisetas gamer con conversión directa a WhatsApp y cálculo en tiempo real de tasa BCV (Dólar / Bolívares).

Inspirado en la estructura y fluidez mobile-first de [tarjetaroja.tutenda.app](https://tarjetaroja.tutenda.app/) y diseñado con la identidad visual y paleta oficial de **Kokiri Shop**.

---

## 🚀 Inicio Rápido

1. Simplemente haz doble clic en `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari).
2. No requiere servidor complejo ni instalación previa de Node.js: está construido en **HTML5 semántico, Tailwind CSS y JavaScript vanilla modular**.
3. Es 100% responsivo con enfoque **Mobile-First** (perfecto en teléfonos, tablets y computadoras).

---

## 📁 Estructura del Proyecto

```text
Kokiri Shop/
├── assets/
│   ├── logo.png          <- Logo optimizado de Kokiri Shop
│   └── banner.jpg        <- Hero banner temático gamer
├── Paleta y Logo/
│   ├── 1791780104730.png <- Logo original
│   └── IMG-20260609-WA0057.jpg <- Paleta oficial de colores
├── Shirts/               <- 20 camisetas exclusivas del catálogo
│   ├── 1791776192732.jpg
│   └── ... (20 imágenes)
├── index.html            <- Estructura semántica, Hero, Grid, Modales y Drawer
├── config.js             <- Configuración de WhatsApp, API BCV, redes y tienda
├── products.js           <- Base de datos con las 20 camisetas y metadatos
├── app.js                <- Lógica reactiva: divisas BCV, filtros, carrito y WhatsApp
├── styles.css            <- Design System, paleta Kokiri, microanimaciones
└── README.md             <- Documentación del proyecto
```

---

## ⚙️ Dónde personalizar tus credenciales

### 1. Número de WhatsApp
Abre el archivo `config.js` y edita la línea:
```javascript
whatsappNumber: "584120000000", // Coloca tu número con código de país (sin '+' ni espacios)
```
Ejemplo para Venezuela: `584121234567` o `584249876543`.

### 2. Tasa de Cambio BCV (Banco Central de Venezuela)
En `config.js`:
```javascript
bcvApiEndpoint: "https://ve.dolarapi.com/v1/dolares/oficial",
defaultBcvRate: 42.50, // Tasa de respaldo si no hay internet o falla la API
```
- La web consulta en segundo plano la API oficial.
- Si la conexión falla, se activa automáticamente la tasa de respaldo `defaultBcvRate`.
- Al alternar el botón de moneda en la cabecera, **todos los precios de la tienda y del carrito se recalculan en tiempo real** reactivamente.
- La preferencia de moneda se guarda en el `localStorage` del visitante.

### 3. Paleta de Colores Oficial
Definida a partir de la tarjeta `IMG-20260609-WA0057.jpg`:
- **Dark Green (`#142C14`)**: Color base de cabeceras, tarjetas y superficies oscuras.
- **Cal Poly Green (`#2D5128`)**: Botones secundarios, bordes y acentos de bosque.
- **Fern Green (`#537B2F`)**: Verde primario de marca y estados interactivos.
- **Asparagus (`#8DA750`)**: Etiquetas, badges y textos secundarios de alta legibilidad.
- **Mindaro (`#E4EB9C`)**: Resplandor neón lima / acento activo de precios, selector de tallas y botones activos.
- **WhatsApp Green (`#25D366`)**: Botones de llamada a la acción y conversión directa.

---

## 🛍️ Las 20 Camisetas Incluidas en el Catálogo

1. **Super Mario Bros NES Arcade Action Series** (`Shirts/1791776192732.jpg`)
2. **The Legend of Zelda: Ocarina of Time (Link Melodies)** (`Shirts/1791776336872.jpg`)
3. **Minecraft Creeper 'SSSSS... BOOM!'** (`Shirts/1791776446929.jpg`)
4. **Grand Theft Auto V: Los Santos Sunset Michael** (`Shirts/1791776526295.jpg`)
5. **Zelda Ocarina of Time: Epona & Temple of Time** (`Shirts/1791776568581.jpg`)
6. **Grand Theft Auto VI: Vice City Palms Monolith** (`Shirts/1791776615846.jpg`)
7. **Zelda 64 Guía Oficial Manga Edition** (`Shirts/1791776656479.jpg`)
8. **Zelda: Majora's Mask 'What a Pretty Ocarina...'** (`Shirts/1791776703705.jpg`)
9. **Super Mario Bros 3: Raccoon Flight NES Box** (`Shirts/1791776824309.jpg`)
10. **Super Smash Bros All-Stars Comic Panels** (`Shirts/1791777561025.jpg`)
11. **Game Boy Pocket World Retroverse** (`Shirts/1791777665504.jpg`)
12. **8-Bit Arcade Mashup: Control NES & Leyendas** (`Shirts/1791777737701.jpg`)
13. **Sonic Adventure 2: City Escape Skateboarding** (`Shirts/1791777964072.jpg`)
14. **Kirby Heart Friend Pastel Edition** (`Shirts/1791779021573.jpg`)
15. **Sonic The Hedgehog Golden Ring Pop-Art** (`Shirts/1791779072723.jpg`)
16. **Yo-kai Watch 10th Anniversary Grand Fiesta** (`Shirts/1791779127188.jpg`)
17. **Yo-kai Watch: Hero & Hovernyan Epic Clash** (`Shirts/1791779191285.jpg`)
18. **Super Mario RPG: Legend of the Seven Stars (Geno & Crew)** (`Shirts/1791779263387.jpg`)
19. **Pokémon 1996: Red vs Blue Game Boy Cable Link** (`Shirts/1791779344405.jpg`)
20. **Club Nintendo Magazine E3 2001: Mario Kart Super Circuit** (`Shirts/1791780400979.jpg`)

---

## 📲 Flujos de Conversión a WhatsApp

### 1. Pedido Directo por Prenda (1 Clic)
Cada tarjeta cuenta con su selector de tallas rápido (S, M, L, XL, XXL) y el botón **"Pedir por WhatsApp"**.
Al pulsar, abre WhatsApp con el formato exacto requerido:
> *¡Hola Kokiri Shop! 👋*  
> *Quiero ordenar la camiseta **The Legend of Zelda: Ocarina of Time (Link Melodies)** en talla **L**.*  
> *💵 Precio: **$22.00** (≈ Bs. 935,00)*  
> *🎨 Color: Verde Bosque*  
> *📦 ¿Tienen disponibilidad inmediata para coordinar el pago y envío?*

### 2. Pedido Múltiple con Carrito Lateral
El usuario puede añadir varias prendas con diferentes tallas al carrito ("Tu Pedido") y pulsar **"Enviar Pedido por WhatsApp"**. Se genera un resumen consolidado con el desglose de prendas, cantidades, tallas y el **Total General a Tasa BCV**.
