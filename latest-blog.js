(() => {
  'use strict';
  const grid = document.getElementById('latestBlogPosts');
  const status = document.getElementById('latestBlogStatus');
  if (!grid || !status) return;

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'
  });
  const today = new Date();
  const publicationCutoff = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Resolve against the homepage so subdirectory-hosted GitHub Pages also works.
  function safeUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function card(post) {
    const article = element('article', 'latest-blog-card');
    const link = element('a', 'latest-blog-link');
    link.href = safeUrl(post.url);
    const imageUrl = safeUrl(post.image);
    if (imageUrl) {
      const image = element('img', 'latest-blog-image');
      image.src = imageUrl;
      image.alt = typeof post.imageAlt === 'string' ? post.imageAlt : '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => image.remove(), { once: true });
      link.append(image);
    }
    const body = element('div', 'latest-blog-body');
    const meta = element('div', 'latest-blog-meta');
    if (typeof post.category === 'string' && post.category.trim()) {
      meta.append(element('span', 'latest-blog-category', post.category));
    }
    const date = element('time', 'latest-blog-date', dateFormat.format(new Date(`${post.date}T00:00:00Z`)));
    date.dateTime = post.date;
    meta.append(date);
    body.append(meta, element('h3', 'latest-blog-title', post.title));
    if (typeof post.excerpt === 'string' && post.excerpt.trim()) {
      body.append(element('p', 'latest-blog-excerpt', post.excerpt));
    }
    body.append(element('span', 'latest-blog-read', 'Read story →'));
    link.append(body);
    article.append(link);
    return article;
  }

  async function loadPosts() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(new URL('blog/posts.json', document.baseURI), {
        cache: 'no-cache', signal: controller.signal
      });
      if (!response.ok) throw new Error('Post list unavailable');
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Expected a post list');
      const sortedPosts = data.filter(post => post && post.published !== false &&
        typeof post.title === 'string' && post.title.trim() &&
        validDate(post.date) && post.date <= publicationCutoff && safeUrl(post.url))
        .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
      const posts = grid.dataset.showAll === 'true' ? sortedPosts : sortedPosts.slice(0, 4);
      grid.replaceChildren(...posts.map(card));
      status.textContent = posts.length ? '' : 'Posts coming soon. Check back for GoWild! tips and community stories.';
      status.hidden = posts.length > 0;
    } catch {
      status.textContent = 'The latest posts couldn’t load. Please try again later.';
      status.hidden = false;
    } finally {
      clearTimeout(timeout);
      grid.setAttribute('aria-busy', 'false');
    }
  }
  loadPosts();
})();
