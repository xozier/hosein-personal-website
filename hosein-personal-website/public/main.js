document.addEventListener('DOMContentLoaded', function() {
    
    
  // Handle View More clicks for all content types (blog posts, papers, projects)
  const viewMoreButtons = document.querySelectorAll('.view-more');
  
  viewMoreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const article = this.closest('article');
          let detailData = {};
          
          if (article.classList.contains('blog-post')) {
              // Handle blog post
              detailData = {
                  title: article.querySelector('h2').textContent,
                  tag: article.querySelector('.blog-tag').textContent,
                  meta: article.querySelector('.post-meta').textContent,
                  image: article.querySelector('.blog-image').src,
                  content: article.querySelector('.post-full').innerHTML,
                  type: 'blog'
              };
          } else {
              // Handle papers/projects
              detailData = {
                  title: article.querySelector('h3').textContent,
                  tag: article.querySelector('.paper-tag, .project-tag').textContent,
                  meta: article.querySelector('.paper-meta, .project-meta')?.textContent || '',
                  content: article.querySelector('.paper-full, .project-full').innerHTML,
                  type: article.classList.contains('paper') ? 'paper' : 'project'
              };
          }
          
          localStorage.setItem('currentDetail', JSON.stringify(detailData));
          window.location.href = 'project-detail.html';
      });
  });
  
  // Load content if on detail page
  if (window.location.pathname.includes('project-detail.html')) {
      loadDetailContent();
  }

  // Section navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function highlightNavigation() {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');

          if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
              navItems.forEach(item => {
                  item.classList.remove('active');
                  if (item.getAttribute('href') === `#${sectionId}`) {
                      item.classList.add('active');
                  }
              });
          }
      });
  }

  // Smooth scrolling for navigation items
  navItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          window.scrollTo({
              top: targetSection.offsetTop - 100,
              behavior: 'smooth'
          });
      });
  });

  // Add scroll event listener
  window.addEventListener('scroll', highlightNavigation);
  
  // Initial highlight
  highlightNavigation();
});

function loadDetailContent() {
  const detailData = JSON.parse(localStorage.getItem('currentDetail'));
  if (detailData) {
      const detailContent = document.querySelector('.detail-content');
      let backLink = 'professional.html';
      
      if (detailData.type === 'blog') {
          backLink = 'personal.html';
      }
      
      // Update back button
      document.querySelector('.back-btn').href = backLink;
      
      // Generate content based on type
      let contentHTML = `
          <span class="detail-tag">${detailData.tag}</span>
          <h1>${detailData.title}</h1>
          <div class="meta">${detailData.meta}</div>
      `;
      
      // Add image for blog posts
      if (detailData.type === 'blog' && detailData.image) {
          contentHTML += `<img src="${detailData.image}" alt="${detailData.title}">`;
      }
      
      contentHTML += detailData.content;
      
      detailContent.innerHTML = contentHTML;
  }
} 