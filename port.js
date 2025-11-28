// Preloader fade out after 2.5 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 800);
        }
    }, 2500);
});

// Enhanced parallax scroll effect with stagger
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0001})`;
    }
    
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px) opacity(${Math.max(0.3, 1 - scrolled * 0.001)})`;
    }
});

// Text reveal animation on scroll with enhanced timing
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const text = entry.target;
            const content = text.textContent;
            text.innerHTML = '';
            
            let index = 0;
            const speed = 40; // milliseconds per character
            
            const typeText = () => {
                if (index < content.length) {
                    text.textContent += content[index];
                    index++;
                    setTimeout(typeText, speed);
                }
            };
            
            typeText();
            textRevealObserver.unobserve(entry.target);
        }
    });
});

// Apply text reveal to hero text
const heroHeading = document.querySelector('.hero-text h1');
if (heroHeading) {
    textRevealObserver.observe(heroHeading);
}

// Section fade-in animation on scroll with stagger
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .project-card, .skill-card, .cert-card, .tool-card, .timeline-card').forEach((el, index) => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach((a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.getAttribute('href');
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Parallax effect on section titles
window.addEventListener('scroll', () => {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        title.style.opacity = Math.min(scrollPercent + 0.5, 1);
        title.style.transform = `translateY(${(1 - scrollPercent) * 20}px)`;
    });
});

// Scroll progress bar
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = percent + '%';

    // Back-to-top visibility with smooth animation
    const back = document.getElementById('backToTop');
    if (back) {
        if (scrollTop > 400) {
            back.style.display = 'flex';
            back.style.animation = 'fadeInUp 0.4s ease-out';
        } else {
            back.style.display = 'none';
        }
    }
});

// Back-to-top behavior with ease-out animation
const backBtn = document.getElementById('backToTop');
if (backBtn) {
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    backBtn.addEventListener('mouseenter', () => {
        backBtn.style.transform = 'translateY(-6px) scale(1.15)';
    });
    backBtn.addEventListener('mouseleave', () => {
        backBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Mobile nav toggle behavior
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');
if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
        const hidden = navMobile.getAttribute('aria-hidden') === 'true';
        navMobile.setAttribute('aria-hidden', hidden ? 'false' : 'true');
        navToggle.style.transform = hidden ? 'rotate(90deg)' : 'rotate(0deg)';
    });
}

// Close mobile nav when link clicked
document.querySelectorAll('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => {
        if (navMobile) {
            navMobile.setAttribute('aria-hidden', 'true');
            if (navToggle) navToggle.style.transform = 'rotate(0deg)';
        }
    });
});

// Project modal behavior
const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'projectModal';
modal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close" aria-label="Close">✕</button>
    <h3 id="modalTitle"></h3>
    <p id="modalDesc"></p>
    <p id="modalTools" style="color:var(--text-muted); font-size:13px;"></p>
  </div>`;
document.body.appendChild(modal);

const openModal = (title, desc, tools) => {
    const el = document.getElementById('projectModal');
    if (!el) return;
    el.querySelector('#modalTitle').textContent = title;
    el.querySelector('#modalDesc').textContent = desc;
    el.querySelector('#modalTools').textContent = 'Tools: ' + tools;
    el.style.animation = 'fadeInUp 0.3s ease-out';
    el.classList.add('open');
};

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.project-trigger');
    if (trigger) {
        const title = trigger.dataset.title || trigger.textContent;
        const desc = trigger.dataset.desc || '';
        const tools = trigger.dataset.tools || '';
        openModal(title, desc, tools);
    }
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        const el = document.getElementById('projectModal');
        if (el) el.classList.remove('open');
    }
});

// Lazy-load images where possible
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
});

// Performance: Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});
// --- IGNORE ---