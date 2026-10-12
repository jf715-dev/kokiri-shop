/**
 * ============================================================================
 * KOKIRI SHOP - CATÁLOGO DE PRODUCTOS (20 CAMISETAS EXCLUSIVAS)
 * ============================================================================
 * Cada producto utiliza una de las 20 imágenes de la carpeta 'Shirts'.
 * Incluye categorización gamer, precios en USD, tags, tallas disponibles y descripción.
 */

const PRODUCTS_DATA = [
  {
    id: "shirt-01",
    name: "Super Mario Bros NES",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "retro",
    categories: ["retro", "nintendo"],
    badge: "Más Vendido",
    badgeType: "hot", // hot, new, featured, limited
    image: "Shirts/1791776192732.jpg",
    color: "Negro",
    description: "Diseño vintage nostálgico inspirado en el cartucho clásico de 8-bits de Super Mario Bros para Nintendo Entertainment System. Gráficos pixel art de alta resolución con Mario disparando fuego.",
    details: [
      "100% Algodón peinado premium (240 GSM)",
      "Estampado DTF Ultra-HD de tacto suave y máxima durabilidad",
      "Cuello reforzado anti-deformación con doble costura",
      "Corte regular fit streetwear unisex"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-02",
    name: "The Legend of Zelda: Ocarina of Time (Link Melodies)",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "zelda",
    categories: ["zelda", "nintendo"],
    badge: "Favorito Kokiri",
    badgeType: "featured",
    image: "Shirts/1791776336872.jpg",
    color: "Verde Bosque (Forest Green)",
    description: "La pieza insignia de Kokiri Shop. Link interpretando las notas místicas de la Ocarina del Tiempo rodeado por pentagramas dorados y el sagrado blasón de la Trifuerza. Color verde Kokiri idéntico a la paleta del bosque.",
    details: [
      "Algodón peinado premium en tono verde bosque exclusivo",
      "Ilustración artística de Link con acabado suave",
      "Diseño con sellos de Hyrule en segundo plano",
      "Costuras de alta resistencia pensadas para el uso diario"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-03",
    name: "Minecraft Creeper",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "pc",
    categories: ["pc", "accion"],
    badge: "En Stock",
    badgeType: "new",
    image: "Shirts/1791776446929.jpg",
    color: "Verde Vibrante",
    description: "El mob más emblemático de la historia de los videojuegos en un diseño pop urbano con letras estilizadas en onda sónica 'SSSSS'. Colores vivos que no se destiñen con el lavado.",
    details: [
      "Tejido 100% algodón suave y transpirable",
      "Tono verde césped icónico de Minecraft",
      "Estampado frontal de gran formato con efecto de movimiento",
      "Ideal para streamers y amantes de la supervivencia cúbica"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-04",
    name: "Grand Theft Auto V: Los Santos Sunset Michael",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "playstation",
    categories: ["playstation", "accion"],
    badge: "Clásico",
    badgeType: "featured",
    image: "Shirts/1791776526295.jpg",
    color: "Arena / Beige",
    description: "Silueta conceptual de Michael De Santa fusionada con el atardecer y los rascacielos de Los Santos, el monte Vinewood y el icónico dirigible de fondo. Estética cinematográfica limpia y elegante.",
    details: [
      "Color beige crema neutro muy combinable",
      "Gradiente serigráfico en azul marino y cyan",
      "Tacto ultra ligero para climas cálidos",
      "Logotipo oficial de GTA V en base de pecho"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-05",
    name: "Zelda Ocarina of Time: Epona & Temple of Time",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "zelda",
    categories: ["zelda", "nintendo", "retro"],
    badge: "Edición Limitada",
    badgeType: "limited",
    image: "Shirts/1791776568581.jpg",
    color: "Negro",
    description: "Obra de arte en grabado stippling monocromático. Link montando a Epona mientras empuña la Espada Maestra hacia la luz del Templo del Tiempo, con la Ocarina y los pilares sagrados como base.",
    details: [
      "Estilo grabado medieval japonés / xilografía",
      "Algodón pesado 220g preencogido de lujo",
      "Detalles tipográficos con los créditos originales de N64",
      "Tinta serigráfica crema sobre base oscura"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-06",
    name: "Grand Theft Auto VI: Vice City Palms Monolith",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "playstation",
    categories: ["playstation", "accion"],
    badge: "Nuevo Drop",
    badgeType: "new",
    image: "Shirts/1791776615846.jpg",
    color: "Negro",
    description: "El esperado logo en números romanos de Grand Theft Auto VI encuadrado con palmeras tropicales en alto contraste blanco y negro. Moda urbana minimalista para el título más esperado de la década.",
    details: [
      "Serigrafía de alta densidad en blanco puro",
      "Silueta de palmeras estilo Vice City beach",
      "Corte regular moderno con caída relajada",
      "Etiqueta estampada en cuello sin rozaduras"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-07",
    name: "Zelda 64 Guía Oficial Manga Edition",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "zelda",
    categories: ["zelda", "nintendo", "retro"],
    badge: "Vintage",
    badgeType: "featured",
    image: "Shirts/1791776656479.jpg",
    color: "Blanco Hueso / Beige",
    description: "Homenaje a la legendaria guía oficial de Nintendo 64 japonesa Shogakukan. Tipografía en kanjis 'Zelda no Densetsu - Toki no Okarina' acompañada de ilustración oscura a tinta de Link.",
    details: [
      "Estética street-manga Y2K japonesa",
      "Color beige marfil con tinta sepia intensa",
      "Logotipo oficial de Nintendo 64 a color en pecho superior",
      "Composición de 100% algodón hipoalergénico"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-08",
    name: "Zelda: Majora's Mask 'What a Pretty Ocarina...'",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "zelda",
    categories: ["zelda", "nintendo", "retro"],
    badge: "Destacado",
    badgeType: "featured",
    image: "Shirts/1791776703705.jpg",
    color: "Beige Claro",
    description: "La temible Máscara de Majora suspendida sobre el misterioso bosque de Termina. Incluye a Link con Epona, las hadas Tatl y Tael, y los medallones de transformación Deku, Goron, Zora y de la Fiera Deidad.",
    details: [
      "Cita textual icónica de Skull Kid en la base",
      "Ilustración detallada en tonos carmesí y negro carbón",
      "Corte cómodo ideal para convenciones y maratones gamer",
      "Resistencia total ante lavado a máquina"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-09",
    name: "Super Mario Bros 3 NES Box",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "nintendo",
    categories: ["nintendo", "retro"],
    badge: "Top Ventas",
    badgeType: "hot",
    image: "Shirts/1791776824309.jpg",
    color: "Amarillo Mostaza",
    description: "La carátula más mítica de Nintendo: Mario con traje de mapache surcando los cielos con cola giratoria. Incluye el Sello Oficial de Calidad de Nintendo y tipografía en azul eléctrico.",
    details: [
      "Color amarillo brillante idéntico a la caja original de 1988",
      "Impresión de calidad fotográfica con colores saturados",
      "100% algodón hilado en anillos de tacto sedoso",
      "Una pieza indispensable para coleccionistas retro"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-10",
    name: "Super Mario Galaxy The Movie",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "nintendo",
    categories: ["nintendo", "accion"],
    badge: "Favorito",
    badgeType: "featured",
    image: "Shirts/1791777561025.jpg",
    color: "Gris Carbón",
    description: "Composición estilo cómic dinámico que reúne a Mario, Luigi, Yoshi, Bowser, Princesa Peach, Fox McCloud, Rosalina, Bowser Jr y R.O.B. listos para el combate supremo en la arena Smash.",
    details: [
      "Paleta de colores pop multicolor sobre camiseta grafito",
      "Bordes angulados estilo manga de acción shonen",
      "Algodón peinado prémium anti-arrugas",
      "Costuras reforzadas en hombros y cuello"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-11",
    name: "Game Boy Pocket World Retroverse",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "retro",
    categories: ["retro", "nintendo"],
    badge: "Exclusivo",
    badgeType: "featured",
    image: "Shirts/179177665504.jpg".replace("179177665504", "1791777665504"),
    color: "Celeste Pastel",
    description: "Un universo entero escapando de una consola Game Boy clásica: Pikachu, Kirby, Mario volador con capa, Bomberman, Squirtle surfista, Shy Guy y piezas de Tetris cayendo.",
    details: [
      "Tono celeste baby blue pastel muy en tendencia",
      "Estilo de ilustración kawaii / anime pastel retro",
      "Gramaje medio-alto de máxima frescura y caída",
      "Tacto cero relieve gracias a pigmentación por sublimado premium"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-12",
    name: "8-Bit Arcade Mashup: Control NES & Leyendas",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "retro",
    categories: ["retro", "nintendo"],
    badge: "Retro",
    badgeType: "featured",
    image: "Shirts/1791777737701.jpg",
    color: "Negro",
    description: "El mando de NES proyectando una ciudad holográfica donde Donkey Kong arroja barriles, Pac-Man devora fantasmas y Mario salta sobre bloques de monedas en una noche pixelada.",
    details: [
      "Control de NES en perspectiva isométrica brillante",
      "Cuadrícula synthwave y estrellas cósmicas",
      "100% Algodón peinado transpirable",
      "Gran formato centrado en el pecho"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-13",
    name: "Sonic Generations: City Escape Skateboarding",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "sega",
    categories: ["sega", "accion"],
    badge: "Nostalgia",
    badgeType: "featured",
    image: "Shirts/1791777964072.jpg",
    color: "Azul Marino",
    description: "'¡Rolling around at the speed of sound!' Sonic clásico y Sonic moderno bajando en patineta por las empinadas calles de San Francisco mientras escapan del camión de G.U.N.",
    details: [
      "Ilustración a todo color con profundidad de perspectiva",
      "Azul marino oscuro elegante que destaca la velocidad de Sonic",
      "Tejido durable y elástico con memoria de forma",
      "Un clásico inmortal de la era Dreamcast"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-14",
    name: "Kirby Heart Friend",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "nintendo",
    categories: ["nintendo", "anime"],
    badge: "Cute Tier",
    badgeType: "new",
    image: "Shirts/1791779021573.jpg",
    color: "Rosa Pastel",
    description: "Kirby en un adorable estilo artístico de acuarela infantil arrojando un corazón de amistad brillante. Perfecta para un outfit gamer tierno, fresco y veraniego.",
    details: [
      "Tono rosa claro suave y estético",
      "Textura suave al contacto directo con la piel",
      "Impresión DTF digital resistente a más de 50 lavados",
      "Corte unisex que luce increíble en cualquier estilo"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-15",
    name: "Sonic The Hedgehog Golden Ring Pop-Art",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "sega",
    categories: ["sega", "retro"],
    badge: "Nuevo",
    badgeType: "new",
    image: "Shirts/1791779072723.jpg",
    color: "Rosa Vibrante",
    description: "Sonic atravesando a toda velocidad un anillo dorado gigante de bonificación. Estilo pop-art con líneas de contorno marcadas inspiradas en el arte urbano contemporáneo.",
    details: [
      "Camiseta en tono rosa chicle llamativo",
      "Anillo amarillo resplandeciente con destellos de estrellas",
      "Algodón peinado 240g con dobladillos reforzados",
      "Fácil de combinar con jeans y sneakers urbanos"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-16",
    name: "Yo-kai Watch 10th Anniversary",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "rpg",
    categories: ["rpg", "anime"],
    badge: "Colección",
    badgeType: "limited",
    image: "Shirts/1791779127188.jpg",
    color: "Azul Noche",
    description: "Mural completo conmemorativo del aniversario de Yo-kai Watch. Incluye a Jibanyan en el centro, Komasan, Robonyan, Whisper, el auto yokai y los espíritus guardianes más populares.",
    details: [
      "Estampado full-chest expansivo de alta definición",
      "Color azul noche profundo que resalta cada yokai",
      "Edición para verdaderos fanáticos de Level-5 y RPGs",
      "Algodón de máxima densidad y comodidad"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-17",
    name: "Yo-kai Watch: Hero & Hovernyan Epic Clash",
    priceUsd: 17.00,
    comparePriceUsd: 20.00,
    category: "rpg",
    categories: ["rpg", "anime"],
    badge: "En Stock",
    badgeType: "featured",
    image: "Shirts/1791779191285.jpg",
    color: "Café Espresso",
    description: "Batalla climática nocturna entre Hovernyan con capa roja y el héroe empuñando el bate mágico sobre sandalias geta, rodeados por auras oscuras de yokais sombríos.",
    details: [
      "Ilustración con iluminación dramática de antorchas y fuego espiritual",
      "Camiseta en marrón oscuro profundo muy exclusiva",
      "Tejido suave preencogido de tacto aterciopelado",
      "Gran nivel de detalle en sombras y luces"
    ],
    isFeatured: false,
    inStock: true
  },
  {
    id: "shirt-18",
    name: "Super Mario RPG: Legend of the Seven Stars (Geno & Crew)",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "rpg",
    categories: ["rpg", "nintendo"],
    badge: "Obra Maestra",
    badgeType: "featured",
    image: "Shirts/1791779263387.jpg",
    color: "Negro",
    description: "La obra maestra de Square y Nintendo cobra vida: Geno lanzando su ráfaga de estrellas, Bowser enfurecido, Princesa Peach con sartén, Mallow la nube llorona y Mario al rescate.",
    details: [
      "Colores neón naranja, cian y amarillo en alto contraste",
      "Rinde tributo al clásico RPG de SNES y su remake para Switch",
      "100% Algodón peinado de primera calidad",
      "Doble costura en mangas y parte inferior"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-19",
    name: "Pokémon 1996: Red vs Blue",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "retro",
    categories: ["retro", "nintendo", "rpg"],
    badge: "Top Ventas",
    badgeType: "hot",
    image: "Shirts/1791779344405.jpg",
    color: "Crema / Beige",
    description: "La imagen definitiva de la infancia gamer de los 90s: Red y Blue sentados en el cuarto compitiendo en su Game Boy unidos por el Cable Link para intercambiar y luchar. Arte por Ry-Spirit.",
    details: [
      "Estilo artístico en acuarela nostálgica con año 1996",
      "Camiseta beige arena vintage de acabado rústico moderno",
      "Respetuosa con pieles sensibles gracias a tintas ecológicas al agua",
      "El regalo perfecto para cualquier entrenador Pokémon"
    ],
    isFeatured: true,
    inStock: true
  },
  {
    id: "shirt-20",
    name: "Club Nintendo Magazine E3 2001: Mario Kart Super Circuit",
    priceUsd: 15.00,
    comparePriceUsd: 18.00,
    category: "retro",
    categories: ["retro", "nintendo"],
    badge: "Edición Vintage",
    badgeType: "limited",
    image: "Shirts/1791780400979.jpg",
    color: "Azul Petróleo",
    description: "Réplica de colección de la icónica portada de la revista latinoamericana Club Nintendo del año 2001 con Mario Kart Super Circuit en GBA, reporte especial de E3 y trucos de Banjo-Tooie.",
    details: [
      "Tributo retro nostálgico para la comunidad de videojugadores latinos",
      "Gráficos vintage desgastados con el logo retro de Club Nintendo",
      "Camiseta en tono azul medianoche / petróleo de alto calibre",
      "Estampado de altísima definición que reproduce hasta los textos pequeños"
    ],
    isFeatured: true,
    inStock: true
  }
];

// Categorías del catálogo con iconos y nombres amigables
const CATEGORIES_DATA = [
  { id: "todas", name: "Todas", icon: "sparkles", count: 20 },
  { id: "zelda", name: "The Legend of Zelda", icon: "shield", count: 4 },
  { id: "nintendo", name: "Nintendo Clásicos", icon: "gamepad-2", count: 9 },
  { id: "retro", name: "Retro 8-Bit & 90s", icon: "tv", count: 7 },
  { id: "rpg", name: "RPG & Aventura", icon: "swords", count: 4 },
  { id: "sega", name: "Sonic", icon: "zap", count: 2 },
  { id: "playstation", name: "PlayStation & GTA", icon: "crosshair", count: 2 },
  { id: "pc", name: "PC & Minecraft", icon: "box", count: 1 }
];

if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CATEGORIES_DATA = CATEGORIES_DATA;
}
