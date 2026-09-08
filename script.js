// ============================================================
// Yazan Mashaqbeh Portfolio — script.js v3
// Interactive Accordions, Carousel, Video Tabs, Toast & Navigation
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('mobile-active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Navigation Active State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 3. Interactive Accordion Expand / Collapse
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const bodyId = trigger.getAttribute('aria-controls');
      const body = document.getElementById(bodyId);

      if (!body) return;

      if (isExpanded) {
        // Collapse
        trigger.setAttribute('aria-expanded', 'false');
        body.setAttribute('hidden', '');
      } else {
        // Expand
        trigger.setAttribute('aria-expanded', 'true');
        body.removeAttribute('hidden');
      }
    });
  });

  // 4. Media Type Tabs Switcher (e.g. Screenshots vs Feature Videos in CyberGuard)
  const mediaTabBtns = document.querySelectorAll('.media-tab-btn');

  mediaTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.accordion-body') || document;
      const targetId = btn.getAttribute('data-tab');

      // Update button active state
      parent.querySelectorAll('.media-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels visibility
      parent.querySelectorAll('.media-tab-content').forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
          // Pause any video if switching away
          const videos = panel.querySelectorAll('video');
          videos.forEach(v => v.pause());
        }
      });
    });
  });

  // 5. Image Carousel for CyberGuard
  const carousels = document.querySelectorAll('.img-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateCarousel = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        updateCarousel(idx);
      });
    });
  });

  // 6. Feature Video Tabs (for CyberGuard video gallery)
  const vtabBtns = document.querySelectorAll('.vtab-btn');

  vtabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.video-tab-panel');
      if (!parent) return;

      const targetVideoId = btn.getAttribute('data-video');

      // Button active styles
      parent.querySelectorAll('.vtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Video swap
      parent.querySelectorAll('.cg-video-item').forEach(item => {
        const video = item.querySelector('video');
        if (item.id === targetVideoId) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
          if (video) video.pause();
        }
      });
    });
  });

  // 7. Copy Email with Feedback Toast
  window.copyEmail = function (emailText) {
    const emailToCopy = emailText || 'yazanfmg@gmail.com';

    navigator.clipboard.writeText(emailToCopy).then(() => {
      showToast('Email copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
      window.prompt('Copy email:', emailToCopy);
    });
  };

  const showToast = (message) => {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };
});
