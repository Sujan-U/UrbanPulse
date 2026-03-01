// js/cart.js – Shopping cart logic for Urban Pulse Apparel
// Supports variants (color + size)

let cart = JSON.parse(localStorage.getItem('urbanPulseCart')) || [];

// Save cart to localStorage + trigger updates
function saveCart() {
  localStorage.setItem('urbanPulseCart', JSON.stringify(cart));
  updateCartCount();
  window.dispatchEvent(new Event('cartUpdated'));

  // If on cart page, re-render immediately
  if (document.getElementById('cartItems')) {
    renderCart();
  }
}

// Update header cart count badge
function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  el.textContent = totalItems;
  el.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Calculate total price (used in checkout)
function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);
}

// Add item to cart – now accepts full item object with variants
function addToCart(item) {
  // Validate required fields
  if (!item || !item.id || !item.name || !item.price) {
    showToast("Error: Invalid product data");
    console.error("Invalid item added to cart:", item);
    return;
  }

  // Default quantity = 1 if not provided
  item.quantity = Math.max(1, parseInt(item.quantity) || 1);

  // Check if same product + same variants already exist
  const existingIndex = cart.findIndex(cartItem => 
    cartItem.id === item.id &&
    cartItem.color === item.color &&     // same color
    cartItem.size === item.size          // same size
  );

  if (existingIndex !== -1) {
    // Same variant → increase quantity
    cart[existingIndex].quantity += item.quantity;
    showToast(`Added ${item.quantity} more × ${item.name} (${item.color || ''} / ${item.size || ''})`);
  } else {
    // New variant → add as separate line
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || 'assets/images/fallback-no-image.jpg',
      quantity: item.quantity,
      color: item.color || null,           // null if no color selected
      size: item.size || null              // null if no size selected
    });
    showToast(`Added ${item.name} (${item.color || 'Default'} / ${item.size || 'Default'}) to bag`);
  }

  saveCart();
}

// Update quantity by index (called from cart.html)
window.updateQty = function(index, change) {
  if (typeof index !== 'number' || !cart[index]) return;

  let qty = (cart[index].quantity || 1) + change;
  qty = Math.max(1, qty); // don't go below 1

  cart[index].quantity = qty;
  saveCart(); // triggers re-render + count update
};

// Remove item by index
window.removeFromCart = function(index) {
  if (typeof index !== 'number' || !cart[index]) return;

  const removedName = cart[index].name;
  const removedColor = cart[index].color || '';
  const removedSize = cart[index].size || '';

  cart.splice(index, 1);
  saveCart();

  showToast(`Removed ${removedName} (${removedColor} / ${removedSize}) from your bag`);
};

// Render cart items on cart.html – now shows variants
window.renderCart = function() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (!container || !totalEl) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="text-center text-xl md:text-2xl text-zinc-400 py-16">
        Your bag is empty.<br>
        <a href="shop.html" class="text-lime-400 hover:underline font-medium">Start shopping →</a>
      </p>
    `;
    totalEl.textContent = '$0.00';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    container.innerHTML += `
      <div class="flex flex-col sm:flex-row gap-6 bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-4">
        <img src="${item.image || 'assets/images/fallback-no-image.jpg'}" 
             alt="${item.name}" 
             class="w-full sm:w-32 h-32 object-cover rounded-xl" loading="lazy">
        <div class="flex-1 space-y-3">
          <h3 class="font-bold text-lg md:text-xl">${item.name}</h3>
          
          <!-- Variant display -->
          <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-300">
            ${item.color ? `<span>Color: <strong class="text-white">${item.color}</strong></span>` : ''}
            ${item.size ? `<span>Size: <strong class="text-white">${item.size}</strong></span>` : ''}
          </div>

          <p class="text-lime-400 font-medium">$${item.price.toFixed(2)} × ${item.quantity}</p>
          <p class="text-zinc-400">Subtotal: $${subtotal.toFixed(2)}</p>

          <div class="flex flex-wrap items-center gap-6 mt-4">
            <div class="flex items-center border border-zinc-700 rounded-xl overflow-hidden">
              <button onclick="window.updateQty(${index}, -1)" class="px-5 py-3 text-xl font-bold">-</button>
              <span class="px-6 py-3 text-xl">${item.quantity}</span>
              <button onclick="window.updateQty(${index}, 1)" class="px-5 py-3 text-xl font-bold">+</button>
            </div>
            <button onclick="window.removeFromCart(${index})" class="text-red-400 hover:text-red-300 font-medium">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
};

// Force initial count update (for header badge on all pages)
function forceInitialCountUpdate() {
  if (document.getElementById('cartCount')) {
    updateCartCount();
  } else {
    setTimeout(forceInitialCountUpdate, 150);
  }
}
forceInitialCountUpdate();

// Cross-tab sync
window.addEventListener('storage', e => {
  if (e.key === 'urbanPulseCart') {
    cart = JSON.parse(e.newValue) || [];
    updateCartCount();
    if (document.getElementById('cartItems')) renderCart();
  }
});

// Export globals
window.addToCart = addToCart;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;
window.getCartTotal = getCartTotal;
window.cart = cart;
window.renderCart = renderCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;