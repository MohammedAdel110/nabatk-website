document.addEventListener('DOMContentLoaded', () => {
  // Testimonials Carousel
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const slideCount = slides.length;
  let carouselInterval;

  
  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
  }

  function startCarousel() {
    if (slideCount > 1) {
      carouselInterval = setInterval(nextSlide, 5000);
    }
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopCarousel();
      startCarousel(); // reset timer
    });
  });

  // Pause on hover
  const carouselContainer = document.querySelector('.testimonials-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
  }

  startCarousel();

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  const successMessage = document.getElementById('newsletterSuccess');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value.trim() !== '') {
        successMessage.style.display = 'block';
        input.value = '';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }
    });
  }
});
