document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-pill');
  const articles = document.querySelectorAll('.article-card');

  if (tabs.length > 0 && articles.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        articles.forEach(article => {
          article.style.animation = ''; // reset animation
          
          if (filter === 'All' || article.getAttribute('data-category') === filter) {
            article.style.display = 'flex';
            // Trigger reflow for animation
            void article.offsetWidth;
            article.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            article.style.display = 'none';
          }
        });
      });
    });
  }

  // Handle Search stub
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = searchForm.querySelector('input').value;
      alert(`Search for "${input}" feature works on front-end!`);
    });
  }
});
