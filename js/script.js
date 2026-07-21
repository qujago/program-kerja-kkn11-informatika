document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 1000); // 1s simulation
    }

    // 2. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 3. Dark Mode Toggle
    const toggleBtn = document.getElementById("darkModeToggle");
    const htmlElement = document.documentElement;
    
    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.setAttribute('data-bs-theme', currentTheme);
        if (toggleBtn) {
            toggleBtn.innerHTML = currentTheme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            let theme = htmlElement.getAttribute('data-bs-theme');
            if (theme === 'dark') {
                htmlElement.setAttribute('data-bs-theme', 'light');
                localStorage.setItem('theme', 'light');
                toggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
            } else {
                htmlElement.setAttribute('data-bs-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
            }
        });
    }

    // 4. Sticky Navbar & Back to Top
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }

        if (window.scrollY > 300) {
            if(backToTopBtn) backToTopBtn.classList.add('show');
        } else {
            if(backToTopBtn) backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Check if element is in viewport
            const rect = counter.getBoundingClientRect();
            if(rect.top < window.innerHeight && counter.innerText == "0") {
                updateCount();
            }
        });
    }
    
    if (counters.length > 0) {
        window.addEventListener('scroll', animateCounters);
        animateCounters(); // Initial check
    }

    // 5.5 Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        const progressObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-target-width');
                    
                    if (targetWidth && !bar.classList.contains('animated')) {
                        bar.classList.add('animated');
                        
                        // Set basic smooth transition
                        bar.style.transition = 'width 0.5s ease-in-out';
                        
                        // Step 1: Simulate scanning up
                        setTimeout(() => {
                            bar.style.width = '85%';
                        }, 50);
                        
                        // Step 2: Simulate scanning down
                        setTimeout(() => {
                            bar.style.width = '15%';
                        }, 550);
                        
                        // Step 3: Settle smoothly at accurate data
                        setTimeout(() => {
                            bar.style.transition = 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
                            bar.style.width = targetWidth;
                        }, 1050);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // 6. Gallery Filtering & Lightbox
    const filterBtns = document.querySelectorAll('.gallery-filter .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('btn-primary-custom'));
                filterBtns.forEach(b => b.classList.add('btn-outline-success'));
                
                // Add active class to clicked
                btn.classList.remove('btn-outline-success');
                btn.classList.add('btn-primary-custom');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Re-init AOS if needed, or just let layout recalculate
            });
        });
    }

    // Lightbox logic
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryCards = document.querySelectorAll('.gallery-card img');

    if (lightbox && galleryCards.length > 0) {
        galleryCards.forEach(img => {
            img.addEventListener('click', (e) => {
                const src = e.target.src;
                lightboxImg.src = src;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
});
