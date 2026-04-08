document.addEventListener('DOMContentLoaded', () => {
  // Gallery Swap
  const mainImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // remove active class
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // fade out
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
          mainImage.src = thumb.querySelector('img').src;
          // fade in
          mainImage.style.opacity = '1';
        }, 150);
      });
    });
  }

  // Size and Color selectors
  const sizeBtns = document.querySelectorAll('.size-selector .pill-btn');
  const colorBtns = document.querySelectorAll('.color-selector .color-swatch');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Quantity Selector
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  
  if (qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value);
      if (val > 1) {
        qtyInput.value = val - 1;
      }
    });
    
    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value);
      qtyInput.value = val + 1;
    });
  }

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove actives
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Sticky Mobile Bar
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  const productSection = document.querySelector('.product-section');
  
  if (stickyBar && productSection) {
    window.addEventListener('scroll', () => {
      const rect = productSection.getBoundingClientRect();
      // Show sticky bar when user scrolls past main info block roughly
      if (rect.bottom < window.innerHeight / 2 && window.innerWidth <= 900) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }

  // Add to cart Animation & Logic
  const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Bounce animation
      this.style.animation = 'bounce 0.3s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 300);

      // Build product object
      const product = {
        id: 2, // Peace Lily hardcoded for this demo page
        name: 'Peace Lily Plant',
        price: 150,
        image: 'https://source.unsplash.com/600x600/?peace,lily',
        quantity: parseInt(qtyInput ? qtyInput.value : 1)
      };

      addToCart(product); // Defined in script.js
    });
  });

  // Wishlist toggle
  const wishlistBtn = document.querySelector('.btn-wishlist-large');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('active');
    });
  }
});
