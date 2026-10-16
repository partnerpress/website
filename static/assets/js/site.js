// PartnerPress site behaviour: mobile menu, Locations dropdown, contact form prefill,
// and GA4 events for phone and email clicks (sent only when GA4 is installed).
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.hidden = open;
    });
  }

  // Close the Locations dropdown on outside click or Escape.
  var dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    document.addEventListener('click', function (e) {
      if (dropdown.open && !dropdown.contains(e.target)) dropdown.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown.open) {
        dropdown.open = false;
        dropdown.querySelector('summary').focus();
      }
    });
  }

  // Prefill the contact form from "Choose plan" links (/contact/?plan=Strive).
  var form = document.querySelector('form[name="book-a-call"]');
  if (form) {
    var plan = new URLSearchParams(window.location.search).get('plan');
    var plans = {
      Survive: 'WordPress care plan', Strive: 'WordPress care plan', Arrive: 'WordPress care plan',
      County: 'Local SEO', Region: 'Local SEO', State: 'Local SEO'
    };
    if (plan && plans[plan]) {
      form.querySelector('#f-service').value = plans[plan];
      var msg = form.querySelector('#f-message');
      if (!msg.value) msg.value = "I'm interested in the " + plan + ' plan.';
    }
  }

  // Track calls and emails as GA4 events once GA4 is enabled in the page head.
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!link || typeof window.gtag !== 'function') return;
    var isTel = link.getAttribute('href').indexOf('tel:') === 0;
    window.gtag('event', isTel ? 'phone_call_click' : 'email_click', {
      link_url: link.getAttribute('href'),
      page_location: window.location.pathname
    });
  });
})();
