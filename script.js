'use strict';

(function () {

  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navBackdrop = document.getElementById('navBackdrop');
  const scrollTopBtn = document.getElementById('scrollTop');
  const sideNav = document.getElementById('sideNav');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const yearEl = document.getElementById('currentYear');

  const headerHeight = () =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;

  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('loader--hidden');
    }, 550);
  });

  // Keep --header-height in sync with actual header height (handles nav wrapping on mobile)
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(function () {
      document.documentElement.style.setProperty(
        '--header-height',
        header.offsetHeight + 'px'
      );
    }).observe(header);
  }

  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > 420);
    if (sideNav) sideNav.classList.toggle('is-visible', window.scrollY > 120);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeNav() {
    navList.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    header.classList.remove('header--nav-open');
    if (navBackdrop) navBackdrop.classList.remove('is-active');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navList.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    header.classList.toggle('header--nav-open', isOpen);
    if (navBackdrop) navBackdrop.classList.toggle('is-active', isOpen);
  });

  navList.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* Click on the overlay background (not on a link) closes the nav */
  navList.addEventListener('click', function (e) {
    if (e.target === navList) closeNav();
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('is-open')) {
      closeNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY - headerHeight();
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  var animatedEls = document.querySelectorAll('[data-animate]');
  var animObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = parseInt(entry.target.dataset.delay, 10) || 0;
      setTimeout(function () {
        entry.target.classList.add('is-visible');
      }, delay);
      animObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(function (el) {
    animObserver.observe(el);
  });

  var counterEls = document.querySelectorAll('.stats__number[data-target]');

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var duration = 2000;
    var steps = 60;
    var increment = target / (duration / (1000 / steps));
    var current = 0;
    function tick() {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current < target) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.55 });

  counterEls.forEach(function (el) {
    counterObserver.observe(el);
  });

  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
  var sideNavLinks = document.querySelectorAll('.sidenav__link[data-section]');

  var activeLinkObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (l) { l.classList.remove('nav__link--active'); });
      sideNavLinks.forEach(function (l) { l.classList.remove('is-active'); });
      var active = document.querySelector('.nav__link[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('nav__link--active');
      var activeSide = document.querySelector('.sidenav__link[data-section="' + entry.target.id + '"]');
      if (activeSide) activeSide.classList.add('is-active');
    });
  }, {
    threshold: 0.35,
    rootMargin: '-' + headerHeight() + 'px 0px 0px 0px'
  });

  sections.forEach(function (s) { activeLinkObserver.observe(s); });

  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = this.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top - size / 2;
      var ripple = document.createElement('span');
      ripple.classList.add('btn__ripple');
      ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;top:' + y + 'px;left:' + x + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });
    });
  });

  function sanitize(str) {
    var node = document.createElement('div');
    node.appendChild(document.createTextNode(String(str)));
    return node.innerHTML;
  }

  var validators = {
    fname: function (v) {
      if (!v.trim()) return 'First name is required.';
      if (v.trim().length < 2) return 'Must be at least 2 characters.';
      if (!/^[\p{L}\s'\-]+$/u.test(v.trim())) return 'Please enter a valid name.';
      return '';
    },
    lname: function (v) {
      if (!v.trim()) return 'Last name is required.';
      if (v.trim().length < 2) return 'Must be at least 2 characters.';
      if (!/^[\p{L}\s'\-]+$/u.test(v.trim())) return 'Please enter a valid name.';
      return '';
    },
    email: function (v) {
      if (!v.trim()) return 'Email address is required.';
      if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim())) return 'Please enter a valid email.';
      return '';
    },
    phone: function (v) {
      if (!v.trim()) return 'Phone number is required.';
      if (!/^[\+]?[\d\s\-\(\)]{7,20}$/.test(v.trim())) return 'Please enter a valid phone number.';
      return '';
    },
    service: function (v) {
      if (!v) return 'Please select a service.';
      return '';
    }
  };

  var requiredFields = ['fname', 'lname', 'email', 'phone', 'service'];

  function validateField(id) {
    var input = document.getElementById(id);
    var errorEl = document.getElementById(id + '-error');
    if (!input || !errorEl || !validators[id]) return true;
    var msg = validators[id](sanitize(input.value));
    errorEl.textContent = msg;
    input.classList.toggle('has-error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  requiredFields.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', function () { validateField(id); });
    el.addEventListener('input', function () {
      if (el.classList.contains('has-error')) validateField(id);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = requiredFields.reduce(function (acc, id) {
        return validateField(id) && acc;
      }, true);

      if (!valid) {
        var firstErr = contactForm.querySelector('.has-error');
        if (firstErr) firstErr.focus();
        return;
      }

      submitBtn.disabled = true;
      var btnText = submitBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Sending\u2026';

      setTimeout(function () {
        contactForm.querySelectorAll('.contact-form__input').forEach(function (inp) {
          inp.value = '';
          inp.classList.remove('has-error');
          inp.removeAttribute('aria-invalid');
        });

        requiredFields.forEach(function (id) {
          var err = document.getElementById(id + '-error');
          if (err) err.textContent = '';
        });

        formSuccess.hidden = false;
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Book Appointment';

        setTimeout(function () {
          formSuccess.hidden = true;
        }, 7000);
      }, 1600);
    });
  }

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!('loading' in HTMLImageElement.prototype)) {
    var lazyImgs = document.querySelectorAll('img[data-src]');
    if (lazyImgs.length) {
      var lazyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          lazyObserver.unobserve(img);
        });
      });
      lazyImgs.forEach(function (img) { lazyObserver.observe(img); });
    }
  }

}());
