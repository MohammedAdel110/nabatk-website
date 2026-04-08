document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    if (img.src.includes('source.unsplash.com')) {
      const match = img.src.match(/source\.unsplash\.com\/(\d+)x(\d+)\/\?(.*)/);
      if (match) {
        img.src = `https://loremflickr.com/${match[1]}/${match[2]}/${match[3]}`;
      }
    }
  });

  document.querySelectorAll('*').forEach(el => {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg.includes('source.unsplash.com')) {
      const newBg = bg.replace(/source\.unsplash\.com\/(\d+)x(\d+)\/\?(.*?)(['"]?\))/, "loremflickr.com/$1/$2/$3$4");
      el.style.backgroundImage = newBg;
    }
  });
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Scroll Animations (Intersection Observer)
  const fadeUpElements = document.querySelectorAll('.fade-up');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // Cart Badge Logic (localStorage)
  updateCartBadge();
});

// Utility to update cart badge across pages
function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    let cart = JSON.parse(localStorage.getItem('nabatk_cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// Utility to add items to cart (can be called from shop/product pages)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('nabatk_cart')) || [];
  let existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += (product.quantity || 1);
  } else {
    product.quantity = product.quantity || 1;
    cart.push(product);
  }
  
  localStorage.setItem('nabatk_cart', JSON.stringify(cart));
  updateCartBadge();
}
