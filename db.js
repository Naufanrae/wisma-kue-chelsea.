// ====================================================================
// db.js — Hybrid Database Layer (Supabase + localStorage fallback)
// ====================================================================

let supabaseClient = null;

// --- Initialization ---
function initDatabase() {
  const url = localStorage.getItem("wkcSupabaseUrl");
  const key = localStorage.getItem("wkcSupabaseKey");

  // Set defaults on first load or if invalid
  if (!url || url === "null" || url === "undefined" || url.trim() === "") {
    localStorage.setItem("wkcSupabaseUrl", "https://ohfhabmcdbauacpxwrrq.supabase.co");
    localStorage.setItem("wkcSupabaseKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZmhhYm1jZGJhdWFjcHh3cnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MTYxMTgsImV4cCI6MjA5NTk5MjExOH0.OtgWpWHprRWsbtlWIeJsHQBoPbCYDQF1xmZzdVHq1FU");
  }

  // Set Telegram defaults or if invalid
  const tgToken = localStorage.getItem("wkcTgToken");
  if (!tgToken || tgToken === "null" || tgToken === "undefined" || tgToken.trim() === "") {
    localStorage.setItem("wkcTgToken", "8802365798:AAG2O_t22qUyke9ClTYsbWBIsCi9aqXoBIM");
    localStorage.setItem("wkcTgChatId", "6499043028");
  }

  connectSupabase();
}

function connectSupabase() {
  const url = localStorage.getItem("wkcSupabaseUrl");
  const key = localStorage.getItem("wkcSupabaseKey");

  if (url && key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      updateDbStatusBadge("connecting");
      // Test connection
      supabaseClient.from("settings").select("key").limit(1).then(({ error }) => {
        if (error) {
          console.warn("Supabase connection failed:", error.message);
          supabaseClient = null;
          updateDbStatusBadge("error");
        } else {
          updateDbStatusBadge("online");
        }
      });
    } catch (e) {
      console.warn("Supabase init error:", e);
      supabaseClient = null;
      updateDbStatusBadge("error");
    }
  } else {
    updateDbStatusBadge("offline");
  }
}

function isOnline() {
  return supabaseClient !== null;
}

function updateDbStatusBadge(state) {
  const badge = document.querySelector("#db-status-badge");
  if (!badge) return;
  badge.className = "db-status-badge " + state;
  const labels = {
    offline: "Lokal (Offline)",
    online: "Terhubung ke Supabase ✓",
    connecting: "Menghubungkan...",
    error: "Gagal Terhubung ✗"
  };
  badge.textContent = labels[state] || state;
}

// --- Orders ---
async function dbGetOrders() {
  if (isOnline()) {
    try {
      const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data) return data;
    } catch (e) { console.warn("dbGetOrders error:", e); }
  }
  return JSON.parse(localStorage.getItem("wkcOrders") || "[]");
}

async function dbSaveOrder(order) {
  // Always save locally as backup
  const localOrders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
  localStorage.setItem("wkcOrders", JSON.stringify([order, ...localOrders].slice(0, 50)));

  if (isOnline()) {
    try {
      const { error } = await supabaseClient.from("orders").insert({
        id: order.id,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        fulfillment: order.fulfillment,
        order_date: order.orderDate,
        order_address: order.orderAddress,
        order_note: order.orderNote,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        total: order.total,
        status: order.status,
        receipt: order.receipt || ""
      });
      if (error) console.warn("dbSaveOrder error:", error.message);
      return !error;
    } catch (e) { console.warn("dbSaveOrder error:", e); }
  }
  return true;
}

async function dbUpdateOrderStatus(orderId, newStatus) {
  // Update locally
  const orders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
  const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
  localStorage.setItem("wkcOrders", JSON.stringify(updated));

  if (isOnline()) {
    try {
      await supabaseClient.from("orders").update({ status: newStatus }).eq("id", orderId);
    } catch (e) { console.warn("dbUpdateOrderStatus error:", e); }
  }
}

async function dbUpdateOrderReceipt(orderId, receiptBase64, status) {
  // Update locally
  const orders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
  const updated = orders.map(o => {
    if (o.id === orderId) return { ...o, receipt: receiptBase64, status };
    return o;
  });
  localStorage.setItem("wkcOrders", JSON.stringify(updated));

  if (isOnline()) {
    try {
      await supabaseClient.from("orders").update({ receipt: receiptBase64, status }).eq("id", orderId);
    } catch (e) { console.warn("dbUpdateOrderReceipt error:", e); }
  }
}

// --- Reviews ---
async function dbGetReviews() {
  if (isOnline()) {
    try {
      const { data, error } = await supabaseClient
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data) return data;
    } catch (e) { console.warn("dbGetReviews error:", e); }
  }
  return JSON.parse(localStorage.getItem("wkcReviews") || "[]");
}

async function dbAddReview(review) {
  // Save locally
  const localReviews = JSON.parse(localStorage.getItem("wkcReviews") || "[]");
  localReviews.unshift(review);
  localStorage.setItem("wkcReviews", JSON.stringify(localReviews));

  if (isOnline()) {
    try {
      await supabaseClient.from("reviews").insert({
        author: review.author,
        rating: review.rating,
        text: review.text
      });
    } catch (e) { console.warn("dbAddReview error:", e); }
  }
}

// --- Settings (promo, announcement) ---
async function dbGetSetting(key, fallback) {
  if (isOnline()) {
    try {
      const { data, error } = await supabaseClient
        .from("settings")
        .select("value")
        .eq("key", key)
        .single();
      if (!error && data) return data.value;
    } catch (e) { console.warn("dbGetSetting error:", e); }
  }
  return localStorage.getItem("wkc_" + key) || fallback;
}

async function dbSetSetting(key, value) {
  localStorage.setItem("wkc_" + key, value);
  if (isOnline()) {
    try {
      await supabaseClient.from("settings").upsert({ key, value });
    } catch (e) { console.warn("dbSetSetting error:", e); }
  }
}

// --- Telegram Notification ---
async function sendTelegramNotification(order) {
  const botToken = localStorage.getItem("wkcTgToken");
  const chatId = localStorage.getItem("wkcTgChatId");

  if (!botToken || !chatId) return;

  const itemsText = order.items.map(item => {
    let line = `  • ${item.name} x${item.qty} = Rp${(item.price * item.qty).toLocaleString("id-ID")}`;
    if (item.customLabel) line += `\n    ↳ ${item.customLabel}`;
    return line;
  }).join("\n");

  const message = `🛒 *PESANAN BARU!*

📋 *ID:* ${order.id}
👤 *Nama:* ${order.customerName}
📱 *Telp:* ${order.customerPhone}
📦 *Metode:* ${order.fulfillment}
📅 *Tanggal:* ${order.orderDate ? new Date(order.orderDate).toLocaleString("id-ID") : "-"}
${order.orderAddress ? `📍 *Alamat:* ${order.orderAddress}` : ""}

🧁 *Pesanan:*
${itemsText}

💰 *Subtotal:* Rp${(order.subtotal || order.total).toLocaleString("id-ID")}
${order.discount > 0 ? `🏷️ *Diskon:* -Rp${order.discount.toLocaleString("id-ID")}` : ""}
💵 *TOTAL:* Rp${order.total.toLocaleString("id-ID")}

${order.orderNote ? `📝 *Catatan:* ${order.orderNote}` : ""}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown"
      })
    });
  } catch (e) {
    console.warn("Telegram notification failed:", e);
  }
}

// --- Data Migration ---
async function migrateLocalToCloud() {
  if (!isOnline()) return { success: false, message: "Database tidak terhubung." };

  let migratedOrders = 0;
  let migratedReviews = 0;

  // Migrate orders
  const localOrders = JSON.parse(localStorage.getItem("wkcOrders") || "[]");
  for (const order of localOrders) {
    try {
      const { error } = await supabaseClient.from("orders").upsert({
        id: order.id,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        fulfillment: order.fulfillment,
        order_date: order.orderDate,
        order_address: order.orderAddress,
        order_note: order.orderNote,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        total: order.total,
        status: order.status,
        receipt: order.receipt || ""
      });
      if (!error) migratedOrders++;
    } catch (e) { /* skip */ }
  }

  // Migrate reviews
  const localReviews = JSON.parse(localStorage.getItem("wkcReviews") || "[]");
  for (const review of localReviews) {
    try {
      await supabaseClient.from("reviews").insert({
        author: review.author,
        rating: review.rating,
        text: review.text
      });
      migratedReviews++;
    } catch (e) { /* skip duplicates */ }
  }

  // Migrate settings
  const promoCode = localStorage.getItem("wkcPromoCode");
  const promoPercent = localStorage.getItem("wkcPromoPercent");
  const announcement = localStorage.getItem("wkcAnnouncement");
  if (promoCode) await dbSetSetting("promoCode", promoCode);
  if (promoPercent) await dbSetSetting("promoPercent", promoPercent);
  if (announcement) await dbSetSetting("announcement", announcement);

  return {
    success: true,
    message: `Berhasil migrasi ${migratedOrders} pesanan dan ${migratedReviews} ulasan ke cloud.`
  };
}

// --- Delivery Map (Leaflet + OpenStreetMap) ---
let deliveryMap = null;

function initDeliveryMap() {
  const mapEl = document.querySelector("#delivery-map");
  if (!mapEl || typeof L === "undefined") return;

  // Coordinates for Jl. Yos Sudarso No 28, Tamanan, Tulungagung
  const STORE_LAT = -8.0654;
  const STORE_LNG = 111.9024;
  const RADIUS_KM = 15;

  deliveryMap = L.map("delivery-map").setView([STORE_LAT, STORE_LNG], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(deliveryMap);

  // Store marker
  const storeIcon = L.divIcon({
    className: "store-map-marker",
    html: '<div style="background:#8B0000;color:#FFD700;padding:6px 12px;border-radius:20px;font-weight:700;font-size:12px;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.3);border:2px solid #FFD700;">📍 Wisma Kue Chelsea</div>',
    iconSize: [180, 36],
    iconAnchor: [90, 36]
  });
  L.marker([STORE_LAT, STORE_LNG], { icon: storeIcon }).addTo(deliveryMap);

  // Delivery radius circle
  L.circle([STORE_LAT, STORE_LNG], {
    radius: RADIUS_KM * 1000,
    color: "#8B0000",
    weight: 2,
    fillColor: "#FFD700",
    fillOpacity: 0.08,
    dashArray: "8 6"
  }).addTo(deliveryMap);

  // Fix Leaflet render issue when map is in a hidden/scrolled container
  setTimeout(() => { deliveryMap.invalidateSize(); }, 500);
}

// --- reCAPTCHA v3 ---
async function getRecaptchaToken(action) {
  if (typeof grecaptcha === "undefined") return null;
  try {
    const token = await grecaptcha.execute("6LcucgktAAAAAlvQ71pfRYNFtyF_RjF2IXEuzNmv", { action: action || "checkout" });
    return token;
  } catch (e) {
    console.warn("reCAPTCHA error:", e);
    return null;
  }
}
