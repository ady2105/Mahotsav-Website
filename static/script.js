document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const video = document.getElementById('bg-video');

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

    // Initialize video playback
    if (video) {
        video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
    }

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
});