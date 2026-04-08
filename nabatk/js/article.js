document.addEventListener('DOMContentLoaded', () => {
  
  // Reading Progress Bar
  const progressBar = document.getElementById('readingProgress');
  
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTotal / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // Comments functionality
  const commentForm = document.getElementById('commentForm');
  const commentList = document.getElementById('commentList');
  
  if (commentForm && commentList) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('commentName').value;
      const text = document.getElementById('commentText').value;
      
      if (name.trim() && text.trim()) {
        const date = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        const newComment = document.createElement('div');
        newComment.className = 'comment-item new';
        newComment.innerHTML = `
          <div class="comment-avatar">👤</div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-name">${name}</span>
              <span class="comment-date">${date}</span>
            </div>
            <p style="margin-top: 0.5rem; color: var(--clr-text-muted);">${text.replace(/\n/g, '<br>')}</p>
          </div>
        `;
        
        commentList.appendChild(newComment);
        
        // Reset form
        commentForm.reset();
        
        // Scroll to the new comment smoothly
        newComment.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }
});
