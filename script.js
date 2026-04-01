/* =====================================================
   Feastly — script.js
   Transformed from EasyShopping
   Handles:
     • Auth guard (sessionStorage, same as original)
     • Header user info & logout
     • Restaurant data model & card rendering
     • Menu page data & rendering
     • Search (restaurants + dishes, dropdown)
     • Filters (rating, delivery time, veg, price)
     • Cart (Map-based, qty controls, bill breakdown)
     • Payment modal (Card / UPI / Net Banking / COD)
     • Registration form
     • Active nav on scroll
   ===================================================== */

/* ─────────────────────────────────────────────────────
   1. AUTH GUARD
   Same logic as original — redirect if no session.
───────────────────────────────────────────────────── */
(function authGuard() {
  const user = sessionStorage.getItem("es_user");
  if (!user) {
    window.location.href = "login.html";
  }
})();

/* ─────────────────────────────────────────────────────
   2. RESTAURANT DATA MODEL
   Replaces product array with restaurant objects.
   Each restaurant has: id, name, cuisine, rating,
   deliveryTime, priceForTwo, isVeg, offer, image,
   eta (minutes, for sorting/filtering), and menu.
───────────────────────────────────────────────────── */
const restaurants = [
  {
    id: "nandhana",
    name: "Nandhana Palace",
    cuisine: "Biryani, South Indian, Meals",
    rating: 4.1,
    deliveryTime: "30–35 mins",
    etaMin: 30,
    priceForTwo: 300,
    isVeg: false,
    offer: "Flat ₹80 OFF",
    promoted: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=75",
    menu: [
      {
        category: "Biryani", emoji: "🍛",
        items: [
          { id: 101, name: "Chicken Biryani", price: 199, veg: false, desc: "Fragrant basmati rice with tender chicken, slow-cooked in aromatic spices.", tags: ["bestseller"], img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&q=70" },
          { id: 102, name: "Mutton Biryani", price: 249, veg: false, desc: "Slow-cooked mutton with saffron-infused basmati rice.", tags: ["spicy"], img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&q=70" },
          { id: 103, name: "Vegetable Biryani", price: 149, veg: true, desc: "Garden-fresh vegetables with aromatic basmati rice.", tags: [], img: "" },
          { id: 104, name: "Egg Biryani", price: 169, veg: false, desc: "Fluffy eggs cooked in spiced biryani masala with rice.", tags: ["new"], img: "" }
        ]
      },
      {
        category: "Meals & Rice", emoji: "🍽️",
        items: [
          { id: 105, name: "Full Meals (Veg)", price: 120, veg: true, desc: "Complete South Indian thali with rice, sambar, rasam, and accompaniments.", tags: ["bestseller"], img: "" },
          { id: 106, name: "Full Meals (Non-Veg)", price: 180, veg: false, desc: "Thali with rice, gravies, and chicken curry.", tags: [], img: "" },
          { id: 107, name: "Curd Rice", price: 80, veg: true, desc: "Cooling curd rice with mustard seasoning.", tags: [], img: "" }
        ]
      },
      {
        category: "Starters", emoji: "🍗",
        items: [
          { id: 108, name: "Chicken 65", price: 179, veg: false, desc: "Crispy deep-fried chicken with spicy yogurt marinade.", tags: ["spicy", "bestseller"], img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=70" },
          { id: 109, name: "Gobi Manchurian", price: 129, veg: true, desc: "Indo-Chinese cauliflower in tangy Manchurian sauce.", tags: [], img: "" },
          { id: 110, name: "Mutton Pepper Fry", price: 219, veg: false, desc: "Dry mutton cooked with cracked pepper and curry leaves.", tags: ["spicy"], img: "" }
        ]
      }
    ]
  },

  {
    id: "lapinoz",
    name: "La Pino'z Pizza",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.0,
    deliveryTime: "25–30 mins",
    etaMin: 25,
    priceForTwo: 400,
    isVeg: false,
    offer: "Buy 1 Get 1",
    promoted: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=75",
    menu: [
      {
        category: "Pizzas", emoji: "🍕",
        items: [
          { id: 201, name: "Farmhouse Pizza (M)", price: 299, veg: true, desc: "Garden fresh tomatoes, mushrooms and capsicum on a classic tomato base.", tags: ["bestseller"], img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=70" },
          { id: 202, name: "Chicken Tikka Pizza (M)", price: 349, veg: false, desc: "Juicy tikka chicken with desi spices on a creamy base.", tags: ["bestseller", "spicy"], img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=70" },
          { id: 203, name: "Margherita (M)", price: 199, veg: true, desc: "Classic tomato base, mozzarella and fresh basil.", tags: [], img: "" },
          { id: 204, name: "Paneer Makhani (L)", price: 449, veg: true, desc: "Creamy makhani sauce with fresh paneer chunks.", tags: [], img: "" },
          { id: 205, name: "BBQ Chicken (L)", price: 499, veg: false, desc: "Smoky BBQ base loaded with grilled chicken strips.", tags: ["spicy"], img: "" }
        ]
      },
      {
        category: "Sides & Breads", emoji: "🥖",
        items: [
          { id: 206, name: "Garlic Bread (4 pcs)", price: 99, veg: true, desc: "Toasted garlic bread with herb butter.", tags: ["bestseller"], img: "" },
          { id: 207, name: "Stuffed Garlic Bread", price: 149, veg: true, desc: "Garlic bread filled with cheese and jalapenos.", tags: [], img: "" },
          { id: 208, name: "Cheesy Dips", price: 59, veg: true, desc: "Four cheese dipping sauces.", tags: [], img: "" }
        ]
      },
      {
        category: "Beverages", emoji: "🥤",
        items: [
          { id: 209, name: "Pepsi (500ml)", price: 60, veg: true, desc: "", tags: [], img: "" },
          { id: 210, name: "Lime Soda", price: 70, veg: true, desc: "Fresh lime with sparkling soda.", tags: [], img: "" }
        ]
      }
    ]
  },

  {
    id: "burgerking",
    name: "Burger King",
    cuisine: "Burger, Fast Food, American",
    rating: 3.9,
    deliveryTime: "20–25 mins",
    etaMin: 20,
    priceForTwo: 200,
    isVeg: false,
    offer: "Flat ₹60 OFF",
    promoted: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75",
    menu: [
      {
        category: "Burgers", emoji: "🍔",
        items: [
          { id: 301, name: "Whopper Jr.", price: 149, veg: false, desc: "Classic flame-grilled beef patty with tomato, lettuce, and mayo.", tags: ["bestseller"], img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&q=70" },
          { id: 302, name: "Crispy Veg Burger", price: 99, veg: true, desc: "Crispy veg patty with fresh veggies and house sauce.", tags: [], img: "" },
          { id: 303, name: "Chicken Stacker", price: 179, veg: false, desc: "Double chicken patty with smoky sauce and cheddar.", tags: ["bestseller", "spicy"], img: "" },
          { id: 304, name: "Paneer King", price: 139, veg: true, desc: "Grilled paneer patty with zesty mayo and fresh greens.", tags: ["new"], img: "" }
        ]
      },
      {
        category: "Sides", emoji: "🍟",
        items: [
          { id: 305, name: "French Fries (Regular)", price: 79, veg: true, desc: "Golden crispy fries, lightly salted.", tags: [], img: "" },
          { id: 306, name: "Onion Rings", price: 89, veg: true, desc: "Beer-battered crispy onion rings.", tags: ["bestseller"], img: "" },
          { id: 307, name: "Chicken Nuggets (6 pcs)", price: 129, veg: false, desc: "Crispy chicken nuggets with dipping sauce.", tags: [], img: "" }
        ]
      },
      {
        category: "Beverages & Desserts", emoji: "🥤",
        items: [
          { id: 308, name: "Soft Drink (L)", price: 70, veg: true, desc: "Pepsi, 7Up or Mirinda.", tags: [], img: "" },
          { id: 309, name: "Chocolate Shake", price: 99, veg: true, desc: "Thick chocolate milkshake.", tags: [], img: "" },
          { id: 310, name: "Sundae Cup", price: 59, veg: true, desc: "Soft-serve vanilla with chocolate drizzle.", tags: [], img: "" }
        ]
      }
    ]
  },

  {
    id: "udupi",
    name: "Sri Udupi Park",
    cuisine: "South Indian, Breakfast, Cafe",
    rating: 4.5,
    deliveryTime: "15–20 mins",
    etaMin: 15,
    priceForTwo: 150,
    isVeg: true,
    offer: "20% OFF",
    promoted: false,
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=75",
    menu: [
      {
        category: "Dosas", emoji: "🥞",
        items: [
          { id: 401, name: "Masala Dosa", price: 80, veg: true, desc: "Crispy golden dosa filled with spiced potato masala. Served with sambar & chutneys.", tags: ["bestseller"], img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&q=70" },
          { id: 402, name: "Paper Dosa", price: 65, veg: true, desc: "Extra thin crispy dosa, served plain with chutneys.", tags: [], img: "" },
          { id: 403, name: "Onion Rava Dosa", price: 95, veg: true, desc: "Semolina dosa with onion and spices. Lacy and crisp.", tags: ["bestseller"], img: "" },
          { id: 404, name: "Mysore Masala Dosa", price: 90, veg: true, desc: "Red chutney spread inside with potato masala filling.", tags: ["spicy"], img: "" }
        ]
      },
      {
        category: "Idli & Vada", emoji: "🍚",
        items: [
          { id: 405, name: "Idli (2 pcs)", price: 50, veg: true, desc: "Soft steamed rice cakes with sambar and chutneys.", tags: ["bestseller"], img: "" },
          { id: 406, name: "Medu Vada (2 pcs)", price: 55, veg: true, desc: "Crispy lentil donuts with coconut chutney.", tags: [], img: "" },
          { id: 407, name: "Idli Vada Combo", price: 90, veg: true, desc: "2 idlis + 1 vada with sambar and chutneys.", tags: [], img: "" }
        ]
      },
      {
        category: "Beverages", emoji: "☕",
        items: [
          { id: 408, name: "Filter Coffee", price: 35, veg: true, desc: "South Indian decoction coffee with frothed milk.", tags: ["bestseller"], img: "" },
          { id: 409, name: "Masala Chai", price: 30, veg: true, desc: "Ginger and cardamom spiced tea.", tags: [], img: "" },
          { id: 410, name: "Fresh Lime Juice", price: 45, veg: true, desc: "Sweet / salt / mixed.", tags: [], img: "" }
        ]
      }
    ]
  },

  {
    id: "kfc",
    name: "KFC",
    cuisine: "Chicken, Burger, Fast Food",
    rating: 4.0,
    deliveryTime: "30–35 mins",
    etaMin: 30,
    priceForTwo: 350,
    isVeg: false,
    offer: "Flat ₹90 OFF",
    promoted: true,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=75",
    menu: [
      {
        category: "Fried Chicken", emoji: "🍗",
        items: [
          { id: 501, name: "Crispy Strips (3 pcs)", price: 199, veg: false, desc: "100% chicken breast strips with KFC's signature seasoning.", tags: ["bestseller"], img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&q=70" },
          { id: 502, name: "Hot Wings (6 pcs)", price: 249, veg: false, desc: "Fiery hot wings in KFC original seasoning.", tags: ["spicy", "bestseller"], img: "" },
          { id: 503, name: "Popcorn Chicken (L)", price: 179, veg: false, desc: "Bite-sized crispy chicken pieces.", tags: [], img: "" }
        ]
      },
      {
        category: "Burgers", emoji: "🍔",
        items: [
          { id: 504, name: "Zinger Burger", price: 169, veg: false, desc: "Spicy crispy chicken fillet in a soft sesame bun.", tags: ["bestseller", "spicy"], img: "" },
          { id: 505, name: "Tower Burger", price: 219, veg: false, desc: "Double chicken patty with hash brown and cheese.", tags: [], img: "" }
        ]
      },
      {
        category: "Combos", emoji: "🍱",
        items: [
          { id: 506, name: "Dinner Plate", price: 299, veg: false, desc: "2 chicken pieces + rice + coleslaw + beverage.", tags: ["bestseller"], img: "" },
          { id: 507, name: "Snack Box", price: 199, veg: false, desc: "Popcorn + strips + fries + dip.", tags: ["new"], img: "" }
        ]
      }
    ]
  },

  {
    id: "sweettruth",
    name: "Sweet Truth",
    cuisine: "Desserts, Cakes, Bakery",
    rating: 4.4,
    deliveryTime: "20–25 mins",
    etaMin: 20,
    priceForTwo: 220,
    isVeg: true,
    offer: "Free Dessert",
    promoted: false,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=75",
    menu: [
      {
        category: "Cakes & Pastries", emoji: "🎂",
        items: [
          { id: 601, name: "Chocolate Truffle Cake", price: 299, veg: true, desc: "Rich dark chocolate sponge with ganache frosting.", tags: ["bestseller"], img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=70" },
          { id: 602, name: "Red Velvet Slice", price: 149, veg: true, desc: "Velvety red cake with cream cheese frosting.", tags: ["bestseller"], img: "" },
          { id: 603, name: "Blueberry Cheesecake", price: 199, veg: true, desc: "Baked New York style cheesecake with blueberry compote.", tags: [], img: "" },
          { id: 604, name: "Tiramisu", price: 169, veg: true, desc: "Classic Italian espresso-soaked dessert.", tags: ["new"], img: "" }
        ]
      },
      {
        category: "Brownies & Cookies", emoji: "🍪",
        items: [
          { id: 605, name: "Fudge Brownie (2 pcs)", price: 99, veg: true, desc: "Dense, moist chocolate fudge brownies.", tags: ["bestseller"], img: "" },
          { id: 606, name: "Choco Chip Cookies (4 pcs)", price: 89, veg: true, desc: "Soft-baked cookies with dark chocolate chips.", tags: [], img: "" },
          { id: 607, name: "Jar Cake (Chocolate)", price: 149, veg: true, desc: "Layered chocolate cake in a mason jar.", tags: [], img: "" }
        ]
      }
    ]
  },

  {
    id: "subway",
    name: "Subway",
    cuisine: "Sandwich, Healthy, Fast Food",
    rating: 3.9,
    deliveryTime: "20–25 mins",
    etaMin: 20,
    priceForTwo: 200,
    isVeg: false,
    offer: "Buy 2 Get 1",
    promoted: false,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&q=75",
    menu: [
      {
        category: "Subs (6-inch)", emoji: "🥪",
        items: [
          { id: 701, name: "Veggie Delite", price: 149, veg: true, desc: "Fresh veggies on Italian herb & cheese bread.", tags: [], img: "" },
          { id: 702, name: "Chicken Tikka", price: 199, veg: false, desc: "Tandoori chicken strips with crunchy veggies and chipotle.", tags: ["bestseller", "spicy"], img: "" },
          { id: 703, name: "Turkey & Ham", price: 219, veg: false, desc: "Sliced turkey and ham with lettuce and honey mustard.", tags: [], img: "" },
          { id: 704, name: "Paneer Tikka", price: 189, veg: true, desc: "Tandoori paneer with fresh veggies and mint chutney.", tags: ["new"], img: "" }
        ]
      },
      {
        category: "Wraps", emoji: "🌯",
        items: [
          { id: 705, name: "Chicken Wrap", price: 229, veg: false, desc: "Grilled chicken, cheese, and veggies in a soft flour tortilla.", tags: ["bestseller"], img: "" },
          { id: 706, name: "Veggie Wrap", price: 199, veg: true, desc: "Fresh vegetables with hummus in a whole wheat wrap.", tags: [], img: "" }
        ]
      },
      {
        category: "Sides & Drinks", emoji: "🥤",
        items: [
          { id: 707, name: "Cookie (1 pc)", price: 49, veg: true, desc: "Freshly baked chocolate chip cookie.", tags: [], img: "" },
          { id: 708, name: "Soft Drink (M)", price: 60, veg: true, desc: "Pepsi, 7Up or Mirinda.", tags: [], img: "" }
        ]
      }
    ]
  },

  {
    id: "mainland",
    name: "Mainland China",
    cuisine: "Chinese, Asian, Dim Sum",
    rating: 3.7,
    deliveryTime: "40–45 mins",
    etaMin: 40,
    priceForTwo: 280,
    isVeg: false,
    offer: "Flat ₹100 OFF",
    promoted: false,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=75",
    menu: [
      {
        category: "Starters", emoji: "🥟",
        items: [
          { id: 801, name: "Veg Spring Rolls (4 pcs)", price: 149, veg: true, desc: "Crispy rolls filled with mixed vegetables.", tags: [], img: "" },
          { id: 802, name: "Chicken Dimsums (6 pcs)", price: 199, veg: false, desc: "Steamed chicken dumplings with chilli oil.", tags: ["bestseller"], img: "" },
          { id: 803, name: "Chilli Paneer (dry)", price: 179, veg: true, desc: "Crispy paneer tossed in Indo-Chinese chilli sauce.", tags: ["spicy"], img: "" }
        ]
      },
      {
        category: "Mains", emoji: "🍜",
        items: [
          { id: 804, name: "Hakka Noodles (Veg)", price: 189, veg: true, desc: "Stir-fried noodles with crisp vegetables and soy sauce.", tags: [], img: "" },
          { id: 805, name: "Chicken Fried Rice", price: 219, veg: false, desc: "Wok-tossed rice with chicken and egg.", tags: ["bestseller"], img: "" },
          { id: 806, name: "Chilli Chicken (gravy)", price: 249, veg: false, desc: "Tender chicken in spicy chilli garlic sauce.", tags: ["spicy", "bestseller"], img: "" },
          { id: 807, name: "Veg Manchurian (gravy)", price: 199, veg: true, desc: "Veggie balls in tangy Manchurian sauce with rice.", tags: [], img: "" }
        ]
      }
    ]
  }
];

/* ─────────────────────────────────────────────────────
   3. STATE
   Keeps Map-based cart exactly as original project,
   extended with quantity tracking.
───────────────────────────────────────────────────── */
const cart = new Map();   // itemId → { item, restaurantName, quantity }
let currentFilter = "All";
let currentRestaurant = null;   // set on restaurant page

/* ─────────────────────────────────────────────────────
   4. UTILITY HELPERS (preserved from original)
───────────────────────────────────────────────────── */
function formatPrice(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  return text.replace(regex, "<mark style='background:rgba(226,55,68,.15);border-radius:2px;padding:0 1px;'>$1</mark>");
}

/* ─────────────────────────────────────────────────────
   5. HEADER USER INFO & LOGOUT (preserved from original)
───────────────────────────────────────────────────── */
function initUserHeader() {
  const raw  = sessionStorage.getItem("es_user");
  if (!raw) return;
  const user = JSON.parse(raw);
  const area = document.getElementById("headerUserArea");
  if (!area) return;

  const initial = user.name.charAt(0).toUpperCase();
  area.innerHTML = `
    <div class="header-user-info">
      <div class="header-user-avatar">${initial}</div>
      <span style="max-width:80px;overflow:hidden;text-overflow:ellipsis;font-size:.8rem;color:rgba(255,255,255,.75)">
        ${user.isGuest ? "Guest" : user.name}
      </span>
      <button class="header-logout-btn" onclick="doLogout()">Logout</button>
    </div>`;
}

function doLogout() {
  sessionStorage.removeItem("es_user");
  window.location.href = "login.html";
}

/* ─────────────────────────────────────────────────────
   6. RENDER RESTAURANT CARDS (replaces renderTable)
───────────────────────────────────────────────────── */
function renderRestaurants(searchQuery = "") {
  const grid      = document.getElementById("restaurantGrid");
  const noResults = document.getElementById("noResults");
  const countEl   = document.getElementById("restaurantCount");
  if (!grid) return;

  const query = searchQuery.trim().toLowerCase();

  let filtered = restaurants.filter(r => {
    const matchQuery = !query ||
      r.name.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query) ||
      r.menu.some(cat =>
        cat.items.some(item => item.name.toLowerCase().includes(query))
      );

    let matchFilter = true;
    if (currentFilter === "rating")   matchFilter = r.rating >= 4.0;
    if (currentFilter === "fast")     matchFilter = r.etaMin <= 25;
    if (currentFilter === "veg")      matchFilter = r.isVeg === true;
    if (currentFilter === "under200") matchFilter = r.priceForTwo <= 200;
    if (!["All","rating","fast","veg","under200"].includes(currentFilter)) {
      // cuisine keyword filter
      matchFilter = r.cuisine.toLowerCase().includes(currentFilter.toLowerCase()) ||
                    r.menu.some(cat => cat.category.toLowerCase().includes(currentFilter.toLowerCase()));
    }

    return matchQuery && matchFilter;
  });

  if (countEl) countEl.textContent = `(${filtered.length} restaurants)`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  grid.innerHTML = filtered.map(r => {
    const ratingClass = r.rating >= 4.0 ? "" : (r.rating >= 3.5 ? "low" : "poor");
    return `
      <a class="restaurant-card" href="restaurant.html?id=${r.id}" onclick="setCurrentRestaurant('${r.id}')">
        <div class="rc-img-wrap">
          <img src="${r.image}" alt="${r.name}" loading="lazy" />
          ${r.promoted ? `<span class="rc-promo">Ad</span>` : ""}
          <span class="rc-time-badge">⏱ ${r.deliveryTime}</span>
          ${r.offer ? `<span class="rc-offer-badge">${r.offer}</span>` : ""}
        </div>
        <div class="rc-body">
          <div class="rc-top">
            <div class="rc-name">${r.name}</div>
            <div class="rc-rating ${ratingClass}">★ ${r.rating}</div>
          </div>
          <div class="rc-cuisine">${r.cuisine}</div>
          <div class="rc-meta">
            <span>🕐 ${r.deliveryTime}</span>
            <span class="rc-meta-sep">·</span>
            <span><strong>${formatPrice(r.priceForTwo)}</strong> for two</span>
            <span class="rc-meta-sep">·</span>
            <span>${r.isVeg ? "🟢 Pure Veg" : "🔴 Non-Veg"}</span>
          </div>
        </div>
      </a>`;
  }).join("");
}

/* ─────────────────────────────────────────────────────
   7. FILTER RESTAURANTS (replaces filterCategory)
───────────────────────────────────────────────────── */
function filterRestaurants(type, btn) {
  currentFilter = type;

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  const dd = document.getElementById("searchDropdown");
  if (dd) dd.classList.remove("open");

  renderRestaurants();

  const sec = document.getElementById("restaurants");
  if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Cuisine card click → filter by cuisine keyword */
function filterByCuisine(keyword) {
  currentFilter = keyword;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  renderRestaurants();
  const sec = document.getElementById("restaurants");
  if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─────────────────────────────────────────────────────
   8. SEARCH — HOMEPAGE (replaces searchProducts)
───────────────────────────────────────────────────── */
function searchRestaurants() {
  const query    = document.getElementById("searchInput").value.trim().toLowerCase();
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return;

  renderRestaurants(query);

  if (query.length < 2) {
    dropdown.innerHTML = "";
    dropdown.classList.remove("open");
    return;
  }

  // Build dropdown suggestions: restaurants + dishes
  const suggestions = [];

  restaurants.forEach(r => {
    if (r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query)) {
      suggestions.push({ type: "restaurant", emoji: "🍽️", main: r.name, sub: r.cuisine, value: r.name });
    }
    r.menu.forEach(cat => {
      cat.items.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
          suggestions.push({ type: "dish", emoji: item.veg ? "🟢" : "🔴", main: item.name, sub: `in ${r.name}`, value: item.name });
        }
      });
    });
  });

  if (suggestions.length === 0) {
    dropdown.innerHTML = `<div class="search-result-item"><span class="sri-name">No results found for "${query}"</span></div>`;
    dropdown.classList.add("open");
    return;
  }

  const limited = suggestions.slice(0, 7);
  dropdown.innerHTML = limited.map(s => `
    <div class="search-result-item" onclick="selectSearchResult('${s.value}')">
      <span class="sri-emoji">${s.emoji}</span>
      <div>
        <div class="sri-name">${highlightMatch(s.main, query)}</div>
        <div class="sri-cat">${s.sub}</div>
      </div>
    </div>`).join("");

  dropdown.classList.add("open");
}

function selectSearchResult(name) {
  const input = document.getElementById("searchInput");
  if (input) input.value = name;
  const dd = document.getElementById("searchDropdown");
  if (dd) dd.classList.remove("open");
  renderRestaurants(name.toLowerCase());
}

/* ─────────────────────────────────────────────────────
   9. RESTAURANT PAGE — LOAD MENU
───────────────────────────────────────────────────── */
function setCurrentRestaurant(id) {
  sessionStorage.setItem("feastly_restaurant_id", id);
}

function loadRestaurantPage() {
  // Get restaurant id from URL or sessionStorage
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || sessionStorage.getItem("feastly_restaurant_id");
  if (!id) {
    document.getElementById("menuSections").innerHTML =
      '<p style="text-align:center;padding:60px;color:var(--clr-muted)">Restaurant not found. <a href="index.html" style="color:var(--clr-primary)">Go back home</a></p>';
    return;
  }

  const restaurant = restaurants.find(r => r.id === id);
  if (!restaurant) return;

  currentRestaurant = restaurant;
  sessionStorage.setItem("feastly_restaurant_id", id);

  // Hero
  document.title = `Feastly — ${restaurant.name}`;
  const heroImg = document.getElementById("menuHeroImg");
  if (heroImg) { heroImg.src = restaurant.image; heroImg.alt = restaurant.name; }
  const heroName = document.getElementById("menuHeroName");
  if (heroName) heroName.textContent = restaurant.name;

  const heroTags = document.getElementById("menuHeroTags");
  if (heroTags) {
    heroTags.innerHTML = `
      <span class="menu-tag rating-tag">★ ${restaurant.rating}</span>
      <span class="menu-tag">${restaurant.isVeg ? "🟢 Pure Veg" : "🔴 Non-Veg"}</span>
      ${restaurant.offer ? `<span class="menu-tag">🏷️ ${restaurant.offer}</span>` : ""}
    `;
  }
  const heroMeta = document.getElementById("menuHeroMeta");
  if (heroMeta) {
    heroMeta.innerHTML = `
      <span>⏱️ ${restaurant.deliveryTime}</span>
      <span>·</span>
      <span>💰 ${formatPrice(restaurant.priceForTwo)} for two</span>
      <span>·</span>
      <span>🍽️ ${restaurant.cuisine}</span>
    `;
  }

  // Category nav
  const nav = document.getElementById("menuNavInner");
  if (nav) {
    nav.innerHTML = restaurant.menu.map((cat, i) =>
      `<button class="menu-cat-btn ${i === 0 ? "active" : ""}"
        onclick="scrollToCategory('cat-${i}', this)">${cat.emoji} ${cat.category}</button>`
    ).join("");
  }

  // Menu sections
  const sectionsEl = document.getElementById("menuSections");
  if (!sectionsEl) return;

  sectionsEl.innerHTML = restaurant.menu.map((cat, catIdx) => `
    <div class="menu-section" id="cat-${catIdx}">
      <div class="menu-section-title">
        ${cat.emoji} ${cat.category}
        <span class="menu-section-count">${cat.items.length}</span>
      </div>
      ${cat.items.map(item => buildMenuItemCard(item, restaurant.name)).join("")}
    </div>
  `).join("");

  // Sync cart UI
  updateCartUI();
}

function scrollToCategory(id, btn) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelectorAll(".menu-cat-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function buildMenuItemCard(item, restaurantName) {
  const cartEntry = cart.get(item.id);
  const qty = cartEntry ? cartEntry.quantity : 0;

  const tagsHtml = item.tags.map(t => {
    if (t === "bestseller") return `<span class="mi-tag bestseller">⭐ Bestseller</span>`;
    if (t === "spicy")      return `<span class="mi-tag spicy">🌶️ Spicy</span>`;
    if (t === "new")        return `<span class="mi-tag new-item">🆕 New</span>`;
    return "";
  }).join("");

  const imgHtml = item.img
    ? `<img class="mi-img" src="${item.img}" alt="${item.name}" loading="lazy" />`
    : `<div class="mi-img-placeholder">${item.veg ? "🥗" : "🍗"}</div>`;

  const actionHtml = qty > 0
    ? `<div class="mi-qty-ctrl">
         <button class="mi-qty-btn" onclick="changeItemQty(${item.id},-1,'${restaurantName}')">−</button>
         <span class="mi-qty-val">${qty}</span>
         <button class="mi-qty-btn" onclick="changeItemQty(${item.id},1,'${restaurantName}')">+</button>
       </div>`
    : `<button class="mi-add-btn" onclick="addMenuItem(${item.id},'${restaurantName}')">ADD +</button>`;

  return `
    <div class="menu-item" id="mi-${item.id}">
      <div class="mi-veg-badge ${item.veg ? "veg" : "nonveg"}"></div>
      <div class="mi-info">
        <div class="mi-name">${item.name}</div>
        ${item.desc ? `<div class="mi-desc">${item.desc}</div>` : ""}
        <div class="mi-price">${formatPrice(item.price)}</div>
        ${tagsHtml ? `<div class="mi-tags">${tagsHtml}</div>` : ""}
      </div>
      <div class="mi-right">
        ${imgHtml}
        <div id="mi-action-${item.id}">${actionHtml}</div>
      </div>
    </div>`;
}

/* Search on menu page */
function searchMenuItems() {
  if (!currentRestaurant) return;
  const query = (document.getElementById("searchInput").value || "").trim().toLowerCase();
  const dropdown = document.getElementById("searchDropdown");

  if (query.length < 2) {
    if (dropdown) dropdown.classList.remove("open");
    return;
  }

  const matches = [];
  currentRestaurant.menu.forEach(cat => {
    cat.items.forEach(item => {
      if (item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query))) {
        matches.push({ item, cat });
      }
    });
  });

  if (!dropdown) return;

  if (matches.length === 0) {
    dropdown.innerHTML = `<div class="search-result-item"><span class="sri-name">No items found</span></div>`;
  } else {
    dropdown.innerHTML = matches.slice(0, 6).map(m => `
      <div class="search-result-item" onclick="scrollToItem(${m.item.id})">
        <span class="sri-emoji">${m.item.veg ? "🟢" : "🔴"}</span>
        <div>
          <div class="sri-name">${highlightMatch(m.item.name, query)}</div>
          <div class="sri-cat">${m.cat.category} · ${formatPrice(m.item.price)}</div>
        </div>
      </div>`).join("");
  }
  dropdown.classList.add("open");
}

function scrollToItem(itemId) {
  const el = document.getElementById("mi-" + itemId);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.style.background = "rgba(226,55,68,.06)"; setTimeout(() => el.style.background = "", 1500); }
  const dd = document.getElementById("searchDropdown");
  if (dd) dd.classList.remove("open");
}

/* ─────────────────────────────────────────────────────
   10. CART FUNCTIONS (adapted from original)
   Core Map logic unchanged, extended with qty & fees.
───────────────────────────────────────────────────── */

/** Get all menu items flattened across all restaurants */
function getAllItems() {
  const all = {};
  restaurants.forEach(r => r.menu.forEach(cat => cat.items.forEach(item => { all[item.id] = { item, restaurant: r }; })));
  return all;
}

/** Add a menu item from the restaurant menu page */
function addMenuItem(itemId, restaurantName) {
  const allItems = getAllItems();
  const found = allItems[itemId];
  if (!found) return;

  // Warn if cart has items from a different restaurant
  if (cart.size > 0) {
    const firstEntry = cart.values().next().value;
    if (firstEntry.restaurantName !== restaurantName) {
      if (!confirm(`Your cart has items from "${firstEntry.restaurantName}". Clear cart and start fresh from "${restaurantName}"?`)) return;
      cart.clear();
    }
  }

  if (cart.has(itemId)) {
    cart.get(itemId).quantity += 1;
  } else {
    cart.set(itemId, { item: found.item, restaurantName, quantity: 1 });
  }

  refreshMenuItemAction(itemId, restaurantName);
  updateCartUI();
  showToast(`"${found.item.name}" added to cart 🛒`);
}

/** Change quantity from + / − buttons on menu page */
function changeItemQty(itemId, delta, restaurantName) {
  if (!cart.has(itemId)) return;
  const entry = cart.get(itemId);
  entry.quantity += delta;
  if (entry.quantity <= 0) {
    cart.delete(itemId);
  }
  refreshMenuItemAction(itemId, restaurantName);
  updateCartUI();
}

/** Change quantity from cart panel */
function changeCartQty(itemId, delta) {
  if (!cart.has(itemId)) return;
  const entry = cart.get(itemId);
  const restaurantName = entry.restaurantName;
  entry.quantity += delta;
  if (entry.quantity <= 0) {
    cart.delete(itemId);
  }
  refreshMenuItemAction(itemId, restaurantName);
  updateCartUI();
}

/** Remove item entirely from cart */
function removeFromCart(itemId) {
  if (!cart.has(itemId)) return;
  const entry = cart.get(itemId);
  const name = entry.item.name;
  const restaurantName = entry.restaurantName;
  cart.delete(itemId);
  refreshMenuItemAction(itemId, restaurantName);
  updateCartUI();
  showToast(`"${name}" removed`);
}

/** Re-render the ADD / qty control for a specific menu item */
function refreshMenuItemAction(itemId, restaurantName) {
  const actionEl = document.getElementById("mi-action-" + itemId);
  if (!actionEl) return;

  const cartEntry = cart.get(itemId);
  const qty = cartEntry ? cartEntry.quantity : 0;

  if (qty > 0) {
    actionEl.innerHTML = `
      <div class="mi-qty-ctrl">
        <button class="mi-qty-btn" onclick="changeItemQty(${itemId},-1,'${restaurantName}')">−</button>
        <span class="mi-qty-val">${qty}</span>
        <button class="mi-qty-btn" onclick="changeItemQty(${itemId},1,'${restaurantName}')">+</button>
      </div>`;
  } else {
    actionEl.innerHTML = `<button class="mi-add-btn" onclick="addMenuItem(${itemId},'${restaurantName}')">ADD +</button>`;
  }
}

/** Delivery fee logic: free above ₹299, else ₹40 */
function getDeliveryFee(subtotal) {
  return subtotal >= 299 ? 0 : 40;
}

/** Rebuild the entire cart UI */
function updateCartUI() {
  const badge    = document.getElementById("cartBadge");
  const cartList = document.getElementById("cartList");
  const chkBtn   = document.getElementById("cartCheckoutBtn");
  const summaryBlock = document.getElementById("cartSummaryBlock");
  const restaurantBar = document.getElementById("cartRestaurantBar");
  const restaurantNameEl = document.getElementById("cartRestaurantName");

  let totalItems = 0;
  cart.forEach(e => { totalItems += e.quantity; });

  // Badge
  if (badge) {
    badge.textContent = totalItems;
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 300);
  }

  if (totalItems === 0) {
    if (cartList) cartList.innerHTML = `<li class="cart-empty"><div class="cart-empty-icon">🍽️</div><p>Your cart is empty.<br/>Add items to get started.</p></li>`;
    if (summaryBlock) summaryBlock.style.display = "none";
    if (chkBtn) chkBtn.style.display = "none";
    if (restaurantBar) restaurantBar.style.display = "none";
    updateSidebarCart();
    return;
  }

  // Restaurant bar
  const firstEntry = cart.values().next().value;
  if (restaurantBar) restaurantBar.style.display = "flex";
  if (restaurantNameEl) restaurantNameEl.textContent = firstEntry.restaurantName;

  // Cart items
  let subtotal = 0;
  const items = [];
  cart.forEach(({ item, restaurantName, quantity }) => {
    const lineTotal = item.price * quantity;
    subtotal += lineTotal;
    items.push(`
      <li class="cart-item">
        <div class="veg-dot ${item.veg ? "veg" : "nonveg"}"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-sub">${formatPrice(item.price)} each</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" onclick="changeCartQty(${item.id},-1)">−</button>
          <span class="cart-qty-val">${quantity}</span>
          <button class="cart-qty-btn" onclick="changeCartQty(${item.id},1)">+</button>
        </div>
        <span class="cart-item-price">${formatPrice(lineTotal)}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </li>`);
  });

  if (cartList) cartList.innerHTML = items.join("");

  // Bill calculation
  const delivery = getDeliveryFee(subtotal);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  if (summaryBlock) summaryBlock.style.display = "block";
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("cartItemTotal",   formatPrice(subtotal));
  set("cartDeliveryFee", delivery === 0 ? "FREE" : formatPrice(delivery));
  set("cartTax",         formatPrice(tax));
  set("cartTotal",       formatPrice(total));

  if (chkBtn) chkBtn.style.display = "block";

  updateSidebarCart(subtotal, delivery, tax, total);
}

/** Update the sidebar cart on restaurant page */
function updateSidebarCart(subtotal, delivery, tax, total) {
  const body    = document.getElementById("sidebarCartBody");
  const bill    = document.getElementById("sidebarBill");
  const chkBtn  = document.getElementById("sidebarCheckoutBtn");
  if (!body) return;

  if (cart.size === 0) {
    body.innerHTML = `<div class="cs-empty"><div class="cs-empty-icon">🍽️</div><p>Add items from the menu</p></div>`;
    if (bill) bill.style.display = "none";
    if (chkBtn) { chkBtn.textContent = "Add items to checkout"; chkBtn.disabled = true; }
    return;
  }

  const items = [];
  cart.forEach(({ item, quantity }) => {
    items.push(`
      <div class="cs-item">
        <div class="veg-dot ${item.veg ? "veg" : "nonveg"}" style="flex-shrink:0"></div>
        <span class="cs-item-name">${item.name}</span>
        <div class="cs-item-qty">
          <button class="cs-qty-btn" onclick="changeCartQty(${item.id},-1)">−</button>
          <span class="cs-qty-val">${quantity}</span>
          <button class="cs-qty-btn" onclick="changeCartQty(${item.id},1)">+</button>
        </div>
        <span class="cs-item-price">${formatPrice(item.price * quantity)}</span>
      </div>`);
  });

  body.innerHTML = `<div class="cs-items">${items.join("")}</div>`;

  if (bill) {
    bill.style.display = "flex";
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("sbItemTotal", formatPrice(subtotal));
    set("sbDelivery",  delivery === 0 ? "FREE" : formatPrice(delivery));
    set("sbTax",       formatPrice(tax));
    set("sbTotal",     formatPrice(total));
  }

  if (chkBtn) {
    chkBtn.textContent = `Proceed to Pay ${formatPrice(total)} →`;
    chkBtn.disabled = false;
  }
}

/** Toggle the cart slide panel */
function toggleCartPanel() {
  document.getElementById("cartPanel").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

/* ─────────────────────────────────────────────────────
   11. PAYMENT MODAL (adapted from original)
───────────────────────────────────────────────────── */
function openPayment() {
  if (cart.size === 0) { showToast("⚠️ Your cart is empty!"); return; }

  // Close cart panel
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");

  // Build order summary
  let subtotal = 0;
  let itemsHtml = "";
  cart.forEach(({ item, quantity }) => {
    const lineTotal = item.price * quantity;
    subtotal += lineTotal;
    itemsHtml += `
      <div class="order-line">
        <span>${item.name} × ${quantity}</span>
        <span>${formatPrice(lineTotal)}</span>
      </div>`;
  });

  const delivery = getDeliveryFee(subtotal);
  const tax      = Math.round(subtotal * 0.05);
  const total    = subtotal + delivery + tax;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  document.getElementById("payOrderItems").innerHTML = itemsHtml;
  set("payDeliveryFee", delivery === 0 ? "FREE" : formatPrice(delivery));
  set("payTax",         formatPrice(tax));
  set("payOrderTotal",  formatPrice(total));

  // ETA based on restaurant
  const firstEntry = cart.size > 0 ? cart.values().next().value : null;
  if (firstEntry) {
    const r = restaurants.find(res => res.name === firstEntry.restaurantName);
    const etaEl = document.getElementById("payETA");
    if (etaEl && r) etaEl.textContent = r.deliveryTime;
  }

  set("payNowBtn", `Place Order — ${formatPrice(total)} ✓`);
  const payBtn = document.getElementById("payNowBtn");
  if (payBtn) payBtn.textContent = `Place Order — ${formatPrice(total)} ✓`;

  // Reset method tab
  selectPayMethod("card", document.querySelector(".pay-tab"));
  document.getElementById("payFormView").style.display  = "block";
  document.getElementById("paySuccessView").classList.remove("show");
  document.getElementById("paymentModal").classList.add("open");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("open");
}

function selectPayMethod(method, btn) {
  document.querySelectorAll(".pay-tab").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  document.querySelectorAll(".pay-fields").forEach(f => f.classList.remove("visible"));
  const fieldsEl = document.getElementById("fields-" + method);
  if (fieldsEl) fieldsEl.classList.add("visible");

  // Recalculate total for COD label
  let subtotal = 0;
  cart.forEach(({ item, quantity }) => { subtotal += item.price * quantity; });
  const delivery = getDeliveryFee(subtotal);
  const tax      = Math.round(subtotal * 0.05);
  const total    = subtotal + delivery + tax + (method === "cod" ? 20 : 0);

  const payBtn = document.getElementById("payNowBtn");
  if (payBtn) payBtn.textContent =
    method === "cod"
      ? `Confirm COD Order — ${formatPrice(total)} ✓`
      : `Place Order — ${formatPrice(total)} ✓`;
}

function processPayment() {
  const orderId = "FL" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("successOrderId").textContent = "Order #" + orderId;

  // Set success ETA
  const firstEntry = cart.size > 0 ? cart.values().next().value : null;
  const successETA = document.getElementById("successETA");
  if (firstEntry && successETA) {
    const r = restaurants.find(res => res.name === firstEntry.restaurantName);
    if (r) successETA.textContent = `Estimated delivery: ${r.deliveryTime}`;
  }

  document.getElementById("payFormView").style.display = "none";
  document.getElementById("paySuccessView").classList.add("show");

  // Clear cart
  cart.clear();
  updateCartUI();
  // Re-render menu page items if on restaurant page
  if (currentRestaurant) loadRestaurantPage();
}

function continueShopping() {
  closePayment();
  showToast("🎉 Your food is on the way! Enjoy your meal.");
  if (window.location.pathname.includes("restaurant")) {
    window.location.href = "index.html";
  }
}

/* Card number auto-formatting */
function formatCardNum(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}

/* Expiry auto-formatting */
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 4);
  if (v.length >= 2) v = v.substring(0, 2) + " / " + v.substring(2);
  input.value = v;
}

/* ─────────────────────────────────────────────────────
   12. SEARCH DROPDOWN — CLOSE ON OUTSIDE CLICK
───────────────────────────────────────────────────── */
document.addEventListener("click", function(e) {
  const wrapper = document.querySelector(".search-wrapper");
  if (wrapper && !wrapper.contains(e.target)) {
    const dd = document.getElementById("searchDropdown");
    if (dd) dd.classList.remove("open");
  }
});

/* ─────────────────────────────────────────────────────
   13. TOAST NOTIFICATION (preserved from original)
───────────────────────────────────────────────────── */
let toastTimeout;

function showToast(message) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();
  clearTimeout(toastTimeout);

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = message;

  Object.assign(toast.style, {
    position: "fixed", bottom: "28px", left: "50%",
    transform: "translateX(-50%) translateY(20px)",
    background: "#1a0608", color: "#fff",
    padding: "12px 24px", borderRadius: "30px",
    fontSize: "0.88rem", fontWeight: "500",
    fontFamily: "var(--ff-body)", zIndex: "5000",
    boxShadow: "0 8px 24px rgba(0,0,0,.25)",
    opacity: "0", transition: "all 0.3s ease",
    whiteSpace: "nowrap", maxWidth: "90vw", textAlign: "center"
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  toastTimeout = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ─────────────────────────────────────────────────────
   14. REGISTRATION FORM (preserved from original)
───────────────────────────────────────────────────── */
function submitForm(event) {
  event.preventDefault();
  const name    = document.getElementById("custName").value.trim();
  const email   = document.getElementById("custEmail").value.trim();
  const phone   = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("address").value.trim();
  const gender  = document.querySelector('input[name="gender"]:checked');

  if (!name)                          return highlightField("custName",  "Please enter your name.");
  if (!email || !isValidEmail(email)) return highlightField("custEmail", "Please enter a valid email.");
  if (!phone || phone.length < 10)    return highlightField("custPhone", "Enter a valid 10-digit number.");
  if (!gender)                        return showToast("⚠️ Please select your gender.");
  if (!address)                       return highlightField("address",   "Please enter your delivery address.");

  const successBox = document.getElementById("formSuccess");
  successBox.style.display = "block";
  document.getElementById("registrationForm").reset();
  successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  setTimeout(() => { successBox.style.display = "none"; }, 5000);
  showToast("🎉 Welcome to Feastly! Your ₹100 coupon is ready.");
}

function highlightField(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.style.borderColor = "var(--clr-primary)";
  field.style.boxShadow   = "0 0 0 3px rgba(226,55,68,.15)";
  field.focus();
  showToast("⚠️ " + message);
  setTimeout(() => { field.style.borderColor = ""; field.style.boxShadow = ""; }, 2000);
}

/* ─────────────────────────────────────────────────────
   15. ACTIVE NAV ON SCROLL (preserved from original)
───────────────────────────────────────────────────── */
function onScroll() {
  const sections = ["home", "restaurants", "offers", "contact"];
  const scrollY  = window.scrollY + 120;
  let activeId   = "home";

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) activeId = id;
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href) {
      link.classList.toggle("active", href.replace(/.*#/, "") === activeId);
    }
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

/* ─────────────────────────────────────────────────────
   16. INITIALISATION
───────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  initUserHeader();

  const isRestaurantPage = window.location.pathname.includes("restaurant");

  if (isRestaurantPage) {
    // Restaurant / menu page
    loadRestaurantPage();
  } else {
    // Homepage
    renderRestaurants();
    const allBtn = document.querySelector(".filter-btn");
    if (allBtn) allBtn.classList.add("active");
  }

  // Restore cart badge count on page load
  updateCartUI();

  // Welcome toast
  const raw = sessionStorage.getItem("es_user");
  if (raw) {
    const user = JSON.parse(raw);
    const greeting = user.isGuest
      ? "👋 Welcome, Guest! Browse our restaurants."
      : `👋 Welcome back, ${user.name}! What are you craving?`;
    setTimeout(() => showToast(greeting), 600);
  }

  console.log(`✅ Feastly loaded — ${restaurants.length} restaurants, ${restaurants.reduce((s,r)=>s+r.menu.reduce((s2,c)=>s2+c.items.length,0),0)} menu items ready.`);
});
