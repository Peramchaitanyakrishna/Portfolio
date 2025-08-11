document.addEventListener('DOMContentLoaded', () => {

    // --- tsParticles Initialization ---
    tsParticles.load("tsparticles", {
        fpsLimit: 120, // UPDATED: Higher fps limit for smoother animations
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 2, random: true }, // UPDATED: Slightly smaller particles
            links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: {
                enable: true, speed: 2, direction: "none", random: false,
                straight: false, out_mode: "out", bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 },
            }
        },
        detectRetina: true
    });

    // --- Intersection Observer for Section & Animated Grid Fade-in ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // UPDATED: Staggered animation for grid items
                if (entry.target.querySelector('.animated-grid')) {
                    const gridItems = entry.target.querySelectorAll('.animated-grid > *');
                    gridItems.forEach((item, index) => {
                        item.style.setProperty('--delay', `${index * 100}ms`);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // --- Active Nav Link on Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('main section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    contentSections.forEach(section => {
        navObserver.observe(section);
    });
});