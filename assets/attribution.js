(function () {
  'use strict';

  const FIRST_TOUCH_KEY = 'berly:firstTouchAttribution';
  const LAST_TOUCH_KEY = 'berly:lastTouchAttribution';
  const params = new URLSearchParams(window.location.search);
  const currentPage = window.location.href;
  const currentReferrer = document.referrer || '';

  function queryValue(name) {
    const value = params.get(name);
    return value && value.trim() ? value.trim() : '';
  }

  function referrerSource(referrer) {
    if (!referrer) return 'direct';

    try {
      const hostname = new URL(referrer).hostname.toLowerCase().replace(/^www\./, '');
      if (hostname === 'producthunt.com' || hostname.endsWith('.producthunt.com')) return 'producthunt';
      if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) return 'linkedin';
      if (hostname === 'google.com' || hostname.endsWith('.google.com') || /^google\.[a-z.]+$/.test(hostname)) return 'google';
    } catch (_) {
      // An invalid or restricted referrer is still an external referral.
    }

    return 'referral';
  }

  function deriveSource() {
    return queryValue('source') || queryValue('utm_source') || referrerSource(currentReferrer);
  }

  function read(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === 'object' ? value : null;
    } catch (_) {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // Attribution must never prevent the page or classifier from working.
    }
  }

  const campaign = {
    source: queryValue('source'),
    utmSource: queryValue('utm_source'),
    utmMedium: queryValue('utm_medium'),
    utmCampaign: queryValue('utm_campaign'),
    utmTerm: queryValue('utm_term'),
    utmContent: queryValue('utm_content'),
  };

  let firstTouch = read(FIRST_TOUCH_KEY);
  if (!firstTouch) {
    firstTouch = {
      firstLandingPage: currentPage,
      firstReferrer: currentReferrer,
      firstTouchSource: deriveSource(),
      ...campaign,
      capturedAt: new Date().toISOString(),
    };
    write(FIRST_TOUCH_KEY, firstTouch);
  }

  const previousLastTouch = read(LAST_TOUCH_KEY) || {};
  const latestCampaign = Object.fromEntries(
    Object.entries(campaign).map(([key, value]) => [key, value || previousLastTouch[key] || ''])
  );
  const lastTouch = {
    lastLandingPage: currentPage,
    lastReferrer: currentReferrer,
    lastTouchSource: deriveSource(),
    ...latestCampaign,
    updatedAt: new Date().toISOString(),
  };
  write(LAST_TOUCH_KEY, lastTouch);

  window.BerlyAttribution = {
    getAttribution: function () {
      return {
        firstTouch: read(FIRST_TOUCH_KEY) || firstTouch,
        lastTouch: read(LAST_TOUCH_KEY) || lastTouch,
        currentPage: window.location.href,
        currentReferrer: document.referrer || '',
      };
    },
  };
})();
