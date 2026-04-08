document.addEventListener('DOMContentLoaded', () => {

  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartItemList = document.getElementById('cartItemList');
  const emptyCartState = document.getElementById('emptyCartState');
  
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');
  const shippingHint = document.getElementById('shippingHint');

  // We rely on the global getCart function from script.js, or duplicate logic here
  function getCartItems() {
    return JSON.parse(localStorage.getItem('nabatk_cart')) || [];
  }

  function saveCartItems(cart) {
    localStorage.setItem('nabatk_cart', JSON.stringify(cart));
    // Trigger global update (badge update in script.js listens on storage, but we can do it manually)
    updateCartBadgeGlobally(cart);
  }

  function updateCartBadgeGlobally(cart) {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      if(count > 0){
        badge.style.animation = 'none';
        badge.offsetHeight; // trigger reflow
        badge.style.animation = 'pulseBadge 0.3s ease';
      }
    });
  }

  function renderCart() {
    const cart = getCartItems();
    
    if (cart.length === 0) {
      cartItemsContainer.classList.add('hidden');
      emptyCartState.classList.add('active');
    } else {
      cartItemsContainer.classList.remove('hidden');
      emptyCartState.classList.remove('active');
      
      cartItemList.innerHTML = '';
      let subtotal = 0;

      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemHTML = `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="ci-img">
            <div class="ci-details">
              <div class="ci-name">${item.name}</div>
              <div class="ci-price">EGP ${item.price}</div>
            </div>
            <div class="ci-qty-wrapper">
              <button class="ci-qty-btn decrease" data-index="${index}">−</button>
              <input type="text" class="ci-qty-input" value="${item.quantity}" readonly>
              <button class="ci-qty-btn increase" data-index="${index}">+</button>
            </div>
            <div class="ci-total">EGP ${itemTotal}</div>
            <button class="ci-remove" data-index="${index}" title="Remove Item">×</button>
          </div>
        `;
        cartItemList.insertAdjacentHTML('beforeend', cartItemHTML);
      });

      calculateTotals(subtotal);
      bindEvents();
    }
  }

  function calculateTotals(subtotal) {
    let shipping = 50;
    
    if (subtotal >= 1000) {
      shipping = 0;
      shippingHint.textContent = 'You qualify for Free Shipping!';
      shippingHint.style.color = 'var(--clr-green-deep)';
    } else {
      const remaining = 1000 - subtotal;
      shippingHint.textContent = `Add EGP ${remaining} more for Free Shipping`;
      shippingHint.style.color = 'var(--clr-text-muted)';
    }

    subtotalEl.textContent = `EGP ${subtotal}`;
    shippingEl.textContent = shipping === 0 ? 'Free' : `EGP ${shipping}`;
    totalEl.textContent = `EGP ${subtotal + shipping}`;
    
    // Save total for checkout page
    localStorage.setItem('nabatk_last_total', subtotal + shipping);
  }

  function bindEvents() {
    const cart = getCartItems();

    document.querySelectorAll('.ci-qty-btn.increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        cart[idx].quantity += 1;
        saveCartItems(cart);
        renderCart();
      });
    });

    document.querySelectorAll('.ci-qty-btn.decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
          saveCartItems(cart);
          renderCart();
        }
      });
    });

    document.querySelectorAll('.ci-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        cart.splice(idx, 1);
        saveCartItems(cart);
        renderCart();
      });
    });
  }

  // Handle Promo Code
  const promoForm = document.getElementById('promoForm');
  if (promoForm) {
    promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = promoForm.querySelector('input');
      if (input.value.toUpperCase() === 'NABATK10') {
        alert('Promo code applied successfully! (Mock behavior)');
      } else {
        alert('Invalid promo code.');
      }
    });
  }

  // Initial render
  setTimeout(() => { // slight delay to ensure UI load
    renderCart();
  }, 100);

});
