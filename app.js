/**
 * ============================================================================
 * KOKIRI SHOP - APLICACIÓN PRINCIPAL (MINIMALISTA & ESTILIZADA)
 * ============================================================================
 * Soporta Modo Claro (por defecto) y Modo Oscuro.
 * Conversión reactiva a Tasa Oficial BCV, filtrado y pedidos por WhatsApp.
 */

const KokiriApp = {
  theme: "light", // 'light' (por defecto) | 'dark'
  currency: "USD", // 'USD' | 'VES'
  bcvRate: STORE_CONFIG.defaultBcvRate,
  bcvRateDate: null,
  bcvStatus: "cargando", // 'cargando' | 'oficial' | 'fallback'
  selectedCategory: "todas",
  searchQuery: "",
  sortBy: "featured",
  selectedSizes: {}, // { 'shirt-01': 'M', ... }
  cart: [],
  currentModalProduct: null,
  modalSelectedSize: "M",
  modalQuantity: 1,

  // Inicialización
  async init() {
    this.initTheme();
    this.loadPreferences();
    this.renderCategoryPills();
    this.setupEventListeners();
    await this.fetchBcvRate();
    this.renderProducts();
    this.renderCart();
    this.updateCartBadge();
    this.updateCurrencyUI();
  },

  // --------------------------------------------------------------------------
  // 1. GESTIÓN DE TEMA: MODO CLARO (POR DEFECTO) Y MODO OSCURO
  // --------------------------------------------------------------------------
  initTheme() {
    const savedTheme = localStorage.getItem("kokiri_theme") || "light";
    this.setTheme(savedTheme);
  },

  setTheme(theme) {
    this.theme = theme;
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }

    localStorage.setItem("kokiri_theme", theme);
  },

  toggleTheme() {
    const newTheme = this.theme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    this.renderCategoryPills();
    this.renderProducts();
  },

  // --------------------------------------------------------------------------
  // 2. GESTIÓN DE PREFERENCIAS Y PERSISTENCIA LOCAL
  // --------------------------------------------------------------------------
  loadPreferences() {
    const savedCurrency = localStorage.getItem("kokiri_currency");
    if (savedCurrency === "USD" || savedCurrency === "VES") {
      this.currency = savedCurrency;
    }

    const savedCart = localStorage.getItem("kokiri_cart");
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
      } catch (e) {
        this.cart = [];
      }
    }

    // Inicializar tallas por defecto en 'M'
    PRODUCTS_DATA.forEach(p => {
      this.selectedSizes[p.id] = "M";
    });
  },

  saveCart() {
    localStorage.setItem("kokiri_cart", JSON.stringify(this.cart));
    this.updateCartBadge();
    this.renderCart();
  },

  // --------------------------------------------------------------------------
  // 3. CONVERSIÓN DE DIVISAS Y CONSUMO DE API BCV
  // --------------------------------------------------------------------------
  async fetchBcvRate() {
    const rateBadgeEl = document.getElementById("bcv-rate-badge");
    const rateTextEl = document.getElementById("bcv-rate-text");

    try {
      const response = await fetch(STORE_CONFIG.bcvApiEndpoint, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Respuesta no OK de la API BCV");

      const data = await response.json();
      if (data && (data.promedio || data.precio)) {
        this.bcvRate = parseFloat(data.promedio || data.precio);
        this.bcvRateDate = data.fechaActualizacion || new Date().toISOString();
        this.bcvStatus = "oficial";
      } else {
        throw new Error("Formato de tasa desconocido");
      }
    } catch (error) {
      this.bcvRate = STORE_CONFIG.defaultBcvRate;
      this.bcvStatus = "fallback";
    }

    if (rateTextEl) {
      rateTextEl.textContent = `BCV: 1$ = ${this.bcvRate.toFixed(2)} Bs.`;
    }
    if (rateBadgeEl) {
      rateBadgeEl.title = this.bcvStatus === "oficial" 
        ? `Tasa oficial en vivo (${this.bcvRateDate ? new Date(this.bcvRateDate).toLocaleDateString() : 'Hoy'})`
        : "Tasa de respaldo estimada";
    }
  },

  toggleCurrency() {
    this.currency = this.currency === "USD" ? "VES" : "USD";
    localStorage.setItem("kokiri_currency", this.currency);
    this.updateCurrencyUI();
    this.renderProducts();
    this.renderCart();
    
    if (this.currentModalProduct) {
      this.renderModalPrices();
    }

    this.showToast(
      `Moneda: ${this.currency === "USD" ? "Dólares ($)" : "Bolívares (Bs.)"}`,
      "info"
    );
  },

  updateCurrencyUI() {
    const labelUsd = document.getElementById("currency-label-usd");
    const labelVes = document.getElementById("currency-label-ves");

    if (labelUsd && labelVes) {
      if (this.currency === "USD") {
        labelUsd.className = "font-bold text-zinc-900 dark:text-white";
        labelVes.className = "text-zinc-400 dark:text-zinc-500";
      } else {
        labelVes.className = "font-bold text-zinc-900 dark:text-white";
        labelUsd.className = "text-zinc-400 dark:text-zinc-500";
      }
    }
  },

  formatPrice(usdAmount) {
    if (this.currency === "USD") {
      return `$${usdAmount.toFixed(2)}`;
    } else {
      const vesAmount = usdAmount * this.bcvRate;
      return `Bs. ${vesAmount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  },

  formatPriceSecondary(usdAmount) {
    if (this.currency === "USD") {
      const vesAmount = usdAmount * this.bcvRate;
      return `≈ Bs. ${vesAmount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `≈ $${usdAmount.toFixed(2)} USD`;
    }
  },

  // --------------------------------------------------------------------------
  // 4. RENDERIZADO DE CATEGORÍAS Y PRODUCTOS
  // --------------------------------------------------------------------------
  renderCategoryPills() {
    const container = document.getElementById("category-pills-container");
    if (!container) return;

    const counts = { todas: PRODUCTS_DATA.length };
    PRODUCTS_DATA.forEach(p => {
      p.categories.forEach(cat => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });

    container.innerHTML = CATEGORIES_DATA.map(cat => {
      const count = counts[cat.id] || cat.count || 0;
      const isActive = this.selectedCategory === cat.id;

      return `
        <button
          type="button"
          onclick="KokiriApp.setCategory('${cat.id}')"
          class="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition ${
            isActive
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-sm"
              : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          }"
        >
          <span>${cat.name}</span>
          <span class="text-[10px] opacity-70">
            (${count})
          </span>
        </button>
      `;
    }).join("");
  },

  setCategory(categoryId) {
    this.selectedCategory = categoryId;
    this.renderCategoryPills();
    this.renderProducts();
  },

  setSort(sortValue) {
    this.sortBy = sortValue;
    this.renderProducts();
  },

  getFilteredProducts() {
    let list = [...PRODUCTS_DATA];

    if (this.selectedCategory !== "todas") {
      list = list.filter(p => p.categories.includes(this.selectedCategory));
    }

    if (this.searchQuery.trim() !== "") {
      const query = this.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.categories.some(c => c.toLowerCase().includes(query))
      );
    }

    if (this.sortBy === "price-asc") {
      list.sort((a, b) => a.priceUsd - b.priceUsd);
    } else if (this.sortBy === "price-desc") {
      list.sort((a, b) => b.priceUsd - a.priceUsd);
    } else if (this.sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  },

  renderProducts() {
    const gridEl = document.getElementById("products-grid");
    if (!gridEl) return;

    const products = this.getFilteredProducts();

    if (products.length === 0) {
      gridEl.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No se encontraron camisetas</p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Intenta con otra palabra clave o selecciona otra categoría.
          </p>
          <button
            type="button"
            onclick="KokiriApp.resetFilters()"
            class="mt-3 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md text-xs font-medium transition"
          >
            Ver todas
          </button>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = products.map(product => {
      const selectedSize = this.selectedSizes[product.id] || "M";
      const formattedPrice = this.formatPrice(product.priceUsd);
      const secondaryPrice = this.formatPriceSecondary(product.priceUsd);

      return `
        <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex flex-col group hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-sm" data-product-id="${product.id}">
          
          <!-- Imagen del Producto con Aspect Ratio Cuadrado -->
          <div class="aspect-square relative cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-800/50" onclick="KokiriApp.openQuickView('${product.id}')">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <!-- Hint sutil para Desktop -->
            <div class="hidden sm:flex absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
              <span class="px-2.5 py-1 rounded bg-white/90 text-zinc-900 text-xs font-medium shadow">
                Vista Rápida
              </span>
            </div>
          </div>

          <!-- Contenido de la Tarjeta (Optimizado para Móvil y Desktop) -->
          <div class="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between gap-2 sm:gap-2.5">
            <div>
              <h3 
                class="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-tight hover:underline cursor-pointer"
                onclick="KokiriApp.openQuickView('${product.id}')"
                title="${product.name}"
              >
                ${product.name}
              </h3>
            </div>

            <!-- Selector Compacto de Tallas -->
            <div>
              <div class="grid grid-cols-5 gap-1">
                ${STORE_CONFIG.availableSizes.map(size => `
                  <button
                    type="button"
                    onclick="KokiriApp.selectCardSize('${product.id}', '${size}')"
                    class="py-0.5 sm:py-1 text-center rounded border text-[10px] sm:text-xs font-medium transition ${
                      selectedSize === size
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }"
                  >
                    ${size}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Precio -->
            <div class="pt-1.5 border-t border-zinc-100 dark:border-zinc-800/80">
              <div class="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                ${formattedPrice}
              </div>
              <div class="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
                ${secondaryPrice}
              </div>
            </div>

            <!-- Fila de Acciones: WhatsApp y Carrito -->
            <div class="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onclick="KokiriApp.orderDirectWhatsApp('${product.id}')"
                class="flex-1 py-1.5 sm:py-2 px-2 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
              >
                <svg class="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onclick="KokiriApp.addToCart('${product.id}', '${selectedSize}', 1)"
                title="Añadir al carrito"
                class="p-1.5 sm:p-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition active:scale-95 flex items-center justify-center"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  },

  selectCardSize(productId, size) {
    this.selectedSizes[productId] = size;
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (!card) return;

    card.querySelectorAll("button").forEach(btn => {
      if (STORE_CONFIG.availableSizes.includes(btn.textContent.trim())) {
        if (btn.textContent.trim() === size) {
          btn.className = "py-0.5 sm:py-1 text-center rounded border text-[10px] sm:text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 transition";
        } else {
          btn.className = "py-0.5 sm:py-1 text-center rounded border text-[10px] sm:text-xs font-medium border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition";
        }
      }
    });
  },

  resetFilters() {
    this.selectedCategory = "todas";
    this.searchQuery = "";
    const searchInput = document.getElementById("search-input");
    const searchInputMobile = document.getElementById("search-input-mobile");
    if (searchInput) searchInput.value = "";
    if (searchInputMobile) searchInputMobile.value = "";
    this.renderCategoryPills();
    this.renderProducts();
  },

  // --------------------------------------------------------------------------
  // 5. FLUJO DE PEDIDO DIRECTO POR WHATSAPP (POR PRODUCTO)
  // --------------------------------------------------------------------------
  orderDirectWhatsApp(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const size = this.selectedSizes[productId] || "M";
    const priceFormatted = this.formatPrice(product.priceUsd);
    const secondaryFormatted = this.formatPriceSecondary(product.priceUsd);

    const message = 
      `Hola ${STORE_CONFIG.storeName}! 👋\n` +
      `Quiero ordenar la camiseta *${product.name}* en talla *${size}*.\n\n` +
      `💵 Precio: *${priceFormatted}* (${secondaryFormatted})\n` +
      `🎨 Color: ${product.color}\n` +
      `📦 ¿Tienen disponibilidad inmediata para coordinar el pago y envío?`;

    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  },

  // --------------------------------------------------------------------------
  // 6. MODAL DE VISTA RÁPIDA (QUICK VIEW)
  // --------------------------------------------------------------------------
  openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    this.currentModalProduct = product;
    this.modalSelectedSize = this.selectedSizes[productId] || "M";
    this.modalQuantity = 1;

    const modal = document.getElementById("quick-view-modal");
    if (!modal) return;

    document.getElementById("modal-img").src = product.image;
    document.getElementById("modal-img").alt = product.name;
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-desc").textContent = product.description;
    document.getElementById("modal-qty").textContent = this.modalQuantity;

    // Renderizar detalles (excluyendo mención a 100% Algodón Peinado)
    const detailsContainer = document.getElementById("modal-details-list");
    if (detailsContainer) {
      const filteredDetails = (product.details || []).filter(d => !/100%\s*algod[oó]n/i.test(d));
      detailsContainer.innerHTML = filteredDetails.map(d => `
        <li class="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0"></span>
          <span>${d}</span>
        </li>
      `).join("");
    }

    this.renderModalSizes();
    this.renderModalPrices();

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeQuickView() {
    const modal = document.getElementById("quick-view-modal");
    if (modal) {
      modal.classList.remove("open");
    }
    document.body.style.overflow = "";
    this.currentModalProduct = null;
  },

  renderModalSizes() {
    const container = document.getElementById("modal-sizes-wrap");
    if (!container) return;

    container.innerHTML = STORE_CONFIG.availableSizes.map(size => `
      <button
        type="button"
        onclick="KokiriApp.setModalSize('${size}')"
        class="py-1 px-3 rounded-md border text-xs font-medium transition ${
          this.modalSelectedSize === size
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold"
            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
        }"
      >
        ${size}
      </button>
    `).join("");
  },

  setModalSize(size) {
    this.modalSelectedSize = size;
    if (this.currentModalProduct) {
      this.selectedSizes[this.currentModalProduct.id] = size;
      this.selectCardSize(this.currentModalProduct.id, size);
    }
    this.renderModalSizes();
  },

  changeModalQty(delta) {
    this.modalQuantity = Math.min(10, Math.max(1, this.modalQuantity + delta));
    const qtyEl = document.getElementById("modal-qty");
    if (qtyEl) qtyEl.textContent = this.modalQuantity;
    this.renderModalPrices();
  },

  renderModalPrices() {
    if (!this.currentModalProduct) return;
    const totalUsd = this.currentModalProduct.priceUsd * this.modalQuantity;
    const priceEl = document.getElementById("modal-price");
    const secondaryEl = document.getElementById("modal-price-secondary");

    if (priceEl) priceEl.textContent = this.formatPrice(totalUsd);
    if (secondaryEl) secondaryEl.textContent = this.formatPriceSecondary(totalUsd);
  },

  orderModalViaWhatsApp() {
    if (!this.currentModalProduct) return;
    const product = this.currentModalProduct;
    const size = this.modalSelectedSize;
    const qty = this.modalQuantity;
    const totalFormatted = this.formatPrice(product.priceUsd * qty);
    const secondaryFormatted = this.formatPriceSecondary(product.priceUsd * qty);

    const message = 
      `Hola ${STORE_CONFIG.storeName}! 👋\n` +
      `Quiero ordenar:\n` +
      `*${qty}x* ${product.name}\n` +
      `📏 Talla: *${size}*\n` +
      `🎨 Color: ${product.color}\n` +
      `💰 Total: *${totalFormatted}* (${secondaryFormatted})\n\n` +
      `¿Podrían indicarme los datos para concretar el pago? Gracias!`;

    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    this.closeQuickView();
  },

  addModalToCart() {
    if (!this.currentModalProduct) return;
    this.addToCart(this.currentModalProduct.id, this.modalSelectedSize, this.modalQuantity);
    this.closeQuickView();
    this.toggleCart();
  },

  // --------------------------------------------------------------------------
  // 7. GESTIÓN DEL CARRITO
  // --------------------------------------------------------------------------
  addToCart(productId, size, quantity = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${size}`;
    const existingIndex = this.cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        priceUsd: product.priceUsd,
        image: product.image,
        color: product.color,
        size: size,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`Añadido: ${product.name} (${size})`, "success");
    
    const cartBtn = document.getElementById("cart-toggle-btn");
    if (cartBtn) {
      cartBtn.classList.add("scale-110");
      setTimeout(() => cartBtn.classList.remove("scale-110"), 200);
    }
  },

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter(item => item.cartItemId !== cartItemId);
    this.saveCart();
    this.showToast("Prenda eliminada del pedido", "info");
  },

  updateCartQty(cartItemId, delta) {
    const item = this.cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(cartItemId);
    } else {
      this.saveCart();
    }
  },

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.showToast("Carrito vaciado", "info");
  },

  updateCartBadge() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = totalItems;
      if (totalItems > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });

    const floatingBar = document.getElementById("mobile-cart-bar");
    if (floatingBar) {
      if (totalItems > 0) {
        floatingBar.classList.remove("translate-y-full");
        const barCount = document.getElementById("mobile-cart-bar-count");
        const barTotal = document.getElementById("mobile-cart-bar-total");
        if (barCount) barCount.textContent = `${totalItems} prenda${totalItems === 1 ? '' : 's'}`;
        if (barTotal) {
          const totalUsd = this.cart.reduce((s, i) => s + (i.priceUsd * i.quantity), 0);
          barTotal.textContent = this.formatPrice(totalUsd);
        }
      } else {
        floatingBar.classList.add("translate-y-full");
      }
    }
  },

  renderCart() {
    const container = document.getElementById("cart-items-container");
    const footerContainer = document.getElementById("cart-footer-container");
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center">
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Tu carrito está vacío</p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Explora las camisetas y añade tus favoritas.
          </p>
        </div>
      `;
      if (footerContainer) footerContainer.classList.add("hidden");
      return;
    }

    if (footerContainer) footerContainer.classList.remove("hidden");

    let subtotalUsd = 0;

    container.innerHTML = this.cart.map(item => {
      const itemTotalUsd = item.priceUsd * item.quantity;
      subtotalUsd += itemTotalUsd;

      return `
        <div class="flex items-center gap-3 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded object-cover shrink-0 border border-zinc-200 dark:border-zinc-700" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">${item.name}</h4>
            <div class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              <span>Talla: <strong>${item.size}</strong></span>
            </div>
            <div class="mt-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
              ${this.formatPrice(itemTotalUsd)}
            </div>
          </div>
          <div class="flex flex-col items-end gap-1 shrink-0">
            <button 
              type="button" 
              onclick="KokiriApp.removeFromCart('${item.cartItemId}')"
              class="text-zinc-400 hover:text-red-500 p-0.5"
              title="Eliminar"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <div class="flex items-center border border-zinc-200 dark:border-zinc-700 rounded overflow-hidden bg-white dark:bg-zinc-900 text-xs">
              <button 
                type="button" 
                onclick="KokiriApp.updateCartQty('${item.cartItemId}', -1)"
                class="px-2 py-0.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >-</button>
              <span class="px-2 font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">${item.quantity}</span>
              <button 
                type="button" 
                onclick="KokiriApp.updateCartQty('${item.cartItemId}', 1)"
                class="px-2 py-0.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >+</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const subtotalEl = document.getElementById("cart-subtotal-price");
    const secondarySubtotalEl = document.getElementById("cart-subtotal-secondary");
    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotalUsd);
    if (secondarySubtotalEl) secondarySubtotalEl.textContent = this.formatPriceSecondary(subtotalUsd);
  },

  toggleCart() {
    const sheet = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (!sheet || !backdrop) return;

    const isOpen = sheet.classList.contains("open");
    if (isOpen) {
      sheet.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
    } else {
      this.renderCart();
      sheet.classList.add("open");
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  },

  checkoutCartViaWhatsApp() {
    if (this.cart.length === 0) return;

    let totalUsd = 0;
    let itemsText = "";

    this.cart.forEach((item, index) => {
      const lineTotal = item.priceUsd * item.quantity;
      totalUsd += lineTotal;
      itemsText += `${index + 1}. *${item.name}*\n   • Talla: *${item.size}* | Cantidad: *${item.quantity}* | Subtotal: $${lineTotal.toFixed(2)}\n`;
    });

    const totalFormatted = this.formatPrice(totalUsd);
    const secondaryFormatted = this.formatPriceSecondary(totalUsd);

    const message = 
      `Hola ${STORE_CONFIG.storeName}! 👋\n` +
      `Deseo ordenar los siguientes artículos:\n\n` +
      `${itemsText}\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `🧾 *TOTAL A PAGAR:* *${totalFormatted}* (${secondaryFormatted})\n` +
      `💱 Tasa BCV: ${this.bcvRate.toFixed(2)} Bs/$\n\n` +
      `Por favor indíquenme los datos bancarios para concretar mi compra. ¡Muchas gracias!`;

    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  },

  // --------------------------------------------------------------------------
  // 8. GUÍA DE TALLAS
  // --------------------------------------------------------------------------
  openSizeGuide() {
    const modal = document.getElementById("size-guide-modal");
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeSizeGuide() {
    const modal = document.getElementById("size-guide-modal");
    if (modal) modal.classList.remove("open");
    if (!this.currentModalProduct) {
      document.body.style.overflow = "";
    }
  },

  // --------------------------------------------------------------------------
  // 9. TOAST & LISTENERS
  // --------------------------------------------------------------------------
  showToast(message, type = "info") {
    const toast = document.getElementById("toast-notification");
    const toastMsg = document.getElementById("toast-message");
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  },

  setupEventListeners() {
    const searchInput = document.getElementById("search-input");
    const searchInputMobile = document.getElementById("search-input-mobile");

    const handleSearch = (e) => {
      this.searchQuery = e.target.value;
      if (searchInput && searchInput !== e.target) searchInput.value = this.searchQuery;
      if (searchInputMobile && searchInputMobile !== e.target) searchInputMobile.value = this.searchQuery;
      this.renderProducts();
    };

    if (searchInput) searchInput.addEventListener("input", handleSearch);
    if (searchInputMobile) searchInputMobile.addEventListener("input", handleSearch);

    const currencyToggleBtn = document.getElementById("currency-toggle-btn");
    if (currencyToggleBtn) {
      currencyToggleBtn.addEventListener("click", () => this.toggleCurrency());
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeQuickView();
        this.closeSizeGuide();
        const sheet = document.getElementById("cart-drawer");
        if (sheet && sheet.classList.contains("open")) {
          this.toggleCart();
        }
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  KokiriApp.init();
});
