document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Mobile dropdown functionality
    dropdowns.forEach(function(dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(function(other) {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('active');
            });
        }
    });

    // Interactive letter lifting effect
    const h1Element = document.querySelector('h1');
    const titleLetters = document.querySelectorAll('.title-letter');

    if (h1Element && titleLetters.length > 0) {
        h1Element.addEventListener('mousemove', function(e) {
            const rect = h1Element.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;

            titleLetters.forEach(function(letter) {
                const letterRect = letter.getBoundingClientRect();
                const letterLeft = letterRect.left - rect.left;
                const letterRight = letterRect.right - rect.left;
                const letterWidth = letterRight - letterLeft;

                // Check if cursor is over this letter
                if (mouseX >= letterLeft && mouseX <= letterRight) {
                    letter.classList.add('lifted');
                } else {
                    letter.classList.remove('lifted');
                }
            });
        });

        // Remove lifted class when leaving the h1 element
        h1Element.addEventListener('mouseleave', function() {
            titleLetters.forEach(function(letter) {
                letter.classList.remove('lifted');
            });
        });
    }

    // Gallery Carousel Auto-Scroll & Infinite Scroll
    const setupCarousel = (selector) => {
        const container = document.querySelector(selector);
        if (!container || container.children.length === 0) return;

        const originalItemsCount = container.children.length;
        const items = Array.from(container.children);
        
        // Clone items for infinite scroll
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            container.appendChild(clone);
        });

        let itemWidth = 0;
        let scrollThreshold = 0;

        const updateCenterFocus = () => {
            const centerPoint = container.getBoundingClientRect().left + container.clientWidth / 2;
            Array.from(container.children).forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + itemRect.width / 2;
                if (Math.abs(centerPoint - itemCenter) < itemRect.width / 2) {
                    item.classList.add('center-focus');
                } else {
                    item.classList.remove('center-focus');
                }
            });
        };

        const calculateMetrics = () => {
            const firstItem = container.children[0];
            if (!firstItem) return;
            const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
            itemWidth = firstItem.getBoundingClientRect().width + gap;
            scrollThreshold = originalItemsCount * itemWidth;
            updateCenterFocus();
        };

        calculateMetrics();
        window.addEventListener('resize', calculateMetrics);

        const autoScroll = () => {
            if (container.matches(':hover')) return;

            if (container.scrollLeft >= scrollThreshold) {
                container.scrollLeft -= scrollThreshold;
            }

            container.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
        };

        setInterval(autoScroll, 3000);
        
        // Reset on manual scroll for infinite feel
        let isScrolling = false;
        container.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (scrollThreshold > 0 && container.scrollLeft >= scrollThreshold) {
                        container.scrollLeft -= scrollThreshold;
                    }
                    updateCenterFocus();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    };

    setupCarousel('.gallery-grid');

    // Marquee Infinite Scroll
    const setupMarquee = (selector, speed = 1) => {
        const containers = document.querySelectorAll(selector);
        
        containers.forEach(container => {
            const content = container.querySelector('.marquee-content');
            if (!content) return;
            
            let isHovered = false;
            container.addEventListener('mouseenter', () => isHovered = true);
            container.addEventListener('mouseleave', () => isHovered = false);
            
            let singleSetWidth = 0;
            
            const calculateWidth = () => {
                const items = Array.from(content.children);
                if (items.length === 0) return;
                
                const gap = parseFloat(window.getComputedStyle(content).gap) || 0;
                const halfCount = Math.ceil(items.length / 2);
                singleSetWidth = 0;
                
                for(let i = 0; i < halfCount; i++) {
                    singleSetWidth += items[i].getBoundingClientRect().width + gap;
                }
            };

            calculateWidth();
            window.addEventListener('resize', calculateWidth);
            window.addEventListener('load', calculateWidth);
            
            const animate = () => {
                if (!isHovered && singleSetWidth > 0) {
                    container.scrollLeft += speed;
                    
                    if (container.scrollLeft >= singleSetWidth) {
                        container.scrollLeft -= singleSetWidth;
                    }
                }
                requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        });
    };

    setupMarquee('.marquee-container', 1);
});