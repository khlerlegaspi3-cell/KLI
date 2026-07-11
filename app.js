/* =====================================================
   KLI EXECUTIVE VA - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    updateNavActive();
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- MOBILE HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---- ACTIVE NAV LINK ---- */
  function updateNavActive() {
    const sections = ['home', 'about', 'services', 'why-me', 'testimonials', 'contact'];
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id);
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!el || !link) return;
      if (el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  /* ---- SCROLL ANIMATIONS ---- */
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  /* ---- TESTIMONIALS CAROUSEL ---- */
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  let currentIndex = 0;
  let autoplayInterval;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
      d.setAttribute('aria-pressed', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetAutoplay(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goToSlide(parseInt(dot.dataset.index)); resetAutoplay(); });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), 5500);
  }
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  startAutoplay();

  /* Touch/swipe for carousel */
  let touchStartX = 0;
  const carousel = document.getElementById('testimonialsCarousel');
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      resetAutoplay();
    }
  });

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.querySelector('.submit-text').textContent = 'Sending...';

    // Simulate form submission
    setTimeout(() => {
      form.reset();
      successMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.querySelector('.submit-text').textContent = 'Send Message';
      setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    }, 1200);
  });

  /* ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- MICRO-ANIMATION: hero portrait image cycle ---- */
  const heroPortrait = document.getElementById('hero-portrait');
  if (heroPortrait) {
    const images = ['assets/portraits.jpg'];
    let imgIdx = 0;
    // Since we have a triptych image, just use it as-is
    // Could slice it if needed — keep simple here
  }

});
