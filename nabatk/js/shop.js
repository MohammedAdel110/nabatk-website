document.addEventListener('DOMContentLoaded', () => {
  // Wishlist toggle
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
    });
  });

  // Shop Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const prodCards = document.querySelectorAll('.prod-card');
  const emptyState = document.querySelector('.empty-state');
  const priceRange = document.getElementById('priceRangeInput');
  const priceValueLabel = document.getElementById('priceRangeValue');
  const categoryCheckboxes = Array.from(document.querySelectorAll('.category-filter input[type="checkbox"]'));
  const ratingCheckboxes = Array.from(document.querySelectorAll('.rating-filter input[type="checkbox"]'));
  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  const categoryValues = categoryCheckboxes.map(input => input.value);
  let currentFilterValue = 'All';

  const updatePriceLabel = () => {
    if (priceRange && priceValueLabel) {
      priceValueLabel.textContent = `EGP ${priceRange.value}`;
    }
  };

  const setActiveFilterButton = (value) => {
    filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === value));
  };

  const syncCategoryCheckboxes = (category) => {
    if (category === 'All') {
      categoryCheckboxes.forEach(cb => cb.checked = true);
      return;
    }
    categoryCheckboxes.forEach(cb => cb.checked = cb.value === category);
  };

  const refreshTopFilterButtons = () => {
    const selectedCategories = categoryCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
    if (selectedCategories.length === categoryValues.length) {
      setActiveFilterButton('All');
      currentFilterValue = 'All';
      return;
    }
    if (selectedCategories.length === 1) {
      setActiveFilterButton(selectedCategories[0]);
      currentFilterValue = selectedCategories[0];
      return;
    }
    filterBtns.forEach(b => b.classList.remove('active'));
    currentFilterValue = 'All';
  };

  const applyFilters = () => {
    const selectedCategories = categoryCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
    const selectedRatings = ratingCheckboxes.filter(cb => cb.checked).map(cb => parseInt(cb.value, 10));
    const maxPrice = priceRange ? parseInt(priceRange.value, 10) : Infinity;
    const minRating = selectedRatings.length ? Math.min(...selectedRatings) : 0;
    let visibleCount = 0;

    prodCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const price = parseInt(card.getAttribute('data-price'), 10);
      const rating = parseFloat(card.getAttribute('data-rating'));

      const categoryMatch = selectedCategories.length > 0 && selectedCategories.includes(category);
      const ratingMatch = selectedRatings.length === 0 || rating >= minRating;
      const priceMatch = price <= maxPrice;

      if (categoryMatch && ratingMatch && priceMatch) {
        card.style.display = 'flex';
        visibleCount++;
        card.classList.remove('filtering');
        window.requestAnimationFrame(() => card.classList.add('filtering'));
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (filterBtns.length > 0 && prodCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        currentFilterValue = filterValue;
        setActiveFilterButton(filterValue);
        syncCategoryCheckboxes(filterValue);
        applyFilters();
      });
    });
  }

  categoryCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      refreshTopFilterButtons();
    });
  });

  if (priceRange) {
    updatePriceLabel();
    priceRange.addEventListener('input', updatePriceLabel);
  }

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }

  // Shop Sorting
  const sortSelect = document.querySelector('.sort-dropdown');
  const shopGrid = document.querySelector('.shop-grid');
  
  if (sortSelect && shopGrid && prodCards.length > 0) {
    sortSelect.addEventListener('change', (e) => {
      const sortValue = e.target.value;
      const cardsArray = Array.from(prodCards);
      
      cardsArray.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'), 10);
        const priceB = parseInt(b.getAttribute('data-price'), 10);
        const rateA = parseFloat(a.getAttribute('data-rating'));
        const rateB = parseFloat(b.getAttribute('data-rating'));
        
        if (sortValue === 'Price Low–High') return priceA - priceB;
        if (sortValue === 'Price High–Low') return priceB - priceA;
        if (sortValue === 'Best Rated') return rateB - rateA;
        return 0;
      });
      
      cardsArray.forEach((card, i) => {
        card.style.order = i;
        card.classList.remove('filtering');
        window.requestAnimationFrame(() => {
          card.classList.add('filtering');
        });
      });
    });
  }
});
