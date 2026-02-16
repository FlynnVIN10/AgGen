/* ============================================
   AgGen — Main JavaScript
   Plant & Soil Probiotics
   ============================================ */

(function () {
  'use strict';

  /* ---- DOM Ready ---- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Show body (fade-in)
    document.body.classList.add('is-loaded');

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu
    initMobileMenu();

    // Scroll reveal
    initScrollReveal();

    // Scroll-to-top button
    initScrollTop();

    // Header scroll effect
    initHeaderScroll();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Contact form placeholder handler
    initContactForm();
  }

  /* ---- Mobile Menu ---- */
  function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Scroll Reveal ---- */
  function initScrollReveal() {
    var elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Scroll to Top ---- */
  function initScrollTop() {
    var btn = document.querySelector('[data-scroll-top]');
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 400) {
        btn.hidden = false;
      } else {
        btn.hidden = true;
      }
    }

    window.addEventListener('scroll', throttle(toggleVisibility, 150), { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Header Scroll ---- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 60) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
  }

  /* ---- Smooth Scroll ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update URL without scroll jump
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      });
    });
  }

  /* ---- Contact Form ---- */
  function initContactForm() {
    var forms = document.querySelectorAll('.form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your interest in AgGen! This form is a placeholder — submission handling will be configured during Shopify integration.');
      });
    });

    // Newsletter forms
    document.querySelectorAll('.footer-signup').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing! Newsletter integration will be set up during launch.');
      });
    });
  }

  /* ---- Throttle Utility ---- */
  function throttle(fn, wait) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, arguments);
      }
    };
  }

})();
