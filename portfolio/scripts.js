document.addEventListener("DOMContentLoaded", () => {
  const adjustSectionHeight = () => {
    const viewportHeight = window.innerHeight;
    document.querySelectorAll(".section").forEach(section => {
      section.style.minHeight = `${viewportHeight}px`;
    });
  };

  // Adjust section height on load and resize
  adjustSectionHeight();
  window.addEventListener("resize", adjustSectionHeight);

  // Skill bars animation
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar');

  const resetProgressBars = () => {
    progressBars.forEach(bar => {
      bar.style.width = '0%';
    });
  };

  const animateProgressBars = () => {
    const sectionPos = skillsSection.getBoundingClientRect();
    const screenPos = window.innerHeight;

    if (sectionPos.top < screenPos && sectionPos.bottom > 0) {
      progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
      });
    } else {
      resetProgressBars();
    }
  };

  // Initial state
  resetProgressBars();

  // Add scroll event listener
  window.addEventListener('scroll', animateProgressBars);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Navigation handling
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle mobile menu with animation
  document.getElementById("menu-btn").addEventListener("click", () => {
    mobileMenu.classList.toggle('hidden');
    if (!mobileMenu.classList.contains('hidden')) {
      mobileNavLinks.forEach((link, index) => {
        setTimeout(() => {
          link.classList.add('show');
        }, index * 100);
      });
    } else {
      mobileNavLinks.forEach(link => link.classList.remove('show'));
    }
  });

  // Update active link on scroll
  const updateActiveLink = () => {
    const sections = document.querySelectorAll('section, #home');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scroll = window.scrollY;
      const id = section.getAttribute('id');

      if (scroll >= sectionTop && scroll < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});
