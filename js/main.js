/* ============================================
   CEG Designs UK - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations for grid children
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el, i) => {
    if (!el.dataset.delay) {
      // Auto-stagger siblings
      const parent = el.parentElement;
      const siblings = parent.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
      siblings.forEach((sib, j) => {
        if (!sib.dataset.delay) {
          sib.dataset.delay = j;
        }
      });
    }
    observer.observe(el);
  });

  // --- Header scroll effect ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Mobile menu toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Counter animation for stats ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = Math.floor(current) + suffix;
          }, 16);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '').split('/').pop() || 'index';
    if (href === currentPath || (currentPath === '' && href === 'index')) {
      link.classList.add('active');
    }
  });

  // --- Simple form validation ---
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      btn.textContent = 'Message Sent!';
      btn.style.background = '#00b894';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
