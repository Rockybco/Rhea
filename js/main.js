/* Mariam portfolio: shared header/footer, rendering, filters, project dialog, form.
   Editable content lives in SITE below. */
(() => {
  const SITE = {
    nav: [['index.html', 'Home'], ['about.html', 'About'], ['work.html', 'Work'], ['contact.html', 'Contact']],
    services: [
      ['Social Media Strategy', 'Goals, audience and platform choices shaped into a plan that holds together.'],
      ['Social Media Management', 'Day-to-day publishing and channel upkeep, handled with care.'],
      ['Content Creation', 'Visuals, short-form video and copy built around the brand voice.'],
      ['Content Planning & Calendars', 'Clear calendars that keep posting consistent and purposeful.'],
      ['Community Management', 'Timely, human replies that turn followers into a community.'],
      ['Copywriting & Captions', 'Concise captions that sound like the brand, not a template.'],
      ['Analytics & Performance Reporting', 'Plain-language reports on what is working and what to change next.'],
      ['Digital Marketing', 'Campaign and channel tactics tied to the business goal.']
    ],
    platforms: ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'X', 'Pinterest'],
    // PLACEHOLDER projects: replace titles, summaries and tags with real work.
    // tags must be one or more of: management, content, strategy, marketing
    projects: [
      { id: 1, title: 'Project title placeholder', cat: 'Social Media Management', tags: ['management', 'content'], services: 'Strategy, content creation, calendar', summary: 'Short project description placeholder.', featured: true },
      { id: 2, title: 'Project title placeholder', cat: 'Digital Marketing', tags: ['marketing'], services: 'Campaign planning, paid social', summary: 'Short project description placeholder.', featured: true },
      { id: 3, title: 'Project title placeholder', cat: 'Content Creation', tags: ['content', 'strategy'], services: 'Copywriting, visual content', summary: 'Short project description placeholder.' },
      { id: 4, title: 'Project title placeholder', cat: 'Social Media Strategy', tags: ['strategy'], services: 'Audit, strategy, reporting', summary: 'Short project description placeholder.' }
    ],
    // PLACEHOLDER testimonials: replace with genuine client feedback only.
    testimonials: [
      { name: 'Client name placeholder', role: 'Client role, business name', text: 'Placeholder testimonial. Replace with genuine client feedback.' },
      { name: 'Client name placeholder', role: 'Client role, business name', text: 'Placeholder testimonial. Replace with genuine client feedback.' },
      { name: 'Client name placeholder', role: 'Client role, business name', text: 'Placeholder testimonial. Replace with genuine client feedback.' }
    ],
    sections: [['overview', 'Project overview'], ['brand', 'The brand or business'], ['challenge', 'The challenge'], ['strategy', 'The strategy'], ['execution', 'Creative execution'], ['outcome', 'Outcome or results']]
  };

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const here = location.pathname.split('/').pop() || 'index.html';
  const linkHtml = ([href, label]) => `<a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a>`;

  /* Shared header: glassmorphic top bar — MARIAM logo + "Let's work together" */
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container bar">
      <a class="logo" href="index.html" aria-label="MARIAM, home"><svg class="logo-svg" viewBox="0 0 176 16" width="176" height="16" role="img" aria-label="MARIAM"><path d="M 4,16 L 4,0 L 14,8 L 26,0 L 26,16 Z"/><path d="M 44,0 L 32,16 L 56,16 Z"/><rect x="62" y="0" width="8" height="16"/><rect x="70" y="0" width="8" height="8"/><rect x="78" y="8" width="6" height="8"/><rect x="94" y="0" width="6" height="16"/><path d="M 124,0 L 112,16 L 136,16 Z"/><path d="M 148,16 L 148,0 L 158,8 L 170,0 L 170,16 Z"/></svg></a>
      <a class="btn btn-primary btn-sm" href="contact.html">Let's work together</a>
    </div>`;
  document.body.insertBefore(header, $('main'));

  /* Links pill: Home, About, Work, Contact — centre bottom, glassmorphic */
  const nav = document.createElement('nav');
  nav.className = 'site-nav'; nav.id = 'site-nav'; nav.setAttribute('aria-label', 'Primary');
  nav.innerHTML = SITE.nav.map(linkHtml).join('');
  document.body.insertBefore(nav, $('main'));

  /* Shared footer. Social and contact entries stay as text until real links are supplied. */
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="foot-grid">
        <div>
          <p class="foot-name">Sulaiman Mariam Opeyemi</p>
          <p>Social Media Manager &amp; Digital Marketing Specialist</p>
          <p class="tagline">Building connections. Creating impact. Growing brands.</p>
        </div>
        <nav aria-label="Footer">${SITE.nav.map(linkHtml).join('')}</nav>
        <div>
          <p class="foot-label">Contact</p>
          <p>Add email address</p>
          <p class="foot-label">Social</p>
          <p>Add social profile links</p>
        </div>
      </div>
      <p class="copy">&copy; <span data-year></span> Sulaiman Mariam Opeyemi. All rights reserved.</p>
    </div>`;
  $('main').after(footer);

  /* Rendering from SITE */
  const render = (name, html) => { const n = $(`[data-render="${name}"]`); if (n) n.innerHTML = html; };
  render('services', SITE.services.map(([t, d], i) => `<li class="service"><span class="svc-no">${pad(i + 1)}</span><h3>${t}</h3><p>${d}</p></li>`).join(''));
  render('platforms', SITE.platforms.map(p => `<li>${p}</li>`).join(''));
  const card = p => `
    <article class="project" data-tags="${p.tags.join(' ')}">
      <div class="ph ph-project" role="img" aria-label="${p.title}: thumbnail placeholder">Thumbnail placeholder<small>assets/images/project-${p.id}.jpg</small></div>
      <p class="eyebrow">${p.cat}</p>
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <p class="meta"><span>Services:</span> ${p.services}</p>
      <button class="link-btn" type="button" data-open="${p.id}">View project</button>
    </article>`;
  render('featured', SITE.projects.filter(p => p.featured).map(card).join(''));
  render('gallery', SITE.projects.map(card).join(''));
  render('testimonials', SITE.testimonials.map(t => `
    <figure class="quote">
      <span class="tag">Placeholder</span>
      <blockquote>${t.text}</blockquote>
      <figcaption><strong>${t.name}</strong>${t.role}</figcaption>
    </figure>`).join(''));

  /* Project dialog (native <dialog>: focus trap, Esc to close) */
  const dlg = document.createElement('dialog');
  dlg.className = 'project-dialog';
  dlg.setAttribute('aria-labelledby', 'pd-title');
  dlg.innerHTML = `
    <div class="dlg-inner">
      <button class="dlg-close" type="button" aria-label="Close project">&times;</button>
      <p class="eyebrow" id="pd-cat"></p>
      <h2 id="pd-title"></h2>
      <div id="pd-body"></div>
    </div>`;
  document.body.append(dlg);
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('.dlg-close')) dlg.close(); });
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-open]');
    if (!btn) return;
    const p = SITE.projects.find(x => x.id === Number(btn.dataset.open));
    $('#pd-cat', dlg).textContent = p.cat;
    $('#pd-title', dlg).textContent = p.title;
    $('#pd-body', dlg).innerHTML = SITE.sections.map(([, label]) =>
      `<section><h3>${label}</h3><p>Placeholder: add ${label.toLowerCase()} for this project.</p></section>`).join('') +
      `<div class="ph ph-wide" role="img" aria-label="Project images placeholder">Screenshots and larger previews<small>Add images here</small></div>`;
    dlg.showModal();
  });

  /* Work filters (no page reload) */
  $$('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    $$('[data-render="gallery"] .project').forEach(c => {
      c.hidden = f !== 'all' && !c.dataset.tags.split(' ').includes(f);
    });
  }));

  /* Contact form: validation, then sends only if a form endpoint is configured.
     No success message is shown unless the server confirms receipt. */
  const form = $('#contact-form');
  if (form) {
    const status = $('#form-status');
    const rules = {
      name: [v => v.trim().length >= 2, 'Enter your full name.'],
      email: [v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 'Enter a valid email address, such as name@example.com.'],
      service: [v => v !== '', 'Choose the service you need.'],
      message: [v => v.trim().length >= 20, 'Add a little more detail (at least 20 characters).']
    };
    const fields = $$('input, select, textarea', form);
    const check = field => {
      const rule = rules[field.name];
      if (!rule) return true;
      const ok = rule[0](field.value);
      field.setAttribute('aria-invalid', String(!ok));
      $('#err-' + field.name, form).textContent = ok ? '' : rule[1];
      return ok;
    };
    const showStatus = (text, type) => { status.textContent = text; status.className = 'form-status ' + type; };
    fields.forEach(f => f.addEventListener('blur', () => check(f)));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const valid = fields.map(check).every(Boolean);
      if (!valid) {
        fields.find(f => f.getAttribute('aria-invalid') === 'true').focus();
        return showStatus('Please correct the highlighted fields.', 'is-error');
      }
      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        return showStatus('This form is not connected yet, so your message has not been sent. Please use the contact details on this page.', 'is-error');
      }
      showStatus('Sending…', 'is-pending');
      try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        showStatus('Thank you. Your message has been sent.', 'is-success');
      } catch {
        showStatus('Something went wrong and your message was not sent. Please try again.', 'is-error');
      }
    });
  }

  $$('[data-year]').forEach(n => { n.textContent = new Date().getFullYear(); });
})();
