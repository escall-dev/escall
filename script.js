(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));
  const dockLinks = Array.from(document.querySelectorAll('.dock__link'));
  const allLinks = navLinks.concat(dockLinks);

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme
  const storageKey = 'prefers-theme';
  const saved = localStorage.getItem(storageKey);
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (systemPrefersDark ? 'theme-dark' : 'theme-light');
  root.classList.remove('theme-dark', 'theme-light');
  root.classList.add(initialTheme);

  toggle?.addEventListener('click', () => {
    const isDark = root.classList.contains('theme-dark');
    root.classList.toggle('theme-dark', !isDark);
    root.classList.toggle('theme-light', isDark);
    const next = isDark ? 'theme-light' : 'theme-dark';
    try { localStorage.setItem(storageKey, next); } catch (_) {}
  });

  // Smooth active link highlighting
  const sections = ['home', 'about', 'work', 'skills', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    allLinks.forEach(link => {
      const isMatch = link.getAttribute('data-section') === id;
      link.classList.toggle('is-active', isMatch);
      link.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });
  };

  let current = null;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        current = entry.target.id;
        setActive(current);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] });

  sections.forEach(sec => io.observe(sec));

  // Keyboard users: remove focus ring only on mouse
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }
  function handleMouseDownOnce() {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  }
  window.addEventListener('keydown', handleFirstTab);

(function(){
	const navLinks = Array.from(document.querySelectorAll('.bottom-nav .nav-item'));
	const sections = navLinks.map(link => document.getElementById(link.dataset.section));

	// Active section highlighting
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const id = entry.target.id;
			const link = navLinks.find(l => l.dataset.section === id);
			if(!link) return;
			if(entry.isIntersecting){
				navLinks.forEach(l => l.classList.remove('active'));
				link.classList.add('active');
			}
		});
	}, { root: null, rootMargin: '0px 0px -55% 0px', threshold: 0.35 });

	sections.forEach(section => section && observer.observe(section));

	// Improve default scrolling offset when clicking anchors on mobile
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			const targetId = link.getAttribute('href').slice(1);
			const target = document.getElementById(targetId);
			if(!target) return;
			e.preventDefault();
			const rect = target.getBoundingClientRect();
			const offset = window.scrollY + rect.top - 8; // small headroom
			window.scrollTo({ top: offset, behavior: 'smooth' });
		});
	});
})();


