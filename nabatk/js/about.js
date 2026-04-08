document.addEventListener('DOMContentLoaded', () => {
  
  // Custom Intersection Observer for specific about page animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        // Handle value cards flip in
        if (entry.target.classList.contains('value-card')) {
          entry.target.classList.add('visible');
        }
        
        // Handle story image/text fade in
        if (entry.target.classList.contains('story-col') || entry.target.classList.contains('fade-right')) {
          entry.target.classList.add('visible');
        }

        // Handle timeline items
        if (entry.target.classList.contains('timeline-item')) {
          entry.target.classList.add('visible');
          // Start the CSS animation by setting play-state to running
          const content = entry.target.querySelector('.timeline-content');
          if (content) {
            content.style.animationPlayState = 'running';
          }
        }

        // Handle counter animation
        if (entry.target.classList.contains('stats-section')) {
          const counters = document.querySelectorAll('.stat-number');
          
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const step = target / (duration / 16); // 16ms per frame ~ 60fps
            
            let current = 0;
            const updateCounter = () => {
              current += step;
              if (current < target) {
                // formatting to match the example e.g., 2500 -> 2,500
                counter.innerText = Math.ceil(current).toLocaleString() + (counter.getAttribute('data-plus') === 'true' ? '+' : '');
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target.toLocaleString() + (counter.getAttribute('data-plus') === 'true' ? '+' : '');
                // special formatting for rating which is a float
                if(counter.getAttribute('data-float') === 'true') {
                  counter.innerText = target.toFixed(1);
                }
              }
            };
            
            updateCounter();
          });
          
          observer.unobserve(entry.target); // only animate once
        }
        
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.value-card, .story-col, .fade-right, .timeline-item, .stats-section').forEach(el => {
    aboutObserver.observe(el);
  });
});
