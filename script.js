const products = [
  {
    id: "bolen-pisang-keju",
    name: "Bolen Pisang Keju",
    category: "pastry",
    label: "Pastry",
    price: 55000,
    desc: "Isi 10 pcs, pastry renyah dengan pisang dan keju.",
    image: "assets/product-bolen.png"
  },
  {
    id: "brownies-cokelat",
    name: "Brownies Cokelat",
    category: "cake",
    label: "Cake",
    price: 75000,
    desc: "Brownies fudgy dengan topping almond panggang.",
    image: "assets/product-brownies.png"
  },
  {
    id: "brownies-gulung",
    name: "Brownies Gulung",
    category: "cake",
    label: "Cake",
    price: 65000,
    desc: "Brownies panggang yang digulung dengan isian cokelat lumer.",
    image: "assets/product-brownies-gulung.jpg"
  },
  {
    id: "lapis-legit-mini",
    name: "Lapis Legit Mini",
    category: "cake",
    label: "Cake",
    price: 85000,
    desc: "Ukuran 12 cm, tekstur lembut dan wangi butter.",
    image: "assets/product-lapis-legit.jpg"
  },
  {
    id: "nastar-premium",
    name: "Nastar Premium",
    category: "pastry",
    label: "Pastry",
    price: 70000,
    desc: "Toples 450 g, isian nanas legit dan kulit lumer.",
    image: "assets/product-nastar.jpg"
  },
  {
    id: "kue-bagelen",
    name: "Kue Bagelen Premium",
    category: "pastry",
    label: "Pastry",
    price: 35000,
    desc: "Roti kering bagelen mentega manis renyah khas toko kue.",
    image: "assets/product-bagelen.jpg"
  },
  {
    id: "croissant-butter",
    name: "Croissant Butter",
    category: "pastry",
    label: "Pastry",
    price: 20000,
    desc: "Pastry mentega khas Perancis yang renyah di luar dan lembut di dalam.",
    image: "assets/product-croissant.jpg"
  },
  {
    id: "birthday-cake",
    name: "Birthday Cake",
    category: "cake",
    label: "Cake",
    price: 120000,
    desc: "Custom tulisan, rasa vanilla berry atau cokelat.",
    image: "assets/product-kue-ultah.jpg"
  },
  {
    id: "hampers-manis",
    name: "Hampers Manis",
    category: "hampers",
    label: "Hampers",
    price: 170000,
    desc: "Paket gift box isi bolen, cookies, dan brownies.",
    image: "assets/product-hampers-box.jpg"
  },
  {
    id: "cheese-roll",
    name: "Cheese Roll",
    category: "pastry",
    label: "Pastry",
    price: 40000,
    desc: "Isi 12 pcs, gurih manis untuk camilan kantor.",
    image: "assets/product-bolen.png"
  },
  {
    id: "corporate-box",
    name: "Corporate Box",
    category: "hampers",
    label: "Hampers",
    price: 180000,
    desc: "Paket premium untuk meeting, acara, dan klien.",
    image: "assets/product-hampers-box.jpg"
  }
];

let activeFilter = "all";
let searchQuery = "";
let cart = {};
let checkoutMap = null;
let checkoutMarker = null;

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const productGrid = document.querySelector("#product-grid");
const cartPanel = document.querySelector("#cart-panel");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutButton = document.querySelector("#checkout");
const checkoutMessage = document.querySelector("#checkout-message");
const deliveryFields = document.querySelector("#delivery-fields");
const orderAddress = document.querySelector("#order-address");

// Payment Modal Selectors
const paymentModal = document.querySelector("#payment-modal");
const closePayment = document.querySelector("#close-payment");
const payOrderId = document.querySelector("#pay-order-id");
const payOrderTotal = document.querySelector("#pay-order-total");
const paymentGatewayState = document.querySelector("#payment-gateway-state");
const paymentSuccessState = document.querySelector("#payment-success-state");
const payTabBtns = document.querySelectorAll(".pay-tab-btn");
const payTabContents = document.querySelectorAll(".payment-tab-content");
const copyBtns = document.querySelectorAll(".copy-btn");
const transferProofInput = document.querySelector("#transfer-proof");
const fileNameDisplay = document.querySelector("#file-name-display");
const paymentUploadForm = document.querySelector("#payment-upload-form");
const qrisDoneBtn = document.querySelector("#qris-done-btn");
const qrisCountdown = document.querySelector("#qris-countdown");
const successId = document.querySelector("#success-id");
const successName = document.querySelector("#success-name");
const successMethod = document.querySelector("#success-method");
const successTotal = document.querySelector("#success-total");
const successDoneBtn = document.querySelector("#success-done");
const successPrintBtn = document.querySelector("#success-print-btn");

// Admin Modal Selectors
const openAdminBtn = document.querySelector("#open-admin-btn");
const adminModal = document.querySelector("#admin-modal");
const closeAdmin = document.querySelector("#close-admin");
const adminLoginForm = document.querySelector("#admin-login-form");
const adminLoginState = document.querySelector("#admin-login-state");
const adminDashboardState = document.querySelector("#admin-dashboard-state");
const adminPasswordInput = document.querySelector("#admin-password");
const loginErrorMsg = document.querySelector("#login-error-msg");
const adminTabBtns = document.querySelectorAll(".admin-tab-btn");
const adminSectionContents = document.querySelectorAll(".admin-section-content");
const adminOrdersList = document.querySelector("#admin-orders-list");

const adminPromoForm = document.querySelector("#admin-promo-form");
const adminPromoCodeInput = document.querySelector("#admin-promo-code");
const adminPromoPercentInput = document.querySelector("#admin-promo-percent");
const promoSaveStatus = document.querySelector("#promo-save-status");

const adminAnnouncementForm = document.querySelector("#admin-announcement-form");
const adminAnnouncementTextarea = document.querySelector("#admin-announcement-text");
const newsSaveStatus = document.querySelector("#news-save-status");

const adminLogoutBtn = document.querySelector("#admin-logout-btn");

const receiptPopover = document.querySelector("#receipt-popover");
const closeReceiptPopover = document.querySelector("#close-receipt-popover");
const receiptPreviewImg = document.querySelector("#receipt-preview-img");
const noReceiptPlaceholder = document.querySelector("#no-receipt-placeholder");

// Customizer Modal Selectors
const customizerModal = document.querySelector("#product-customizer-modal");
const closeCustomizer = document.querySelector("#close-customizer");
const customizerForm = document.querySelector("#customizer-form");
const custProductName = document.querySelector("#cust-product-name");
const custProductDesc = document.querySelector("#cust-product-desc");
const custProductCategory = document.querySelector("#cust-product-category");
const customizerTotalPrice = document.querySelector("#customizer-total-price");
const cakeWritingInput = document.querySelector("#cake-writing");

let currentOrder = null;
let qrisInterval = null;
let currentReceiptBase64 = "";
let appliedPromoCode = "";
let activeCustomizerProductId = "";

// Initialize dynamic announcements & default promo configurations
function initAnnouncement() {
  dbGetSetting("announcement", "Promo Spesial: Dapatkan diskon 10% dengan kode promo MAMA10!").then(text => {
    document.querySelector("#announcement-text").textContent = text;
    // Also keep in localStorage for promo validation
    localStorage.setItem("wkcAnnouncement", text);
  });
}

function initPromoSettings() {
  dbGetSetting("promoCode", "MAMA10").then(code => {
    localStorage.setItem("wkcPromoCode", code);
  });
  dbGetSetting("promoPercent", "10").then(percent => {
    localStorage.setItem("wkcPromoPercent", percent);
  });
}

// Initialize Reviews
const defaultReviews = [
  { author: "Budi Santoso", rating: 5, text: "Bolen pisang kejunya legendaris banget! Kulitnya renyah, pisangnya manis legit, pas banget buat oleh-oleh." },
  { author: "Siti Rahma", rating: 5, text: "Kue lapis legitnya wangi butter premium. Teksturnya lembut dan rasanya pas, tidak kemanisan. Mama suka sekali!" },
  { author: "Dewi Lestari", rating: 4, text: "Brownies cokelat topping almondnya enak. Bagian luarnya shiny crust dan dalamnya fudgy banget. Pengiriman cepat." }
];

function initReviews() {
  dbGetReviews().then(reviews => {
    if (!reviews || reviews.length === 0) {
      // Save defaults
      defaultReviews.forEach(r => dbAddReview(r));
      localStorage.setItem("wkcReviews", JSON.stringify(defaultReviews));
    }
    renderReviewsList();
  });
}

function renderReviewsList() {
  dbGetReviews().then(reviews => {
    const reviewsListEl = document.querySelector("#customer-reviews-list");
    reviewsListEl.innerHTML = reviews
      .map(
        (r) => `
          <div class="review-card">
            <div class="review-card-header">
              <span class="review-author-name">${r.author}</span>
              <span class="review-stars">${"&#9733;".repeat(r.rating)}${"&#9734;".repeat(5 - r.rating)}</span>
            </div>
            <p>"${r.text}"</p>
          </div>
        `
      )
      .join("");
  });
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const author = document.querySelector("#review-author").value.trim();
  const rating = Number(document.querySelector("input[name='review-rating']:checked").value);
  const text = document.querySelector("#review-text").value.trim();
  
  const newReview = { author, rating, text };
  dbAddReview(newReview).then(() => {
    renderReviewsList();
  });
  
  const successMsg = document.querySelector("#review-success-msg");
  successMsg.textContent = "Ulasan Anda berhasil dikirim! Terima kasih.";
  
  document.querySelector("#add-review-form").reset();
  setTimeout(() => { successMsg.textContent = ""; }, 3000);
}

function renderProducts() {
  const query = searchQuery.trim().toLowerCase();
  const shown = products.filter((product) => {
    const categoryMatch = activeFilter === "all" || product.category === activeFilter;
    const searchMatch = !query || product.name.toLowerCase().includes(query) || product.desc.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });

  if (shown.length === 0) {
    productGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--muted); font-weight: 700;">Tidak ada kue yang cocok dengan pencarian Anda.</div>`;
    return;
  }

  productGrid.innerHTML = shown
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-body">
            <span class="product-meta">${product.label}</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-row">
              <span class="price">${rupiah.format(product.price)}</span>
              <button class="add-button" type="button" data-add="${product.id}">Tambah</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  const entries = Object.entries(cart).map(([cartKey, qty]) => {
    const parts = cartKey.split("::");
    const id = parts[0];
    const product = products.find((item) => item.id === id);
    
    if (parts.length > 1) {
      // Customizable cake options
      const size = parts[1];
      const toppings = parts[2] ? parts[2].split(",") : [];
      const writing = parts[3] || "";
      
      let optionPriceDiff = 0;
      if (size === "medium") optionPriceDiff += 35000;
      if (size === "large") optionPriceDiff += 70000;
      
      toppings.forEach(t => {
        if (t === "keju") optionPriceDiff += 5000;
        if (t === "almond") optionPriceDiff += 5000;
        if (t === "lilin") optionPriceDiff += 2000;
      });
      
      const unitPrice = product.price + optionPriceDiff;
      
      const toppingLabels = toppings.map(t => {
        if (t === "keju") return "Keju";
        if (t === "almond") return "Almond";
        if (t === "lilin") return "Lilin";
        return t;
      });
      
      let customLabel = `Ukuran: ${size === "mini" ? "Mini" : size === "medium" ? "Medium" : "Large"}`;
      if (toppingLabels.length > 0) customLabel += `, Topping: ${toppingLabels.join(", ")}`;
      if (writing) customLabel += `, Tulisan: "${writing}"`;
      
      return {
        ...product,
        price: unitPrice,
        qty,
        cartKey,
        customLabel,
        options: { size, toppings, writing }
      };
    }
    
    // Standard product
    return {
      ...product,
      qty,
      cartKey,
      customLabel: ""
    };
  });

  const totalQty = entries.reduce((sum, item) => sum + item.qty, 0);
  const total = entries.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = totalQty;
  
  // Calculate Promo Code Discounts
  let discountAmount = 0;
  if (appliedPromoCode) {
    const promoPercent = Number(localStorage.getItem("wkcPromoPercent") || 10);
    discountAmount = Math.round(total * (promoPercent / 100));
    document.querySelector("#cart-discount-row").hidden = false;
    document.querySelector("#applied-promo-label").textContent = appliedPromoCode;
    document.querySelector("#cart-discount").textContent = `-${rupiah.format(discountAmount)}`;
  } else {
    document.querySelector("#cart-discount-row").hidden = true;
  }

  const finalTotal = total - discountAmount;
  cartTotal.textContent = rupiah.format(finalTotal);
  cartEmpty.hidden = entries.length > 0;
  updateCheckoutButtonState();

  cartItems.innerHTML = entries
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            ${item.customLabel ? `<p class="cart-item-custom-options">${item.customLabel}</p>` : ""}
            <p>${rupiah.format(item.price)}</p>
          </div>
          <div class="qty" aria-label="Jumlah ${item.name}">
            <button type="button" data-dec="${item.cartKey}" aria-label="Kurangi ${item.name}">-</button>
            <span>${item.qty}</span>
            <button type="button" data-inc="${item.cartKey}" aria-label="Tambah ${item.name}">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

function addToCart(cartKey) {
  cart[cartKey] = (cart[cartKey] || 0) + 1;
  renderCart();
  checkoutMessage.textContent = "";
  openCart();
}

function changeQty(cartKey, delta) {
  const nextQty = (cart[cartKey] || 0) + delta;
  if (nextQty <= 0) {
    delete cart[cartKey];
  } else {
    cart[cartKey] = nextQty;
  }
  renderCart();
  checkoutMessage.textContent = "";
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function getCartEntries() {
  const entries = Object.entries(cart).map(([cartKey, qty]) => {
    const parts = cartKey.split("::");
    const id = parts[0];
    const product = products.find((item) => item.id === id);
    
    if (parts.length > 1) {
      const size = parts[1];
      const toppings = parts[2] ? parts[2].split(",") : [];
      const writing = parts[3] || "";
      
      let optionPriceDiff = 0;
      if (size === "medium") optionPriceDiff += 35000;
      if (size === "large") optionPriceDiff += 70000;
      
      toppings.forEach(t => {
        if (t === "keju") optionPriceDiff += 5000;
        if (t === "almond") optionPriceDiff += 5000;
        if (t === "lilin") optionPriceDiff += 2000;
      });
      
      const unitPrice = product.price + optionPriceDiff;
      
      let customLabel = `Ukuran: ${size === "mini" ? "Mini" : size === "medium" ? "Medium" : "Large"}`;
      if (toppings.length > 0) customLabel += `, Topping: ${toppings.join(", ")}`;
      if (writing) customLabel += `, Tulisan: "${writing}"`;
      
      return {
        ...product,
        price: unitPrice,
        qty,
        cartKey,
        customLabel,
        options: { size, toppings, writing }
      };
    }
    
    return {
      ...product,
      qty,
      cartKey,
      customLabel: ""
    };
  });
  return entries;
}

function updateFulfillmentFields() {
  const fulfillment = new FormData(checkoutForm).get("fulfillment");
  const isDelivery = fulfillment === "delivery";
  deliveryFields.hidden = !isDelivery;
  orderAddress.required = isDelivery;
  if (!isDelivery) {
    orderAddress.value = "";
  }
  updateCheckoutButtonState();
  if (isDelivery) {
    initCheckoutMap();
  }
}

function updateCheckoutButtonState() {
  const entries = Object.keys(cart);
  if (entries.length === 0) {
    checkoutButton.disabled = true;
    checkoutButton.textContent = "Buat pesanan";
    return;
  }

  const fulfillment = new FormData(checkoutForm).get("fulfillment");
  const isDelivery = fulfillment === "delivery";
  if (!isDelivery) {
    checkoutButton.disabled = false;
    checkoutButton.textContent = "Buat pesanan";
  } else {
    const lat = document.querySelector("#delivery-lat").value;
    const lng = document.querySelector("#delivery-lng").value;
    if (!lat || !lng) {
      checkoutButton.disabled = true;
      checkoutButton.textContent = "Pilih Lokasi di Peta";
    } else {
      const STORE_LAT = -8.0654;
      const STORE_LNG = 111.9024;
      const RADIUS_KM = 15;
      if (typeof L !== "undefined") {
        const storeLatLng = L.latLng(STORE_LAT, STORE_LNG);
        const markerLatLng = L.latLng(parseFloat(lat), parseFloat(lng));
        const distanceMeters = storeLatLng.distanceTo(markerLatLng);
        if (distanceMeters > RADIUS_KM * 1000) {
          checkoutButton.disabled = true;
          checkoutButton.textContent = "Di Luar Jangkauan (Max 15km)";
        } else {
          checkoutButton.disabled = false;
          checkoutButton.textContent = "Buat pesanan";
        }
      } else {
        checkoutButton.disabled = false;
        checkoutButton.textContent = "Buat pesanan";
      }
    }
  }
}

function initCheckoutMap() {
  const mapEl = document.querySelector("#checkout-delivery-map");
  if (!mapEl || typeof L === "undefined") return;

  // If map is already initialized, just invalidate size
  if (checkoutMap) {
    setTimeout(() => {
      checkoutMap.invalidateSize();
    }, 200);
    return;
  }

  const STORE_LAT = -8.0654;
  const STORE_LNG = 111.9024;
  const RADIUS_KM = 15;

  checkoutMap = L.map("checkout-delivery-map").setView([STORE_LAT, STORE_LNG], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(checkoutMap);

  // Store marker
  const storeIcon = L.divIcon({
    className: "store-map-marker-checkout",
    html: '<div style="background:#8B0000;color:#FFD700;padding:4px 8px;border-radius:20px;font-weight:700;font-size:10px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:1.5px solid #FFD700;">📍 Wisma Kue Chelsea</div>',
    iconSize: [140, 28],
    iconAnchor: [70, 28]
  });
  L.marker([STORE_LAT, STORE_LNG], { icon: storeIcon }).addTo(checkoutMap);

  // Delivery radius circle
  L.circle([STORE_LAT, STORE_LNG], {
    radius: RADIUS_KM * 1000,
    color: "#8B0000",
    weight: 2,
    fillColor: "#FFD700",
    fillOpacity: 0.08,
    dashArray: "6 4"
  }).addTo(checkoutMap);

  const statusEl = document.querySelector("#checkout-map-status");
  const latInput = document.querySelector("#delivery-lat");
  const lngInput = document.querySelector("#delivery-lng");

  // Initial state check
  if (!latInput.value || !lngInput.value) {
    checkoutButton.disabled = true;
    if (statusEl) {
      statusEl.textContent = "Silakan tentukan titik lokasi pengiriman di peta.";
      statusEl.className = "map-distance-status";
    }
  }

  // Handle map click
  checkoutMap.on("click", (e) => {
    const clickedLatLng = e.latlng;
    latInput.value = clickedLatLng.lat;
    lngInput.value = clickedLatLng.lng;

    // Update marker
    if (checkoutMarker) {
      checkoutMarker.setLatLng(clickedLatLng);
    } else {
      checkoutMarker = L.marker(clickedLatLng, { draggable: true }).addTo(checkoutMap);
      checkoutMarker.on("dragend", (event) => {
        const markerLatLng = event.target.getLatLng();
        latInput.value = markerLatLng.lat;
        lngInput.value = markerLatLng.lng;
        const dist = L.latLng(STORE_LAT, STORE_LNG).distanceTo(markerLatLng);
        updateDistanceStatus(dist);
        updateCheckoutButtonState();
      });
    }

    const dist = L.latLng(STORE_LAT, STORE_LNG).distanceTo(clickedLatLng);
    updateDistanceStatus(dist);
    updateCheckoutButtonState();
  });

  function updateDistanceStatus(distanceMeters) {
    const distanceKm = (distanceMeters / 1000).toFixed(2);
    if (distanceMeters > RADIUS_KM * 1000) {
      if (statusEl) {
        statusEl.textContent = `Jarak: ${distanceKm} km. Di luar batas radius 15 km!`;
        statusEl.className = "map-distance-status unavailable";
      }
    } else {
      if (statusEl) {
        statusEl.textContent = `Jarak: ${distanceKm} km. Lokasi dalam jangkauan delivery ✓`;
        statusEl.className = "map-distance-status available";
      }
    }
  }

  // Fix rendering issues for hidden maps
  setTimeout(() => {
    checkoutMap.invalidateSize();
  }, 200);
}

// Apply Promo Code
function applyPromoCode() {
  const codeInput = document.querySelector("#promo-code").value.trim().toUpperCase();
  const promoMsg = document.querySelector("#promo-message");
  const activeCode = localStorage.getItem("wkcPromoCode") || "MAMA10";
  
  if (!codeInput) {
    promoMsg.textContent = "Masukkan kode promo terlebih dahulu.";
    promoMsg.className = "promo-message error";
    return;
  }
  
  if (codeInput === activeCode) {
    appliedPromoCode = codeInput;
    promoMsg.textContent = `Kode promo ${codeInput} berhasil diterapkan!`;
    promoMsg.className = "promo-message success";
    renderCart();
  } else {
    appliedPromoCode = "";
    promoMsg.textContent = "Kode promo tidak valid.";
    promoMsg.className = "promo-message error";
    renderCart();
  }
}

// Payment Modal Controls
function startQrisCountdown() {
  if (qrisInterval) clearInterval(qrisInterval);
  let timeRemaining = 15 * 60; // 15 menit
  
  function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    qrisCountdown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  updateTimerDisplay();
  qrisCountdown.style.color = "";
  
  qrisInterval = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(qrisInterval);
      qrisCountdown.textContent = "EXPIRED";
      qrisCountdown.style.color = "red";
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function handleTabSwitch(event) {
  const tab = event.target.dataset.tab;
  payTabBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
  payTabContents.forEach(content => content.classList.toggle("active", content.id === `tab-${tab}`));
}

function handleCopy(event) {
  const text = event.target.dataset.copy;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = event.target.textContent;
    event.target.textContent = "Tersalin!";
    event.target.style.backgroundColor = "var(--gold)";
    event.target.style.color = "#800c0c";
    setTimeout(() => {
      event.target.textContent = originalText;
      event.target.style.backgroundColor = "";
      event.target.style.color = "";
    }, 1500);
  });
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    fileNameDisplay.textContent = `Terpilih: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentReceiptBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    fileNameDisplay.textContent = "Klik untuk memilih file bukti transfer...";
    currentReceiptBase64 = "";
  }
}

function completePayment() {
  if (qrisInterval) clearInterval(qrisInterval);
  
  // Transition to Success state
  paymentGatewayState.hidden = true;
  paymentSuccessState.hidden = false;
  
  // Populate success fields
  if (currentOrder) {
    successId.textContent = currentOrder.id;
    successName.textContent = currentOrder.customerName;
    successMethod.textContent = currentOrder.fulfillment;
    successTotal.textContent = rupiah.format(currentOrder.total);
    
    // Update stored order status to Paid if receipt uploaded, or leave as Pending/Paid
    const orders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
    const updated = orders.map(o => {
      if (o.id === currentOrder.id) {
        return { ...o, status: currentReceiptBase64 ? "Paid" : "Pending", receipt: currentReceiptBase64 };
      }
      return o;
    });
    localStorage.setItem("wkcOrders", JSON.stringify(updated));
    
    // Update in Supabase too
    dbUpdateOrderReceipt(currentOrder.id, currentReceiptBase64, currentReceiptBase64 ? "Paid" : "Pending");
  }
  
  // Clear Cart & reset checkout form & promo
  cart = {};
  appliedPromoCode = "";
  document.querySelector("#promo-code").value = "";
  document.querySelector("#promo-message").textContent = "";
  renderCart();
  checkoutForm.reset();
  
  // Clear checkout map marker
  if (checkoutMarker && checkoutMap) {
    checkoutMap.removeLayer(checkoutMarker);
    checkoutMarker = null;
  }
  
  updateFulfillmentFields();
  currentReceiptBase64 = "";
}

function closePaymentModal() {
  paymentModal.classList.remove("open");
  paymentModal.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
  if (qrisInterval) clearInterval(qrisInterval);
}

// Admin Panel Controls
function openAdminModal() {
  adminLoginState.hidden = false;
  adminDashboardState.hidden = true;
  adminPasswordInput.value = "";
  loginErrorMsg.textContent = "";
  
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
}

// Order Printing Logic
function printOrderReceipt(orderId) {
  dbGetOrders().then(orders => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    document.querySelector("#print-id").textContent = order.id;
    document.querySelector("#print-date").textContent = order.order_date ? new Date(order.order_date).toLocaleString("id-ID") : (order.orderDate ? new Date(order.orderDate).toLocaleString("id-ID") : "-");
    document.querySelector("#print-name").textContent = order.customer_name || order.customerName;
    document.querySelector("#print-phone").textContent = order.customer_phone || order.customerPhone;
    document.querySelector("#print-method").textContent = order.fulfillment;
    
    const addressRow = document.querySelector("#print-address-row");
    const addr = order.order_address || order.orderAddress;
    if (addr) {
      document.querySelector("#print-address").textContent = addr;
      addressRow.hidden = false;
    } else {
      addressRow.hidden = true;
    }
    
    // Populate print items list
    const printItemsList = document.querySelector("#print-items-list");
    const items = order.items || [];
    printItemsList.innerHTML = items
      .map(item => {
        let optionDesc = "";
        if (item.customLabel) {
          optionDesc = `<div class="print-item-options">* ${item.customLabel}</div>`;
        }
        return `
          <div class="print-item-row">
            <span class="print-item-name">
              ${item.name}
              ${optionDesc}
            </span>
            <span>${item.qty}</span>
            <span>${rupiah.format(item.price * item.qty)}</span>
          </div>
        `;
      })
      .join("");
      
    document.querySelector("#print-subtotal").textContent = rupiah.format(order.subtotal || order.total);
    
    const discountRow = document.querySelector("#print-discount-row");
    if (order.discount > 0) {
      document.querySelector("#print-discount").textContent = `-${rupiah.format(order.discount)}`;
      discountRow.hidden = false;
    } else {
      discountRow.hidden = true;
    }
    
    document.querySelector("#print-total").textContent = rupiah.format(order.total);
    
    const notesContainer = document.querySelector("#print-notes-container");
    const notesText = document.querySelector("#print-notes");
    
    let notes = [];
    const orderNote = order.order_note || order.orderNote;
    if (orderNote) notes.push(`Catatan order: ${orderNote}`);
    
    items.forEach(item => {
      if (item.options && item.options.writing) {
        notes.push(`[${item.name}] Tulisan: "${item.options.writing}"`);
      }
    });
    
    if (notes.length > 0) {
      notesText.innerHTML = notes.join("<br>");
      notesContainer.hidden = false;
    } else {
      notesContainer.hidden = true;
    }
    
    // Show the print template before printing
    const printTemplate = document.querySelector("#print-receipt-template");
    printTemplate.hidden = false;
    
    // Trigger print dialog
    setTimeout(() => {
      window.print();
      printTemplate.hidden = true;
    }, 100);
  });
}

function closeAdminModal() {
  adminModal.classList.remove("open");
  adminModal.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
}

function logoutAdmin() {
  adminLoginState.hidden = false;
  adminDashboardState.hidden = true;
  closeAdminModal();
}

function handleAdminTabSwitch(event) {
  const tab = event.target.dataset.adminTab;
  if (!tab) return;
  adminTabBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.adminTab === tab));
  adminSectionContents.forEach(content => content.classList.toggle("active", content.id === `admin-${tab}`));
  if (tab === "orders") renderAdminOrders();
}

function handleAdminLogin(event) {
  event.preventDefault();
  const password = adminPasswordInput.value;
  if (password === "WKC@mama2026!") {
    adminLoginState.hidden = true;
    adminDashboardState.hidden = false;
    loginErrorMsg.textContent = "";
    loadAdminDashboard();
  } else {
    loginErrorMsg.textContent = "Kata sandi salah. Coba lagi.";
  }
}

function loadAdminDashboard() {
  adminPromoCodeInput.value = localStorage.getItem("wkcPromoCode") || "MAMA10";
  adminPromoPercentInput.value = localStorage.getItem("wkcPromoPercent") || "10";
  adminAnnouncementTextarea.value = localStorage.getItem("wkcAnnouncement") || "";
  
  // Load database settings
  const dbUrlInput = document.querySelector("#admin-supabase-url");
  const dbKeyInput = document.querySelector("#admin-supabase-key");
  const tgTokenInput = document.querySelector("#admin-tg-token");
  const tgChatIdInput = document.querySelector("#admin-tg-chatid");
  if (dbUrlInput) dbUrlInput.value = localStorage.getItem("wkcSupabaseUrl") || "";
  if (dbKeyInput) dbKeyInput.value = localStorage.getItem("wkcSupabaseKey") || "";
  if (tgTokenInput) tgTokenInput.value = localStorage.getItem("wkcTgToken") || "";
  if (tgChatIdInput) tgChatIdInput.value = localStorage.getItem("wkcTgChatId") || "";
  
  renderAdminOrders();
}

function renderAdminOrders() {
  dbGetOrders().then(orders => {
    if (orders.length === 0) {
      adminOrdersList.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color: var(--muted);">Belum ada pesanan masuk.</td></tr>`;
      return;
    }
    
    adminOrdersList.innerHTML = orders
      .map(
        (order) => {
          const name = order.customer_name || order.customerName || "-";
          const phone = order.customer_phone || order.customerPhone || "-";
          const date = order.order_date || order.orderDate;
          return `
            <tr>
              <td><strong>${order.id}</strong></td>
              <td>
                <strong>${name}</strong><br>
                <small>${phone}</small>
              </td>
              <td>
                <span>${order.fulfillment}</span><br>
                <small>${date ? new Date(date).toLocaleString("id-ID") : "-"}</small>
              </td>
              <td><strong>${rupiah.format(order.total)}</strong></td>
              <td>
                <button class="view-proof-btn" data-order-id="${order.id}">Bukti</button>
                <button class="print-receipt-action-btn" data-print-order-id="${order.id}">Nota</button>
                <select class="order-status-select" data-order-id="${order.id}">
                  <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                  <option value="Paid" ${order.status === "Paid" ? "selected" : ""}>Lunas (Paid)</option>
                  <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Selesai</option>
                  <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Batal</option>
                </select>
              </td>
            </tr>
          `;
        }
      )
      .join("");
  });
}

function handlePromoSave(event) {
  event.preventDefault();
  const code = adminPromoCodeInput.value.trim().toUpperCase();
  const percent = adminPromoPercentInput.value.trim();
  localStorage.setItem("wkcPromoCode", code);
  localStorage.setItem("wkcPromoPercent", percent);
  dbSetSetting("promoCode", code);
  dbSetSetting("promoPercent", percent);
  promoSaveStatus.textContent = "Konfigurasi diskon berhasil disimpan!";
  setTimeout(() => { promoSaveStatus.textContent = ""; }, 2500);
  renderCart();
}

function handleAnnouncementSave(event) {
  event.preventDefault();
  const text = adminAnnouncementTextarea.value.trim();
  localStorage.setItem("wkcAnnouncement", text);
  dbSetSetting("announcement", text);
  document.querySelector("#announcement-text").textContent = text;
  newsSaveStatus.textContent = "Banner pengumuman berhasil diupdate!";
  setTimeout(() => { newsSaveStatus.textContent = ""; }, 2500);
}

function viewOrderReceipt(orderId) {
  const orders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
  const order = orders.find(o => o.id === orderId);
  if (order) {
    if (order.receipt) {
      receiptPreviewImg.src = order.receipt;
      receiptPreviewImg.hidden = false;
      noReceiptPlaceholder.hidden = true;
    } else {
      receiptPreviewImg.src = "";
      receiptPreviewImg.hidden = true;
      noReceiptPlaceholder.hidden = false;
    }
    receiptPopover.classList.add("open");
    receiptPopover.setAttribute("aria-hidden", "false");
  }
}

function closeReceiptPopoverModal() {
  receiptPopover.classList.remove("open");
  receiptPopover.setAttribute("aria-hidden", "true");
}

function handleStatusChange(orderId, newStatus) {
  dbUpdateOrderStatus(orderId, newStatus).then(() => {
    renderAdminOrders();
  });
}

// Product Customizer Modal Controls
function openCustomizer(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  activeCustomizerProductId = productId;
  custProductName.textContent = product.name;
  custProductDesc.textContent = product.desc;
  custProductCategory.textContent = product.label;
  
  customizerForm.reset();
  updateCustomizerPrice();
  
  customizerModal.classList.add("open");
  customizerModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
}

function closeCustomizerModal() {
  customizerModal.classList.remove("open");
  customizerModal.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
  activeCustomizerProductId = "";
}

function updateCustomizerPrice() {
  const product = products.find(p => p.id === activeCustomizerProductId);
  if (!product) return;
  
  const formData = new FormData(customizerForm);
  const size = formData.get("cake-size");
  const toppings = formData.getAll("cake-topping");
  
  let price = product.price;
  if (size === "medium") price += 35000;
  if (size === "large") price += 70000;
  
  toppings.forEach(t => {
    if (t === "keju") price += 5000;
    if (t === "almond") price += 5000;
    if (t === "lilin") price += 2000;
  });
  
  customizerTotalPrice.textContent = rupiah.format(price);
}

function handleCustomizerSubmit(event) {
  event.preventDefault();
  const product = products.find(p => p.id === activeCustomizerProductId);
  if (!product) return;
  
  const formData = new FormData(customizerForm);
  const size = formData.get("cake-size");
  const toppings = formData.getAll("cake-topping").join(",");
  const writing = cakeWritingInput.value.trim();
  
  const cartKey = `${activeCustomizerProductId}::${size}::${toppings}::${writing}`;
  
  addToCart(cartKey);
  closeCustomizerModal();
}

function handleOverlayClick() {
  closeCart();
  closePaymentModal();
  closeAdminModal();
  closeReceiptPopoverModal();
  closeCustomizerModal();
}

function checkout(event) {
  event.preventDefault();
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    openCart();
    return;
  }

  const formData = new FormData(checkoutForm);
  const fulfillment = formData.get("fulfillment");
  const fulfillmentLabel = fulfillment === "delivery" ? "Delivery (Kirim)" : "Pick Up (Ambil di Toko)";
  
  const subtotal = getCartEntries().reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = 0;
  if (appliedPromoCode) {
    const promoPercent = Number(localStorage.getItem("wkcPromoPercent") || 10);
    discount = Math.round(subtotal * (promoPercent / 100));
  }
  
  let finalAddress = formData.get("orderAddress").trim();
  if (fulfillment === "delivery") {
    const lat = document.querySelector("#delivery-lat").value;
    const lng = document.querySelector("#delivery-lng").value;
    if (lat && lng) {
      finalAddress += ` (Maps: https://www.google.com/maps/search/?api=1&query=${lat},${lng})`;
    }
  }

  const order = {
    id: `WKC-${Date.now().toString().slice(-6)}`,
    fulfillment: fulfillmentLabel,
    customerName: formData.get("customerName").trim(),
    customerPhone: formData.get("customerPhone").trim(),
    orderDate: formData.get("orderDate"),
    orderAddress: finalAddress,
    orderNote: formData.get("orderNote").trim(),
    items: getCartEntries(),
    subtotal: subtotal,
    discount: discount,
    total: subtotal - discount,
    status: "Pending",
    receipt: ""
  };

  const existingOrders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
  localStorage.setItem("wkcOrders", JSON.stringify([order, ...existingOrders].slice(0, 50)));
  
  // Save to Supabase
  dbSaveOrder(order);
  
  // Send Telegram notification
  sendTelegramNotification(order);
  
  // Get reCAPTCHA token (for anti-spam)
  getRecaptchaToken("checkout");

  currentOrder = order;

  payOrderId.textContent = order.id;
  payOrderTotal.textContent = rupiah.format(order.total);
  
  paymentGatewayState.hidden = false;
  paymentSuccessState.hidden = true;
  paymentUploadForm.reset();
  fileNameDisplay.textContent = "Klik untuk memilih file bukti transfer...";
  
  payTabBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === "bank"));
  payTabContents.forEach(content => content.classList.toggle("active", content.id === "tab-bank"));

  startQrisCountdown();

  closeCart();
  paymentModal.classList.add("open");
  paymentModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
}

document.addEventListener("click", (event) => {
  const addId = event.target.closest("[data-add]")?.dataset.add;
  const featureAddId = event.target.closest("[data-feature-add]")?.dataset.featureAdd;
  const incKey = event.target.closest("[data-inc]")?.dataset.inc;
  const decKey = event.target.closest("[data-dec]")?.dataset.dec;
  const filter = event.target.closest("[data-filter]")?.dataset.filter;

  if (addId) {
    const product = products.find(p => p.id === addId);
    if (product && product.category === "cake") {
      openCustomizer(addId);
    } else {
      addToCart(addId);
    }
  }
  if (featureAddId) {
    const product = products.find(p => p.id === featureAddId);
    if (product && product.category === "cake") {
      openCustomizer(featureAddId);
    } else {
      addToCart(featureAddId);
    }
  }
  if (incKey) changeQty(incKey, 1);
  if (decKey) changeQty(decKey, -1);

  if (filter) {
    activeFilter = filter;
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === filter);
    });
    renderProducts();
  }
  
  // Handle dynamically generated buttons in admin panel
  if (event.target.classList.contains("view-proof-btn")) {
    const orderId = event.target.dataset.orderId;
    viewOrderReceipt(orderId);
  }
  if (event.target.classList.contains("print-receipt-action-btn") && event.target.dataset.printOrderId) {
    const orderId = event.target.dataset.printOrderId;
    printOrderReceipt(orderId);
  }
});

// Search input keyup filtering
document.querySelector("#product-search-input").addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderProducts();
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
document.querySelector("#overlay").addEventListener("click", handleOverlayClick);
checkoutForm.addEventListener("submit", checkout);
checkoutForm.addEventListener("change", (event) => {
  if (event.target.name === "fulfillment") updateFulfillmentFields();
});

// Promo Events
document.querySelector("#apply-promo-btn").addEventListener("click", applyPromoCode);

// Payment Modal event listeners
closePayment.addEventListener("click", closePaymentModal);
payTabBtns.forEach(btn => btn.addEventListener("click", handleTabSwitch));
copyBtns.forEach(btn => btn.addEventListener("click", handleCopy));
transferProofInput.addEventListener("change", handleFileSelect);

paymentUploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  completePayment();
});

qrisDoneBtn.addEventListener("click", completePayment);
successDoneBtn.addEventListener("click", closePaymentModal);
successPrintBtn.addEventListener("click", () => {
  if (currentOrder) printOrderReceipt(currentOrder.id);
});

// Admin Dashboard event listeners
openAdminBtn.addEventListener("click", openAdminModal);
closeAdmin.addEventListener("click", closeAdminModal);
adminLoginForm.addEventListener("submit", handleAdminLogin);
adminTabBtns.forEach(btn => btn.addEventListener("click", handleAdminTabSwitch));
adminPromoForm.addEventListener("submit", handlePromoSave);
adminAnnouncementForm.addEventListener("submit", handleAnnouncementSave);
adminLogoutBtn.addEventListener("click", logoutAdmin);
closeReceiptPopover.addEventListener("click", closeReceiptPopoverModal);

// Listen to order status change event
adminOrdersList.addEventListener("change", (event) => {
  if (event.target.classList.contains("order-status-select")) {
    const orderId = event.target.dataset.orderId;
    const newStatus = event.target.value;
    handleStatusChange(orderId, newStatus);
  }
});

// Product Customizer Listeners
closeCustomizer.addEventListener("click", closeCustomizerModal);
customizerForm.addEventListener("change", updateCustomizerPrice);
customizerForm.addEventListener("submit", handleCustomizerSubmit);

// Reviews Form Listener
document.querySelector("#add-review-form").addEventListener("submit", handleReviewSubmit);

// Run Initializations
initDatabase();
initAnnouncement();
initPromoSettings();
initReviews();
renderProducts();
renderCart();
updateFulfillmentFields();

// Initialize delivery map when visible
setTimeout(() => { initDeliveryMap(); }, 1000);

// Cart persistence: load saved cart from localStorage
const savedCart = localStorage.getItem("wkcCart");
if (savedCart) {
  try {
    cart = JSON.parse(savedCart);
    renderCart();
  } catch (e) { /* ignore */ }
}

// Save cart to localStorage on every change
const originalRenderCart = renderCart;
renderCart = function() {
  originalRenderCart();
  localStorage.setItem("wkcCart", JSON.stringify(cart));
};

// Admin Database Settings handlers
const adminDbForm = document.querySelector("#admin-db-form");
if (adminDbForm) {
  adminDbForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = document.querySelector("#admin-supabase-url").value.trim();
    const key = document.querySelector("#admin-supabase-key").value.trim();
    localStorage.setItem("wkcSupabaseUrl", url);
    localStorage.setItem("wkcSupabaseKey", key);
    connectSupabase();
    const status = document.querySelector("#db-save-status");
    status.textContent = "Kredensial disimpan. Menghubungkan...";
    setTimeout(() => { status.textContent = ""; }, 3000);
  });
}

const migrateBtn = document.querySelector("#migrate-data-btn");
if (migrateBtn) {
  migrateBtn.addEventListener("click", async () => {
    const status = document.querySelector("#migrate-status");
    status.textContent = "Sedang migrasi data...";
    const result = await migrateLocalToCloud();
    status.textContent = result.message;
    setTimeout(() => { status.textContent = ""; }, 5000);
  });
}

const saveTgBtn = document.querySelector("#save-telegram-btn");
if (saveTgBtn) {
  saveTgBtn.addEventListener("click", () => {
    const token = document.querySelector("#admin-tg-token").value.trim();
    const chatId = document.querySelector("#admin-tg-chatid").value.trim();
    localStorage.setItem("wkcTgToken", token);
    localStorage.setItem("wkcTgChatId", chatId);
    const status = document.querySelector("#tg-save-status");
    status.textContent = "Pengaturan Telegram disimpan!";
    setTimeout(() => { status.textContent = ""; }, 3000);
  });
}

const testTgBtn = document.querySelector("#test-telegram-btn");
if (testTgBtn) {
  testTgBtn.addEventListener("click", async () => {
    const status = document.querySelector("#tg-save-status");
    const testOrder = {
      id: "TEST-001",
      customerName: "Test User",
      customerPhone: "08123456789",
      fulfillment: "Pick Up (Ambil di Toko)",
      orderDate: new Date().toISOString(),
      orderAddress: "",
      orderNote: "Ini adalah pesan test.",
      items: [{ name: "Bolen Pisang Keju", qty: 1, price: 55000, customLabel: "" }],
      subtotal: 55000,
      discount: 0,
      total: 55000
    };
    status.textContent = "Mengirim test notifikasi...";
    await sendTelegramNotification(testOrder);
    status.textContent = "Test notifikasi terkirim! Cek Telegram Anda.";
    setTimeout(() => { status.textContent = ""; }, 5000);
  });
}
