const content = window.SITE_CONTENT;
const externalLinkIcon = `
  <svg class="external-link-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3 13 13 3M6 3h7v7"></path>
  </svg>
`;

if (!content) {
  throw new Error("Website content could not be loaded. Check the files in content/ for syntax errors.");
}

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value !== undefined) element.textContent = value;
};

const setMailLink = (element, email) => {
  if (element) element.href = `mailto:${email}`;
};

const formatGalleryDate = date => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(new Date(`${date}T00:00:00Z`));

document.title = content.site.pageTitle;
document.querySelector('meta[name="description"]').content = content.site.description;

document.querySelector('.slu-logo').href = content.site.sluWebsite;

setText('.hero .eyebrow', content.hero.eyebrow);
setText('#hero-title', content.hero.title);
document.querySelector('.hero .role').innerHTML = `${content.hero.position}<br>${content.hero.institution}`;
setText('.hero .intro', content.hero.introduction);
const heroEmail = document.querySelector('.contact-line a');
setText('.contact-line a', content.site.email);
setMailLink(heroEmail, content.site.email);
setText('.contact-line span', content.site.address);
document.querySelector('.portrait-frame img').src = content.site.portrait;
document.querySelector('.portrait-frame img').alt = `Portrait of ${content.site.name}`;
setMailLink(document.querySelector('.hero .button.secondary'), content.site.email);

setText('.about h2', content.about.heading);
document.querySelector('.two-col-copy').innerHTML = content.about.paragraphs.map(text => `<p>${text}</p>`).join('');
document.querySelector('.timeline').innerHTML = content.about.timeline.map(item => `
  <div>
    <span>${item.period}</span>
    <strong>${item.institution}</strong>
    <small>${item.role}</small>
  </div>
`).join('');

setText('.research .section-heading h2', content.research.heading);
setText('.research .section-heading p', content.research.introduction);
document.querySelector('.research-grid').innerHTML = content.research.areas.map(item => `
  <article>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </article>
`).join('');

setText('.team .section-heading h2', content.team.heading);
setText('.team .section-heading p', content.team.introduction);
document.querySelector('.team-grid').innerHTML = content.team.members.map(member => {
  const name = member.website
    ? `<a class="team-name-link" href="${member.website}" target="_blank" rel="noreferrer"
         aria-label="Visit ${member.name}'s personal website">${member.name}${externalLinkIcon}</a>`
    : member.name;
  const email = member.email
    ? `<a class="team-email" href="mailto:${member.email}">${member.email}</a>`
    : '';
  return `
    <article class="team-card">
      <img class="team-photo" src="${member.photo}" alt="${member.name}">
      <div>
        <p class="team-role">${member.position}</p>
        <h3>${name}</h3>
        <p>${member.description}</p>
        ${email}
      </div>
    </article>
  `;
}).join('');

const gallerySection = document.querySelector('.gallery');
const galleryNav = document.querySelector('.gallery-nav');
const galleryItems = [...(content.gallery?.items || [])]
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
if (galleryItems.length) {
  gallerySection.hidden = false;
  galleryNav.hidden = false;
  setText('.gallery h2', content.gallery.heading);
  setText('.gallery .section-heading p', content.gallery.introduction);
  const galleryTrack = document.querySelector('.gallery-track');
  galleryTrack.innerHTML = galleryItems.map(item => `
    <figure>
      <img src="${item.photo}" alt="${item.alt}" loading="lazy">
      <figcaption>
        <strong>${item.caption}</strong>
        <time datetime="${item.date}">${formatGalleryDate(item.date)}</time>
      </figcaption>
    </figure>
  `).join('');
  document.querySelector('.gallery-previous').addEventListener('click', () => {
    galleryTrack.scrollBy({ left: -galleryTrack.clientWidth * .8, behavior: 'smooth' });
  });
  document.querySelector('.gallery-next').addEventListener('click', () => {
    galleryTrack.scrollBy({ left: galleryTrack.clientWidth * .8, behavior: 'smooth' });
  });
} else {
  galleryNav.hidden = true;
}

setText('.news h2', content.news.heading);
setText('.news .muted', content.news.introduction);
const recentNews = [...content.news.items]
  .filter(item => !Number.isNaN(Date.parse(item.date)))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .slice(0, content.news.visibleItems || 6);
const formatNewsDate = date => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
}).format(new Date(`${date}T00:00:00Z`));
document.querySelector('.news-list').innerHTML = recentNews.map(item => `
  <article>
    <time datetime="${item.date}">${formatNewsDate(item.date)}</time>
    <p>
      ${item.text}
      ${item.acceptanceRate
        ? `<span class="acceptance-rate">Acceptance rate: ${item.acceptanceRate}</span>`
        : ''}
    </p>
  </article>
`).join('');
setText('.publications .section-heading h2', content.publications.heading);
setText('.publications .section-heading p', content.publications.introduction);
const selectedPublications = [...content.publications.items]
  .filter(item => !Number.isNaN(Date.parse(item.date)))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .slice(0, content.publications.visibleItems || 5);
document.querySelector('.pub-list').innerHTML = selectedPublications.map(item => {
  const publisherButton = item.publisherLabel && item.publisherUrl
    ? `<a class="publication-button" href="${item.publisherUrl}" target="_blank" rel="noreferrer">
         ${item.publisherLabel}${externalLinkIcon}
       </a>`
    : '';
  const preprintButton = item.preprintLabel && item.preprintUrl
    ? `<a class="publication-button secondary" href="${item.preprintUrl}" target="_blank" rel="noreferrer">
         ${item.preprintLabel}${externalLinkIcon}
       </a>`
    : '';
  const authors = item.authors
    ? `<p class="publication-authors">${item.authors}</p>`
    : '';
  const actions = publisherButton || preprintButton
    ? `<div class="publication-actions">${publisherButton}${preprintButton}</div>`
    : '';
  return `
    <article class="publication-item">
      <span class="year">${item.year}</span>
      <div>
        <h3>${item.title}</h3>
        ${authors}
        <p>${item.venue}</p>
        ${actions}
      </div>
    </article>
  `;
}).join('');
const scholarLink = document.querySelector('.publications .text-link');
scholarLink.href = content.site.scholarWebsite;
scholarLink.innerHTML = `${content.publications.linkText}${externalLinkIcon}`;

setText('.teaching .section-heading h2', content.teaching.heading);
setText('.teaching .section-heading p', content.teaching.introduction);
document.querySelector('.course-list').innerHTML = content.teaching.courses.map(course => {
  const body = `
    <span class="course-code">${course.code}</span>
    <div>
      <h3>${course.title}${course.link ? externalLinkIcon : ''}</h3>
      ${course.details ? `<p>${course.details}</p>` : ''}
    </div>
  `;
  return course.link
    ? `<a class="course-item" href="${course.link}" target="_blank" rel="noreferrer"
         aria-label="Open course page: ${course.title}">${body}</a>`
    : `<article class="course-item">${body}</article>`;
}).join('');

setText('.service h2', content.service.heading);
setText('.service-grid > div p', content.service.introduction);
document.querySelector('.service ul').innerHTML = content.service.items.map(item => `
  <li>
    <strong>${item.organization}</strong>
    <span>${item.role}</span>
  </li>
`).join('');

setText('.cta .eyebrow', content.recruitment.eyebrow);
setText('.cta h2', content.recruitment.heading);
setText('.cta > p:not(.eyebrow)', content.recruitment.text);
const recruitmentButton = document.querySelector('.cta .button');
recruitmentButton.innerHTML = `${content.recruitment.buttonText} <span aria-hidden="true">→</span>`;
setMailLink(recruitmentButton, content.site.email);

setText('footer strong', content.site.name);
setText('footer p', content.footer.labName);
setText('footer div:nth-child(2) a', content.footer.backToTop);
document.querySelector('footer small').innerHTML = `© <span id="year"></span> ${content.site.name}`;
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('main > .section:not([hidden]) .section-label').forEach((label, index) => {
  const sectionName = label.textContent.split('/').pop().trim();
  label.textContent = `${String(index + 1).padStart(2, '0')} / ${sectionName}`;
});

const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
button.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', () => {
  nav.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
});
