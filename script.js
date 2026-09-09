// ============================================================
// Yazan Mashaqbeh Portfolio — script.js v4.0
// Clean navigation, accordions, phone carousel & video tabs,
// and centered backdrop-blur modal system for games and media.
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

    // Close menu on nav click
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

  // 2. Smooth Navigation Active Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset + 140;

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
        trigger.setAttribute('aria-expanded', 'false');
        body.setAttribute('hidden', '');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        body.removeAttribute('hidden');
      }
    });
  });

  // 4. Media Type Switcher: Screenshots vs Videos (Phone Mockup)
  const mediaTabBtns = document.querySelectorAll('.media-tab-btn');
  const videoSubnav = document.getElementById('cg-video-subnav');

  mediaTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      mediaTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.media-tab-content').forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
          // Pause phone videos if switching away
          panel.querySelectorAll('video').forEach(v => v.pause());
        }
      });

      // Show or hide the video subnav pills
      if (targetId === 'cg-videos-panel') {
        if (videoSubnav) videoSubnav.classList.remove('hidden');
      } else {
        if (videoSubnav) videoSubnav.classList.add('hidden');
      }
    });
  });

  // 5. Vertical Image Carousel in Phone Frame
  const verticalCarousels = document.querySelectorAll('.vertical-carousel');

  verticalCarousels.forEach(carousel => {
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

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active-slide', idx === currentIndex);
      });

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    updateCarousel(0);

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

  // 6. Feature Video Tabs (for CyberGuard phone frame)
  const vtabBtns = document.querySelectorAll('.phone-vtab-nav .vtab-btn');

  vtabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetVideoId = btn.getAttribute('data-video');

      vtabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.phone-video-item').forEach(item => {
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

  // ============================================================
  // 7. CENTERED BLURRED MODAL DIALOG & LIGHTBOX SYSTEM
  // ============================================================
  const modal = document.getElementById('portfolio-modal');
  const modalContainer = document.getElementById('modal-container');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDynamicContent = document.getElementById('modal-dynamic-content');

  const openModal = (htmlContent, isVerticalMedia = false) => {
    if (!modal || !modalDynamicContent) return;

    // Pause any background phone videos so audio does not conflict
    document.querySelectorAll('video').forEach(v => {
      if (!modal.contains(v)) v.pause();
    });

    modalDynamicContent.innerHTML = htmlContent;

    if (isVerticalMedia) {
      modalContainer.className = 'modal-container media-lightbox-container vertical-mode';
    } else if (htmlContent.includes('lightbox-media-box')) {
      modalContainer.className = 'modal-container media-lightbox-container';
    } else {
      modalContainer.className = 'modal-container';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    if (!modal) return;

    // Pause and clear any playing videos inside modal before closing
    const modalVideos = modal.querySelectorAll('video');
    modalVideos.forEach(v => {
      v.pause();
      v.src = '';
    });

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalDynamicContent.innerHTML = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    // Click outside to close (backdrop click)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Hook up Game Experiment Items & Cards to Detailed Centered Modal
  const gameItems = document.querySelectorAll('.experiment-item[data-game-title], .game-art-card[data-game-title]');

  gameItems.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-game-title') || '';
      const genre = card.getAttribute('data-game-genre') || '';
      const img = card.getAttribute('data-game-img') || '';
      const desc = card.getAttribute('data-game-desc') || '';
      const engine = card.getAttribute('data-game-engine') || 'Unreal Engine 5';
      const time = card.getAttribute('data-game-time') || 'Prototype';
      const role = card.getAttribute('data-game-role') || 'Lead Developer';
      const url = card.getAttribute('data-game-url') || 'https://yazanfmg.itch.io/';

      const modalHtml = `
        ${img ? `<div class="modal-header-visual"><img src="${img}" alt="${title}"></div>` : ''}
        <div class="modal-genre-tag">${genre}</div>
        <h3 class="modal-title">${title}</h3>
        <p class="modal-description">${desc}</p>
        <div class="modal-tech-specs">
          <div><span>Engine / Framework:</span> <span>${engine}</span></div>
          <div><span>Scope / Timeline:</span> <span>${time}</span></div>
          <div><span>Contribution:</span> <span>${role}</span></div>
        </div>
        <div class="modal-actions">
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-link" style="--icon-color: #FA5C5C;">
            <i class="fa-brands fa-itch-io"></i> Play & Download on itch.io
          </a>
        </div>
      `;

      openModal(modalHtml, false);
    });
  });

  // Hook up CyberGuard Screenshots & Featured Thumbs to Centered Lightbox
  const zoomableElements = document.querySelectorAll('[data-media-src]');
  zoomableElements.forEach(el => {
    el.addEventListener('click', (e) => {
      // If user clicked a link or carousel button (but not zoom button), don't open modal
      if (e.target.closest('a') || e.target.closest('button.carousel-btn') || e.target.closest('button.carousel-dot')) return;
      
      // If clicked native video controls (and not the explicit zoom button), let native player handle it
      if (e.target.tagName && e.target.tagName.toLowerCase() === 'video' && !e.target.closest('.phone-video-zoom-btn')) return;

      const src = el.getAttribute('data-media-src');
      if (!src) return;

      const caption = el.getAttribute('data-caption') || '';
      const isVideo = src.includes('.mp4') || src.includes('.webm');
      const isVertical = el.classList.contains('carousel-slide') || el.classList.contains('phone-video-item') || src.includes('cyberguard');

      let lightboxHtml = '';
      if (isVideo) {
        lightboxHtml = `
          <div class="lightbox-media-box">
            <video controls controlsList="nofullscreen" playsinline autoplay class="fullscreen-lightbox-video">
              <source src="${src}" type="video/mp4">
            </video>
            ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
          </div>
        `;
      } else {
        lightboxHtml = `
          <div class="lightbox-media-box">
            <img src="${src}" alt="${caption}">
            ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
          </div>
        `;
      }

      openModal(lightboxHtml, isVertical);
    });
  });

  // Dedicated zoom button on phone video items
  document.querySelectorAll('.phone-video-zoom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.phone-video-item');
      if (!parent) return;

      const src = parent.getAttribute('data-media-src');
      const caption = parent.getAttribute('data-caption') || '';
      if (src) {
        openModal(`
          <div class="lightbox-media-box">
            <video controls controlsList="nofullscreen" playsinline autoplay class="fullscreen-lightbox-video">
              <source src="${src}" type="video/mp4">
            </video>
            ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
          </div>
        `, true);
      }
    });
  });

  // Hook up the CyberGuard phone "Click to Zoom Fullscreen" button beneath the phone frame
  const cgExpandBtn = document.getElementById('cg-expand-btn');
  if (cgExpandBtn) {
    cgExpandBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.phone-screen-content .media-tab-content:not(.hidden)');
      if (activePanel) {
        if (activePanel.id === 'cg-videos-panel') {
          const activeVideo = activePanel.querySelector('.phone-video-item:not(.hidden)');
          if (activeVideo) {
            const src = activeVideo.getAttribute('data-media-src');
            const caption = activeVideo.getAttribute('data-caption') || '';
            openModal(`
              <div class="lightbox-media-box">
                <video controls controlsList="nofullscreen" playsinline autoplay class="fullscreen-lightbox-video">
                  <source src="${src}" type="video/mp4">
                </video>
                ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
              </div>
            `, true);
          }
        } else {
          // Screenshots panel - open active slide
          const activeSlide = activePanel.querySelector('.carousel-slide.active-slide') || activePanel.querySelector('.carousel-slide');
          if (activeSlide) {
            const src = activeSlide.getAttribute('data-media-src');
            const caption = activeSlide.getAttribute('data-caption') || '';
            openModal(`
              <div class="lightbox-media-box">
                <img src="${src}" alt="${caption}">
                ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
              </div>
            `, true);
          }
        }
      }
    });
  }

  // Intercept native browser video fullscreen inside phone mockup to open our 9:16 Shorts modal instead of stretching
  const handleNativeFullscreen = () => {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl && fsEl.tagName === 'VIDEO') {
      const parent = fsEl.closest('.phone-video-item');
      if (parent) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        fsEl.pause();
        const src = parent.getAttribute('data-media-src');
        const caption = parent.getAttribute('data-caption') || '';
        openModal(`
          <div class="lightbox-media-box">
            <video controls controlsList="nofullscreen" playsinline autoplay class="fullscreen-lightbox-video">
              <source src="${src}" type="video/mp4">
            </video>
            ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
          </div>
        `, true);
      }
    }
  };
  document.addEventListener('fullscreenchange', handleNativeFullscreen);
  document.addEventListener('webkitfullscreenchange', handleNativeFullscreen);

  // 8. Copy Email with Toast Feedback
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
