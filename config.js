/**
 * ============================================================================
 * KOKIRI SHOP - CONFIGURACIÓN GENERAL DE LA TIENDA
 * ============================================================================
 * Edita este archivo para personalizar tus datos de contacto, número de WhatsApp,
 * tasa de cambio, redes sociales y métodos de pago.
 */

const STORE_CONFIG = {
  // Información de la Marca
  storeName: "Kokiri Shop",
  tagline: "Streetwear gamer inspirado en tus mundos favoritos",
  location: "Venezuela · Envíos a todo el país",
  logoUrl: "assets/logo.png",
  bannerUrl: "assets/banner.jpg",

  // -------------------------------------------------------------------------
  // CREDENCIAL DE WHATSAPP:
  // Coloca tu número de teléfono en formato internacional SIN signo '+' ni espacios.
  // Ejemplo Venezuela: 584121234567 o 584241234567
  // -------------------------------------------------------------------------
  whatsappNumber: "584124860587", // <-- REEMPLAZA AQUÍ CON TU NÚMERO DE WHATSAPP

  // -------------------------------------------------------------------------
  // TASA DE CAMBIO BCV (Dólar oficial del Banco Central de Venezuela):
  // apiEndpoint: Endpoint público para consultar la tasa en tiempo real.
  // defaultBcvRate: Tasa de respaldo en caso de que no haya conexión a la API.
  // -------------------------------------------------------------------------
  bcvApiEndpoint: "https://ve.dolarapi.com/v1/dolares/oficial",
  defaultBcvRate: 42.50, // <-- Tasa de respaldo predeterminada (Bs. por 1 USD)

  // Mensaje base de WhatsApp
  whatsappGreeting: "¡Hola Kokiri Shop! 👋 Vengo del catálogo web y me interesa el siguiente pedido:",

  // Métodos de pago aceptados para mostrar en footer y modal
  paymentMethods: [
    { name: "Pago Móvil", icon: "smartphone", desc: "Tasa BCV del día (Banesco, Mercantil, Venezuela)" },
    { name: "Zelle", icon: "zap", desc: "Transferencia directa sin comisión" },
    { name: "Binance Pay", icon: "coins", desc: "USDT / Cripto Pay ID" },
    { name: "Efectivo USD", icon: "banknote", desc: "Billetes en buen estado (Entregas personales)" }
  ],

  // Redes sociales
  socialLinks: {
    instagram: "https://instagram.com/kokirishopp",
    tiktok: "https://tiktok.com/@kokirishopp",
    whatsappChannel: "https://whatsapp.com/channel/example"
  },

  // Horarios de atención y envíos
  shippingInfo: {
    carriers: "MRW y Zoom",
    schedule: "Lunes a Sábado: 9:00 AM - 7:00 PM",
    deliveryTime: "Envíos en 24 a 48 horas hábiles"
  },

  // Tallas disponibles por defecto
  availableSizes: ["S", "M", "L", "XL", "XXL"],

  // Tabla de medidas (cm)
  sizeGuide: [
    { size: "S", chest: "48 cm", length: "68 cm", shoulder: "42 cm" },
    { size: "M", chest: "51 cm", length: "71 cm", shoulder: "45 cm" },
    { size: "L", chest: "54 cm", length: "74 cm", shoulder: "48 cm" },
    { size: "XL", chest: "57 cm", length: "77 cm", shoulder: "51 cm" },
    { size: "XXL", chest: "60 cm", length: "80 cm", shoulder: "54 cm" }
  ]
};

// Exportar globalmente si se usa como script estándar
if (typeof window !== "undefined") {
  window.STORE_CONFIG = STORE_CONFIG;
}
