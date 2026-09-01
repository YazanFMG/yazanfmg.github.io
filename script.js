// Yazan Mustafa - Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav items
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 2. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
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

  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Email Copy Functionality with Toast
  const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');

  const showToast = (message = 'Email copied to clipboard!') => {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'yazanfmg@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

  // Direct In-Page Video Trigger
  const videoTriggers = document.querySelectorAll('.play-video-trigger');
  videoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const videoEl = document.getElementById(targetId);
      if (videoEl) {
        videoEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (videoEl.paused) {
          videoEl.play();
        } else {
          videoEl.pause();
        }
      }
    });
  });

  // 4. Video Modal Handler
  const videoModal = document.getElementById('video-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const modalTitle = document.getElementById('modal-title');
  const closeModalBtn = document.getElementById('close-modal');
  const openModalButtons = document.querySelectorAll('.open-video-btn');

  const openModal = (videoUrl, title) => {
    if (!videoModal || !modalIframe) return;
    modalIframe.src = videoUrl;
    if (modalTitle) modalTitle.textContent = title || 'Project Gameplay & Technical Demonstration';
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  };

  const closeModal = () => {
    if (!videoModal || !modalIframe) return;
    videoModal.classList.remove('active');
    modalIframe.src = '';
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoUrl = btn.getAttribute('data-video-url');
      const title = btn.getAttribute('data-title');
      if (videoUrl) {
        openModal(videoUrl, title);
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeModal();
    }
  });
});
