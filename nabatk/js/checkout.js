document.addEventListener('DOMContentLoaded', () => {

  // Load Order Summary from localStorage
  const miniCartList = document.getElementById('miniCartList');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryShipping = document.getElementById('summaryShipping');
  const summaryTotal = document.getElementById('summaryTotal');

  function loadSummary() {
    const cart = JSON.parse(localStorage.getItem('nabatk_cart')) || [];
    let subtotal = 0;

    if (miniCartList) {
      miniCartList.innerHTML = '';
      if(cart.length === 0){
        miniCartList.innerHTML = '<div style="color:var(--clr-text-muted);">Cart is empty.</div>';
      } else {
        cart.forEach(item => {
          subtotal += item.price * item.quantity;
          miniCartList.insertAdjacentHTML('beforeend', `
            <div class="mini-cart-item">
              <span class="name">${item.quantity}x ${item.name}</span>
              <span class="price">EGP ${item.price * item.quantity}</span>
            </div>
          `);
        });
      }
    }

    let shipping = subtotal >= 1000 ? 0 : 50;
    if (subtotal === 0) shipping = 0;

    if (summarySubtotal) summarySubtotal.textContent = `EGP ${subtotal}`;
    if (summaryShipping) summaryShipping.textContent = shipping === 0 ? 'Free' : `EGP ${shipping}`;
    if (summaryTotal) summaryTotal.textContent = `EGP ${subtotal + shipping}`;
  }

  loadSummary();

  // Multi-step logic
  const steps = document.querySelectorAll('.checkout-step');
  const btnStep1 = document.getElementById('btnStep1');
  const btnStep2 = document.getElementById('btnStep2');

  function goToStep(stepIndex) {
    steps.forEach((step, idx) => {
      if (idx === stepIndex) {
        step.classList.add('active');
        step.querySelector('.step-header').classList.remove('completed');
      } else if (idx < stepIndex) {
        step.classList.remove('active');
        step.querySelector('.step-header').classList.add('completed');
      } else {
        step.classList.remove('active');
        step.querySelector('.step-header').classList.remove('completed');
      }
    });
  }

  if (btnStep1) btnStep1.addEventListener('click', () => goToStep(1));
  if (btnStep2) btnStep2.addEventListener('click', () => goToStep(2));

  // Allow clicking header to go back to previous steps
  steps.forEach((step, idx) => {
    const header = step.querySelector('.step-header');
    header.addEventListener('click', () => {
      // Only allow going back
      if (header.classList.contains('completed')) {
        goToStep(idx);
      }
    });
  });

  // Payment Options
  const paymentOptions = document.querySelectorAll('.payment-option');
  const ccContainer = document.getElementById('ccContainer');
  
  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active from all
      paymentOptions.forEach(opt => {
        opt.classList.remove('active');
        opt.querySelector('input').checked = false;
      });

      // Set explicit active
      option.classList.add('active');
      const radio = option.querySelector('input');
      radio.checked = true;

      if (radio.value === 'card') {
        ccContainer.style.display = 'block';
      } else {
        ccContainer.style.display = 'none';
      }
    });
  });

  // Live Card Preview
  const ccNumInput = document.getElementById('ccNumInput');
  const ccNameInput = document.getElementById('ccNameInput');
  const ccExpInput = document.getElementById('ccExpInput');

  const ccNumDisp = document.getElementById('ccNumDisp');
  const ccNameDisp = document.getElementById('ccNameDisp');
  const ccExpDisp = document.getElementById('ccExpDisp');

  if (ccNumInput) {
    ccNumInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\s+/g, '');
      let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = formatted;
      ccNumDisp.textContent = formatted || '**** **** **** ****';
    });
  }

  if (ccNameInput) {
    ccNameInput.addEventListener('input', (e) => {
      ccNameDisp.textContent = e.target.value || 'YOUR NAME';
    });
  }

  if (ccExpInput) {
    ccExpInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
      }
      e.target.value = val;
      ccExpDisp.textContent = val || 'MM/YY';
    });
  }

  // Place Order Success
  const btnPlaceOrder = document.getElementById('btnPlaceOrder');
  const successModal = document.getElementById('successModal');

  if (btnPlaceOrder && successModal) {
    btnPlaceOrder.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Clear Cart logic would go here
      localStorage.removeItem('nabatk_cart');
      localStorage.removeItem('nabatk_last_total');
      
      // Update global badge
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach(badge => badge.style.display = 'none');

      // Show modal
      successModal.classList.add('show');
    });
  }

});
