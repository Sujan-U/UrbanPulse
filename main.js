// js/main.js – Urban Pulse Apparel
console.log("main.js loaded successfully");

let wishlist = JSON.parse(localStorage.getItem('urbanPulseWishlist')) || [];

function saveWishlist() {
  localStorage.setItem('urbanPulseWishlist', JSON.stringify(wishlist));
  updateCounts();
  window.dispatchEvent(new Event('wishlistUpdated'));
}

function updateCounts() {
  const wishEl = document.getElementById("wishlistCount");
  if (wishEl) {
    wishEl.textContent = wishlist.length;
    wishEl.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
  const cartEl = document.getElementById("cartCount");
  if (cartEl) {
    const cart = JSON.parse(localStorage.getItem('urbanPulseCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartEl.textContent = totalItems;
    cartEl.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

function showToast(msg) {
  const t = document.createElement("div");
  t.className = "fixed bottom-6 left-1/2 -translate-x-1/2 bg-lime-400 text-black px-8 py-4 rounded-3xl font-semibold shadow-2xl flex items-center gap-3 z-[99999] animate-fade-in-up";
  t.innerHTML = `${msg} <span class="text-2xl">✨</span>`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

function flyToCart(imgSrc, e) {
  if (!imgSrc || !e) return;
  const flying = document.createElement("img");
  flying.src = imgSrc;
  flying.style.cssText = `
    position: fixed; width: 70px; z-index: 99999; border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    left: ${e.clientX - 35}px; top: ${e.clientY - 35}px;
    transition: all 0.75s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none;
  `;
  document.body.appendChild(flying);
  const cartRect = document.getElementById("cartCount")?.getBoundingClientRect();
  if (cartRect) {
    setTimeout(() => {
      flying.style.left = (cartRect.left + cartRect.width / 2 - 35) + "px";
      flying.style.top = (cartRect.top + window.scrollY - 50) + "px";
      flying.style.transform = "scale(0.15)"; flying.style.opacity = "0";
    }, 30);
  }
  setTimeout(() => flying.remove(), 900);
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    showToast("Removed from favourites");
  } else {
    wishlist.push(id);
    showToast("Added to favourites ❤️");
  }
  saveWishlist();
  updateCounts();
  if (document.getElementById("productGrid")) renderShopGrid();
  window.dispatchEvent(new Event('wishlistUpdated'));
}

function renderShopGrid(filtered = window.products || []) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!window.products || window.products.length === 0) {
    grid.innerHTML = '<p class="col-span-full text-center text-2xl text-zinc-400 py-20">No products loaded</p>';
    return;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="col-span-full text-center text-xl text-zinc-500 py-20">No matching products</p>';
    return;
  }

  filtered.forEach(p => {
    const isWishlisted = wishlist.includes(p.id);
    const mainImg = p.images && p.images[0] ? p.images[0] : 'assets/images/fallback-no-image.jpg';
    const secondaryImg = p.images && p.images[1] ? p.images[1] : null;

    const card = document.createElement("div");
    card.className = "group bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl relative";
    card.innerHTML = `
      <div class="relative aspect-[4/4.5] overflow-hidden">
        <img src="${mainImg}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy">
        ${secondaryImg ? `<img src="${secondaryImg}" class="w-full h-full object-cover absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100" loading="lazy">` : ''}
        <button onclick="event.stopPropagation(); toggleWishlist(${p.id})" class="absolute top-4 right-4 text-4xl text-white drop-shadow-lg transition hover:scale-125 active:scale-110">
          ${isWishlisted ? "❤️" : "♡"}
        </button>
        ${p.isNew ? '<span class="absolute top-4 left-4 bg-lime-400 text-black text-xs font-bold px-2 py-1 rounded">NEW</span>' : ''}
      </div>
      <div class="p-6">
        <h3 class="font-semibold text-lg mb-1">${p.name}</h3>
        <p class="text-lime-400 font-medium">$${p.price.toFixed(2)}</p>
        <button onclick="event.stopPropagation(); window.addToCart(${p.id}, 1)" class="mt-6 w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-lime-400 transition duration-300">
          Add to Bag
        </button>
      </div>
    `;

    card.addEventListener("click", e => {
      if (!e.target.closest("button")) window.location.href = `product.html?id=${p.id}`;
    });

    grid.appendChild(card);
  });
}

function renderHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  header.innerHTML = `
    <header class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-20">
          <a href="index.html" class="text-3xl font-black tracking-tight hover:text-lime-400 transition">
            URBAN<span class="text-lime-400">PULSE</span>
          </a>

          <div class="flex-1 max-w-xl mx-10 relative">
            <input id="searchInput" type="text" placeholder="Search products..." class="w-full bg-zinc-900 border border-zinc-700 rounded-full px-6 py-3 text-white focus:border-lime-400 outline-none transition pr-12">
            <button id="clearSearch" class="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-2xl font-bold hidden focus:outline-none transition-colors">×</button>
            <div id="searchResults" class="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl max-h-96 overflow-y-auto hidden z-50"></div>
          </div>

          <nav class="hidden md:flex items-center gap-10 text-lg font-medium">
            <a href="shop.html" class="hover:text-lime-400 transition">Shop</a>
            <a href="lookbook.html" class="hover:text-lime-400 transition">Lookbook</a>
            <a href="about.html" class="hover:text-lime-400 transition">About</a>
            <a href="faq.html" class="hover:text-lime-400 transition">FAQ</a>
            <a href="contact.html" class="hover:text-lime-400 transition">Contact</a>
          </nav>

          <!-- Proper spacing between Contact and Wishlist -->
          <div class="flex items-center gap-6 md:ml-20 lg:ml-24">
            <button onclick="window.location.href='wishlist.html'" class="text-2xl hover:text-lime-400 transition relative">
              ♡ <span id="wishlistCount" class="absolute -top-2 -right-2 bg-lime-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">${wishlist.length}</span>
            </button>
            <a href="cart.html" class="relative text-2xl hover:text-lime-400 transition">
              🛒 <span id="cartCount" class="absolute -top-2 -right-2 bg-lime-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;

  // Advanced search + clear button + Enter
  function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const clearBtn = document.getElementById('clearSearch');

    if (!searchInput || !searchResults || !clearBtn) {
      setTimeout(initSearch, 100);
      return;
    }

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      clearBtn.classList.toggle('hidden', query === '');

      if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
      }

      const results = window.products.filter(p => {
        const text = (p.name + ' ' + (p.description || '') + ' ' + p.category + ' ' + (p.tags?.join(' ') || '')).toLowerCase();
        return text.includes(query);
      }).slice(0, 8);

      searchResults.innerHTML = results.length === 0 
        ? '<p class="p-4 text-zinc-400">No results found</p>'
        : results.map(p => `
            <a href="product.html?id=${p.id}" class="flex items-center gap-4 p-3 hover:bg-zinc-800 transition cursor-pointer">
              <img src="${p.images && p.images[0] ? p.images[0] : 'assets/images/fallback-no-image.jpg'}" alt="${p.name}" class="w-12 h-12 object-cover rounded">
              <div>
                <p class="font-medium">${p.name}</p>
                <p class="text-lime-400 text-sm">$${p.price.toFixed(2)}</p>
                <p class="text-xs text-zinc-500">${p.category}</p>
              </div>
            </a>
          `).join('');

      searchResults.classList.remove('hidden');
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchResults.classList.add('hidden');
      clearBtn.classList.add('hidden');
      searchInput.focus();
    });

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query.length >= 2) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });

    document.addEventListener('click', e => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });
  }

  setTimeout(initSearch, 200);
}

// Updated footer – now includes Terms of Service and Privacy Policy links
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = "bg-zinc-900 border-t border-zinc-800 py-16 mt-24";

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
      <div>
        <h3 class="font-bold text-xl mb-6">Urban Pulse</h3>
        <p class="text-zinc-400 text-base leading-relaxed">
          Sydney-born streetwear for the everyday hustle.<br>
          Built for comfort, designed for the streets.
        </p>
      </div>

      <div>
        <h4 class="font-semibold text-lg mb-6">Shop</h4>
        <ul class="space-y-3 text-zinc-400 text-base">
          <li><a href="shop.html" class="hover:text-lime-400 transition">All Products</a></li>
          <li><a href="shop.html" class="hover:text-lime-400 transition">Hoodies</a></li>
          <li><a href="shop.html" class="hover:text-lime-400 transition">Tees</a></li>
          <li><a href="shop.html" class="hover:text-lime-400 transition">Accessories</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-lg mb-6">Company</h4>
        <ul class="space-y-3 text-zinc-400 text-base">
          <li><a href="about.html" class="hover:text-lime-400 transition">About Us</a></li>
          <li><a href="faq.html" class="hover:text-lime-400 transition">FAQ</a></li>
          <li><a href="contact.html" class="hover:text-lime-400 transition">Contact</a></li>
          <li><a href="terms.html" class="hover:text-lime-400 transition">Terms of Service</a></li>
          <li><a href="privacy.html" class="hover:text-lime-400 transition">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-lg mb-6">Connect</h4>
        <div class="flex justify-center md:justify-start gap-10 text-4xl">
          <a href="https://instagram.com/urbanpulse" target="_blank" class="transition-transform hover:scale-110" aria-label="Instagram">
            <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#405DE6"/>
                  <stop offset="25%" stop-color="#5851DB"/>
                  <stop offset="50%" stop-color="#833AB4"/>
                  <stop offset="75%" stop-color="#C13584"/>
                  <stop offset="100%" stop-color="#E1306C"/>
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="6" fill="url(#igGradient)"/>
              <circle cx="12" cy="12" r="5" stroke="white" stroke-width="1.8" fill="none"/>
              <circle cx="18" cy="6" r="1.5" fill="white"/>
            </svg>
          </a>

          <a href="https://x.com/urbanpulse" target="_blank" class="transition-transform hover:scale-110" aria-label="X (Twitter)">
            <svg class="w-10 h-10" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/>
            </svg>
          </a>

          <a href="https://tiktok.com/@urbanpulse" target="_blank" class="transition-transform hover:scale-110" aria-label="TikTok">
            <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ttGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00F2EA"/>
                  <stop offset="50%" stop-color="#FF0050"/>
                  <stop offset="100%" stop-color="#EE1D52"/>
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="6" fill="black"/>
              <path d="M12.53 2.02C13.84 2.02 15.14 2 16.44 2c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.5c0 4.08-3.32 7.4-7.4 7.4-1.98 0-3.78-.8-5.08-2.1-1.3-1.3-2.1-3.1-2.1-5.08 0-4.08 3.32-7.4 7.4-7.4.68 0 1.35.09 2 .26v4.13c-.65-.18-1.32-.27-2-.27-1.84 0-3.34 1.5-3.34 3.34s1.5 3.34 3.34 3.34c1.84 0 3.34-1.5 3.34-3.34V2.02z" fill="url(#ttGradient)"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="text-center text-zinc-500 text-sm mt-16 border-t border-zinc-800 pt-10">
      © 2026 Urban Pulse Apparel. All rights reserved.<br>
      <span class="text-xs">Built with passion in Sydney.</span>
    </div>
  `;
  document.body.appendChild(footer);
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7"/>
    </svg>
  `;
  btn.className = 'fixed bottom-8 right-8 bg-lime-400 text-black w-14 h-14 rounded-full shadow-2xl flex items-center justify-center opacity-0 pointer-events-none transition-all duration-500 ease-out z-50 hover:bg-lime-300 hover:scale-110 active:scale-95';
  document.body.appendChild(btn);

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 400 && currentScroll < lastScroll) {
      btn.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded → initializing main.js");

  renderHeader();
  renderFooter();
  initBackToTop();
  updateCounts();

  const isShopPage = window.location.pathname.includes('shop.html');
  const hasSearch = new URLSearchParams(window.location.search).has('search');
  const grid = document.getElementById("productGrid");
  if (isShopPage && grid && window.products && !hasSearch) {
    console.log("Shop grid found – rendering full products");
    renderShopGrid();
  }
});