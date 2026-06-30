(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var observer;
  var safetyTimer;

  function motionAllowed() {
    return !reduceMotion.matches;
  }

  function revealImmediately(element) {
    element.classList.add('is-visible');
  }

  function revealGroup(group) {
    var items = Array.prototype.slice.call(group.querySelectorAll('[data-reveal-item]'));
    items.forEach(function (item, index) {
      item.style.setProperty('--reveal-delay', Math.min(index * 70, 280) + 'ms');
      revealImmediately(item);
    });
  }

  function observeRevealElements() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-reveal-group]'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach(revealImmediately);
      groups.forEach(revealGroup);
      window.clearTimeout(safetyTimer);
      return;
    }

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (entry.target.hasAttribute('data-reveal-group')) {
          revealGroup(entry.target);
        } else {
          revealImmediately(entry.target);
        }
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8%'
    });

    elements.forEach(function (element) { observer.observe(element); });
    groups.forEach(function (group) { observer.observe(group); });
    window.clearTimeout(safetyTimer);
  }

  function enableMotion() {
    if (!motionAllowed()) {
      disableMotion();
      return;
    }

    /* Content is visible by default; this class opts the page into hidden reveal states. */
    root.classList.add('motion-enabled');
    safetyTimer = window.setTimeout(disableMotion, 2500);

    // Wait for the hidden state to paint before adding .is-visible.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        try {
          observeRevealElements();
        } catch (_) {
          disableMotion();
        }
      });
    });
  }

  function disableMotion() {
    root.classList.remove('motion-enabled');
    window.clearTimeout(safetyTimer);
    if (observer) observer.disconnect();
    document.querySelectorAll('[data-reveal], [data-reveal-item]').forEach(revealImmediately);
  }

  function initializeMotion() {
    try {
      if (motionAllowed()) enableMotion();
      else disableMotion();
    } catch (_) {
      disableMotion();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMotion);
  } else {
    initializeMotion();
  }

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', function () {
      disableMotion();
      if (motionAllowed()) enableMotion();
    });
  }
}());
