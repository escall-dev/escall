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
})();

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
			
			// Special handling for home section - scroll to top
			if(targetId === 'home') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				const rect = target.getBoundingClientRect();
				const offset = window.scrollY + rect.top - 8; // small headroom
				window.scrollTo({ top: offset, behavior: 'smooth' });
			}
		});
	});
})();

// Name Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
	const nameElement = document.getElementById('typewriter-name');
	if (nameElement) {
		console.log('Name typewriter element found');
		
		// Clear any existing content
		nameElement.textContent = '';
		
		const nameText = 'Alexander Joerenz Escallente';
		let nameCharIndex = 0;

		function typewriterName() {
			if (nameCharIndex < nameText.length) {
				nameElement.textContent = nameText.substring(0, nameCharIndex + 1);
				nameCharIndex++;
				setTimeout(typewriterName, 100);
			} else {
				console.log('Name typing completed');
			}
		}

		// Start name typing immediately
		console.log('Starting name typewriter in 500ms');
		setTimeout(typewriterName, 500);
	} else {
		console.log('Name typewriter element not found');
	}
});

// Hero Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
	const typewriterElement = document.getElementById('typewriter');
	if (!typewriterElement) {
		console.log('Typewriter element not found');
		return;
	}
	
	console.log('Typewriter element found, starting animation');
	
	// Clear initial text
	typewriterElement.textContent = '';

	const texts = [
	'Full-Stack Developer',
	'Software Developer',
	'Building seamless web experiences',
    'Developing end-to-end digital solutions',
    'Crafting scalable and efficient systems',
    'Creating intuitive user interfaces',
   
	];

	let currentTextIndex = 0;
	let currentCharIndex = 0;
	let isDeleting = false;

	function typeWriter() {
		const currentText = texts[currentTextIndex];
		
		if (!isDeleting) {
			// Typing
			if (currentCharIndex < currentText.length) {
				typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
				currentCharIndex++;
				setTimeout(typeWriter, 100);
			} else {
				// Finished typing, pause then start deleting
				setTimeout(() => {
					isDeleting = true;
					typeWriter();
				}, 2000);
			}
		} else {
			// Deleting
			if (currentCharIndex > 0) {
				typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
				currentCharIndex--;
				setTimeout(typeWriter, 50);
			} else {
				// Finished deleting, move to next text
				isDeleting = false;
				currentTextIndex = (currentTextIndex + 1) % texts.length;
				setTimeout(typeWriter, 500);
			}
		}
	}

	// Start the hero typewriter effect after name is done
	setTimeout(typeWriter, 3000); // Delay to let name finish first
});

// Image Modal Functions
function openImageModal(imageSrc, caption) {
	const modal = document.getElementById('imageModal');
	const modalImg = document.getElementById('modalImage');
	const modalCaption = document.getElementById('modalCaption');
	
	modalImg.src = imageSrc;
	modalCaption.textContent = caption;
	modal.style.display = 'block';
	modal.classList.add('show');
	
	// Prevent body scroll when modal is open
	document.body.style.overflow = 'hidden';
}

function closeImageModal() {
	const modal = document.getElementById('imageModal');
	modal.classList.remove('show');
	
	// Restore body scroll
	document.body.style.overflow = 'auto';
	
	// Hide modal after animation
	setTimeout(() => {
		modal.style.display = 'none';
	}, 300);
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
	const modal = document.getElementById('imageModal');
	if (event.target === modal) {
		closeImageModal();
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		closeImageModal();
		closeProjectModal();
	}
});

// Projects Carousel Functionality - True Infinite Loop
let currentSlide = 0;
const totalSlides = 5;
const slideWidth = 340; // 300px slide + 40px gap
let visibleSlides = 3; // Number of slides visible at once

// Project templates for infinite generation
const projectTemplates = [
	{
		img: "imgs/tms.png",
		alt: "Tardiness Monitoring System",
		title: "Tardiness Monitoring System",
		modalIndex: 0
	},
	{
		img: "imgs/Qnnect-v1.3.6.png",
		alt: "Qnnect",
		title: "Qnnect",
		modalIndex: 1
	},
	{
		img: "imgs/Charifund.png",
		alt: "ChariFund",
		title: "ChariFund",
		modalIndex: 2
	},
	{
		img: "imgs/lms.png",
		alt: "Logbook Monitoring System",
		title: "Logbook Monitoring System",
		modalIndex: 3
	},
	{
		img: "imgs/camp_of_coffee POS.png",
		alt: "Camp of Coffee POS",
		title: "Camp of Coffee POS",
		modalIndex: 4
	}
];

// Project data for modal
const projectsData = [
	{
		title: "Tardiness Monitoring System",
		image: "imgs/tms.png",
		description: "A Late Monitoring System Deployed for Computer Site Institute Incorporated. It is a comprehensive system that monitors and records student tardiness in educational institutions. Features real-time tracking, reporting, and administrative controls.",
		tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		actions: [
			{ text: "Live Demo", href: "https://comsite-tms.vercel.app/", type: "primary" },
			{ text: "View Code", href: "https://github.com/escall-dev/Comsite-tardiness-monitoring-system", type: "ghost" }
		]
	},
	{
		title: "Qnnect",
		image: "imgs/Qnnect-v1.3.6.png",
		description: "A QR Code Digital Attendance Tracking System that uses QR codes for efficient student tracking. Features real-time attendance monitoring.",
		tech: ["PHP", "JavaScript", "MySQL", "API", "Bootstrap", "jQuery", "AJAX", "JSON", "XAMPP", "Apache", "Windows"],
		actions: [
			{ text: "Documentation", href: "https://github.com/escall-dev/Qnnect/blob/main/README.md", type: "primary" },
			{ text: "View Code", href: "https://github.com/escall-dev/Qnnect", type: "ghost" }
		]
	},
	{
		title: "ChariFund",
		image: "imgs/Charifund.png",
		description: "A 8-Charity Project and Funds System that manages Grade 8 charity projects and tracks funds. Includes donation tracking, project management, and financial reporting.",
		tech: ["HTML", "CSS", "JavaScript"],
		actions: [
			{ text: "Documentation", href: "https://github.com/escall-dev/8-charifund/blob/main/README.md", type: "primary" },
			{ text: "View Code", href: "https://github.com/escall-dev/8-charifund", type: "ghost" }
		]
	},
	{
		title: "Logbook Monitoring System",
		image: "imgs/lms.png",
		description: "A comprehensive system for monitoring and managing logbooks in educational or professional settings. Features digital logbook tracking, entry validation, and administrative oversight.",
		tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		actions: [
			{ text: "Documentation", href: "https://github.com/escall-dev/logbook-monitoring-system", type: "primary" },
			{ text: "View Code", href: "https://github.com/escall-dev/logbook-monitoring-system", type: "ghost" }
		]
	},
	{
		title: "Camp of Coffee POS",
		image: "imgs/camp_of_coffee POS.png",
		description: "A comprehensive Point of Sale (POS) and inventory management system designed for coffee shops. Features sales tracking, stock management, customer management, and detailed reporting for business operations.",
		tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap", "jQuery"],
		actions: [
			{ text: "Documentation", href: "https://github.com/escall-dev/camp-of-coffee/blob/main/README.md", type: "primary" },
			{ text: "View Code", href: "https://github.com/escall-dev/camp-of-coffee", type: "ghost" }
		]
	}
];

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
	// Initialize infinite carousel system
	initializeInfiniteCarousel();
	createCarouselDots();
	
	// Set up smooth transitions
	const track = document.getElementById('carouselTrack');
	track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
	
	// Initial update
	updateInfiniteCarousel();
	initSwipeHandlers();

	// Add additional click handlers for better mobile support
	setupMobileClickHandlers();

	// Projects title typewriter (looping)
	const projTitle = document.getElementById('projects-typewriter');
	if (projTitle) {
		projTitle.textContent = '';
		
		const projTexts = [
			'My Projects',
			'Work Showcase',
			'Featured Work',
			'Recent Projects'
		];
		
		let projCurrentTextIndex = 0;
		let projCurrentCharIndex = 0;
		let projIsDeleting = false;
		
		function projTypeWriter() {
			const currentText = projTexts[projCurrentTextIndex];
			
			if (!projIsDeleting) {
				// Typing
				if (projCurrentCharIndex < currentText.length) {
					projTitle.textContent = currentText.substring(0, projCurrentCharIndex + 1);
					projCurrentCharIndex++;
					setTimeout(projTypeWriter, 100);
				} else {
					// Finished typing, pause then start deleting
					setTimeout(() => {
						projIsDeleting = true;
						projTypeWriter();
					}, 2000);
				}
			} else {
				// Deleting
				if (projCurrentCharIndex > 0) {
					projTitle.textContent = currentText.substring(0, projCurrentCharIndex - 1);
					projCurrentCharIndex--;
					setTimeout(projTypeWriter, 50);
				} else {
					// Finished deleting, move to next text
					projIsDeleting = false;
					projCurrentTextIndex = (projCurrentTextIndex + 1) % projTexts.length;
					setTimeout(projTypeWriter, 500);
				}
			}
		}
		
		// Start projects typewriter after a delay
		setTimeout(projTypeWriter, 1000);
	}
});

// Additional mobile click handler setup
function setupMobileClickHandlers() {
	// Add touch-specific handling for better mobile experience
	const carouselContainer = document.querySelector('.carousel-container');
	if (carouselContainer) {
		// Add a dedicated tap handler for mobile devices
		carouselContainer.addEventListener('touchend', handleMobileTap, { passive: true });
	}
}

function handleMobileTap(e) {
	// Only handle if we didn't drag and it was a quick tap
	if (!hasMoved && Date.now() - startTime < 300) {
		const slide = e.target.closest('.carousel-slide');
		if (slide && slide.dataset.modalIndex) {
			// Add a small delay to ensure smooth interaction
			setTimeout(() => {
				openProjectModal(parseInt(slide.dataset.modalIndex));
			}, 50);
		}
	}
}

// Generate a slide element
function createSlideElement(slideIndex) {
	const projectIndex = ((slideIndex % totalSlides) + totalSlides) % totalSlides;
	const project = projectTemplates[projectIndex];
	
	const slide = document.createElement('div');
	slide.className = 'carousel-slide';
	// Remove direct onclick - using event delegation instead
	slide.dataset.modalIndex = project.modalIndex;
	
	slide.innerHTML = `
		<div class="project-preview">
			<img src="${project.img}" alt="${project.alt}" loading="lazy">
			<div class="project-overlay">
				<h3>${project.title}</h3>
				<p>Tap to view details</p>
			</div>
		</div>
	`;
	
	return slide;
}

// Initialize infinite carousel with initial slides
function initializeInfiniteCarousel() {
	const track = document.getElementById('carouselTrack');
	const buffer = 10; // Extra slides on each side
	
	// Set track to relative positioning for absolute children
	track.style.position = 'relative';
	track.style.height = 'auto'; // Let height be determined by content
	track.style.minHeight = '200px'; // Minimum height for mobile
	
	// Generate initial slides
	for (let i = -buffer; i < visibleSlides + buffer; i++) {
		const slide = createSlideElement(i);
		slide.dataset.slideIndex = i;
		slide.style.position = 'absolute';
		slide.style.left = `${i * slideWidth}px`;
		slide.style.width = `300px`;
		track.appendChild(slide);
	}
}

// Update carousel position and manage slides
function updateInfiniteCarousel() {
	const track = document.getElementById('carouselTrack');
	const slides = track.querySelectorAll('.carousel-slide');
	
	// Check if we need to add/remove slides BEFORE updating position
	const buffer = 10; // Increased buffer for smoother experience
	const existingIndices = Array.from(slides).map(slide => parseInt(slide.dataset.slideIndex));
	const minIndex = existingIndices.length > 0 ? Math.min(...existingIndices) : 0;
	const maxIndex = existingIndices.length > 0 ? Math.max(...existingIndices) : 0;
	
	// Add slides to the left if needed
	if (currentSlide - buffer < minIndex) {
		for (let i = minIndex - 1; i >= currentSlide - buffer; i--) {
			const slide = createSlideElement(i);
			slide.dataset.slideIndex = i;
			slide.style.position = 'absolute';
			slide.style.left = `${i * slideWidth}px`;
			slide.style.width = `300px`;
			track.insertBefore(slide, track.firstChild);
		}
	}
	
	// Add slides to the right if needed
	if (currentSlide + visibleSlides + buffer > maxIndex) {
		for (let i = maxIndex + 1; i <= currentSlide + visibleSlides + buffer; i++) {
			const slide = createSlideElement(i);
			slide.dataset.slideIndex = i;
			slide.style.position = 'absolute';
			slide.style.left = `${i * slideWidth}px`;
			slide.style.width = `300px`;
			track.appendChild(slide);
		}
	}
	
	// Update position - use consistent calculation
	track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
	
	// Remove slides that are too far away to save memory
	const slidesToRemove = Array.from(track.querySelectorAll('.carousel-slide')).filter(slide => {
		const index = parseInt(slide.dataset.slideIndex);
		return index < currentSlide - buffer * 3 || index > currentSlide + visibleSlides + buffer * 3;
	});
	
	slidesToRemove.forEach(slide => slide.remove());
	
	// Update dots
	updateDots();
}

function createCarouselDots() {
	const dotsContainer = document.getElementById('carouselDots');
	dotsContainer.innerHTML = '';
	
	for (let i = 0; i < totalSlides; i++) {
		const dot = document.createElement('div');
		dot.className = 'carousel-dot';
		if (i === 0) dot.classList.add('active');
		dot.onclick = () => goToSlide(i);
		dotsContainer.appendChild(dot);
	}
}

function updateDots() {
	const dots = document.querySelectorAll('.carousel-dot');
	const activeDotIndex = ((currentSlide % totalSlides) + totalSlides) % totalSlides;
	dots.forEach((dot, index) => {
		dot.classList.toggle('active', index === activeDotIndex);
	});
}

function moveCarousel(direction) {
	currentSlide += direction;
	updateInfiniteCarousel();
}

function goToSlide(slideIndex) {
	currentSlide = slideIndex;
	updateInfiniteCarousel();
}

function openProjectModal(projectIndex) {
	const project = projectsData[projectIndex];
	const modal = document.getElementById('projectModal');
	const modalBody = document.getElementById('projectModalBody');
	
	modalBody.innerHTML = `
		<img src="${project.image}" alt="${project.title}" class="project-modal-image">
		<div class="project-modal-info">
			<h2>${project.title}</h2>
			<p>${project.description}</p>
			<div class="project-modal-tech">
				${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
			</div>
			<div class="project-modal-actions">
				${project.actions.map(action => 
					`<a href="${action.href}" class="btn btn-${action.type}" target="_blank" rel="noopener noreferrer">${action.text}</a>`
				).join('')}
			</div>
		</div>
	`;
	
	modal.style.display = 'block';
	modal.classList.add('show');
	document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
	const modal = document.getElementById('projectModal');
	modal.classList.remove('show');
	
	document.body.style.overflow = 'auto';
	
	setTimeout(() => {
		modal.style.display = 'none';
	}, 300);
}

// Close project modal when clicking outside
document.addEventListener('click', function(event) {
	const modal = document.getElementById('projectModal');
	if (event.target === modal) {
		closeProjectModal();
	}
});

// Enhanced Swipe/Drag functionality with proper tap detection
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let initialTransform = 0;
let startTime = 0;
let hasMoved = false;

function initSwipeHandlers() {
	const carouselTrack = document.getElementById('carouselTrack');
	const carouselContainer = carouselTrack.parentElement;
	
	// Add event delegation for slide clicks
	carouselContainer.addEventListener('click', handleSlideClick);
	
	// Mouse events
	carouselContainer.addEventListener('mousedown', startDrag);
	carouselContainer.addEventListener('mousemove', drag);
	carouselContainer.addEventListener('mouseup', endDrag);
	carouselContainer.addEventListener('mouseleave', endDrag);
	
	// Touch events with passive:false for preventDefault
	carouselContainer.addEventListener('touchstart', startDrag, { passive: false });
	carouselContainer.addEventListener('touchmove', drag, { passive: false });
	carouselContainer.addEventListener('touchend', endDrag);
	
	// Prevent default drag behavior on images
	carouselContainer.addEventListener('dragstart', (e) => {
		if (e.target.tagName === 'IMG') {
			e.preventDefault();
		}
	});
}

function handleSlideClick(e) {
	// Only handle clicks if we haven't dragged
	if (hasMoved || isDragging) {
		return;
	}
	
	// Find the closest carousel slide
	const slide = e.target.closest('.carousel-slide');
	if (slide && slide.dataset.modalIndex) {
		e.preventDefault();
		e.stopPropagation();
		openProjectModal(parseInt(slide.dataset.modalIndex));
	}
}

function startDrag(e) {
	// Reset movement tracking
	hasMoved = false;
	startTime = Date.now();
	
	const carouselTrack = document.getElementById('carouselTrack');
	
	// Get initial position
	if (e.type === 'touchstart') {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	} else {
		startX = e.clientX;
		startY = e.clientY;
	}
	
	// Get current transform value
	const transform = carouselTrack.style.transform;
	initialTransform = transform ? parseFloat(transform.match(/-?\d+\.?\d*/)[0]) : 0;
}

function drag(e) {
	// Get current position
	if (e.type === 'touchmove') {
		currentX = e.touches[0].clientX;
		currentY = e.touches[0].clientY;
	} else {
		currentX = e.clientX;
		currentY = e.clientY;
	}
	
	const diffX = currentX - startX;
	const diffY = currentY - startY;
	const distance = Math.sqrt(diffX * diffX + diffY * diffY);
	
	// Only start dragging if we've moved more than 10px
	if (!isDragging && distance > 10) {
		// Check if this is more horizontal than vertical movement
		if (Math.abs(diffX) > Math.abs(diffY)) {
			isDragging = true;
			hasMoved = true;
			
			const carouselTrack = document.getElementById('carouselTrack');
			carouselTrack.style.cursor = 'grabbing';
			carouselTrack.style.transition = 'none';
			
			// Prevent scrolling on touch devices
			if (e.type === 'touchmove') {
				e.preventDefault();
			}
		} else {
			// This is vertical scrolling, don't interfere
			return;
		}
	}
	
	if (!isDragging) return;
	
	// Mark as moved for click prevention
	hasMoved = true;
	
	// Prevent default to stop scrolling
	if (e.type === 'touchmove') {
		e.preventDefault();
	}
	
	const carouselTrack = document.getElementById('carouselTrack');
	
	// Apply drag transform
	carouselTrack.style.transform = `translateX(${initialTransform + diffX}px)`;
}

function endDrag(e) {
	if (!isDragging) {
		// Reset hasMoved after a short delay to allow click events
		setTimeout(() => {
			hasMoved = false;
		}, 100);
		return;
	}
	
	isDragging = false;
	const carouselTrack = document.getElementById('carouselTrack');
	
	// Restore transition and cursor
	carouselTrack.style.cursor = 'grab';
	carouselTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
	
	// Calculate if we should move to next/previous slide
	const diffX = currentX - startX;
	const dragTime = Date.now() - startTime;
	const threshold = 80; // Minimum drag distance to trigger slide change
	const velocity = Math.abs(diffX) / dragTime; // pixels per ms
	
	// Move slide if dragged far enough or fast enough
	if (Math.abs(diffX) > threshold || velocity > 0.5) {
		if (diffX > 0) {
			// Dragged right - go to previous slide
			moveCarousel(-1);
		} else {
			// Dragged left - go to next slide
			moveCarousel(1);
		}
	} else {
		// Snap back to current position
		updateInfiniteCarousel();
	}
	
	// Reset hasMoved after animation completes
	setTimeout(() => {
		hasMoved = false;
	}, 500);
}

