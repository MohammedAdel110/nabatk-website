document.addEventListener('DOMContentLoaded', () => {
  const catTabs = document.querySelectorAll('.cat-tab');
  const faqGroups = document.querySelectorAll('.faq-group');
  const searchInput = document.getElementById('faqSearch');
  const allAccordionItems = document.querySelectorAll('.accordion-item');

  // Tab Switching
  if (catTabs.length > 0) {
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Clear search when switching tabs
        if (searchInput) {
          searchInput.value = '';
          clearSearch();
        }

        // Remove active class
        catTabs.forEach(t => t.classList.remove('active'));
        faqGroups.forEach(g => g.classList.remove('active'));

        // Add active class
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        // Reset accordions
        closeAllAccordions();
      });
    });
  }

  // Accordion Logic
  if (allAccordionItems.length > 0) {
    allAccordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all first (only one open at a time globally)
        closeAllAccordions();

        // If it wasn't active, open it
        if (!isActive) {
          item.classList.add('active');
          const content = item.querySelector('.accordion-content');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  function closeAllAccordions() {
    allAccordionItems.forEach(item => {
      item.classList.remove('active');
      const content = item.querySelector('.accordion-content');
      if (content) {
        content.style.maxHeight = null;
      }
    });
  }

  // Live Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query === '') {
        clearSearch();
        return;
      }

      // If searching, show all groups to search across everything
      faqGroups.forEach(g => g.classList.add('active'));
      
      // We can also dim the tabs to indicate search mode
      catTabs.forEach(t => t.style.opacity = '0.5');

      let hasResults = false;

      allAccordionItems.forEach(item => {
        const question = item.querySelector('.accordion-header').innerText.toLowerCase();
        const answer = item.querySelector('.accordion-content').innerText.toLowerCase();
        
        if (question.includes(query) || answer.includes(query)) {
          item.classList.remove('filtered-out');
          hasResults = true;
          
          // Optionally, don't open them automatically unless query is very specific
          // but we will close them for neatness
          item.classList.remove('active');
          item.querySelector('.accordion-content').style.maxHeight = null;
          
        } else {
          item.classList.add('filtered-out');
        }
      });
      
      // Hide empty groups
      faqGroups.forEach(group => {
        const visibleItems = group.querySelectorAll('.accordion-item:not(.filtered-out)');
        if (visibleItems.length === 0) {
          group.style.display = 'none';
        } else {
          group.style.display = 'block';
        }
      });
    });
  }

  function clearSearch() {
    allAccordionItems.forEach(item => {
      item.classList.remove('filtered-out');
    });
    
    // Restore tabs state
    catTabs.forEach(t => t.style.opacity = '1');
    
    // Restore visibility of groups based on active tab
    const activeTabTarget = document.querySelector('.cat-tab.active').getAttribute('data-target');
    faqGroups.forEach(group => {
      group.style.display = ''; // Remove inline style
      if (group.id === activeTabTarget) {
        group.classList.add('active');
      } else {
        group.classList.remove('active');
      }
    });
  }
});
