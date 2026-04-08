document.addEventListener('DOMContentLoaded', () => {

  // Staggered info cards animation on load
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, i * 200 + 300); // 300ms initial delay
  });

  // Ripple effect for submit button
  const submitBtn = document.querySelector('.btn-submit-form');
  if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      ripples.classList.add('ripple');
      
      this.appendChild(ripples);
      
      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  }

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('.form-control[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
        
        // Basic email validation
        if (input.type === 'email' && input.value.trim()) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(input.value)) {
            input.classList.add('error');
            isValid = false;
          }
        }
      });
      
      if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        contactForm.reset();
        
        setTimeout(() => {
          document.getElementById('successMessage').style.display = 'none';
        }, 5000);
      }
    });

    // Remove error class on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
      });
    });
  }

  // Accordion Logic
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        
        if (currentlyActive && currentlyActive !== item) {
          currentlyActive.classList.remove('active');
          currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
        }
        
        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');
        
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  }

});
