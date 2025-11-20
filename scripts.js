document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('.navbar ul');

    // Update active link based on scroll position
    const updateActiveLink = () => {
        let activeId = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - section.clientHeight / 3) {
                activeId = section.id;
            }
        });
        navLinks.forEach(link => 
            link.classList.toggle('active', link.href.includes(activeId))
        );
    };

    // Throttle helper
    const throttle = (fn, wait) => {
        let lastCalled = 0;
        return (...args) => {
            if (Date.now() - lastCalled >= wait) {
                lastCalled = Date.now();
                fn(...args);
            }
        };
    };

    // Smooth wheel section scroll
    window.addEventListener('wheel', throttle(e => {
        e.preventDefault();
        const current = document.elementFromPoint(0, window.innerHeight / 2);
        let target = e.deltaY < 0 ? current.previousElementSibling : current.nextElementSibling;
        if (target?.tagName === 'SECTION') target.scrollIntoView({behavior: 'smooth'});
        setTimeout(updateActiveLink, 500);
    }, 100), {passive: false});

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => navUL.classList.toggle('open'));

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navUL.contains(e.target)) {
            navUL.classList.remove('open');
        }
    });

    // Swiper initialization
    let swiper;
    const initSwiper = () => {
        if (swiper) swiper.destroy(true, true);
        swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {el: '.swiper-pagination', clickable: true},
            navigation: {
                nextEl: '.swiper-button-next', 
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    };

    initSwiper();
    window.addEventListener('resize', initSwiper);
});
