// Optional JavaScript for additional interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile responsiveness if needed
    const mobileBreakpoint = 768;

    function checkMobile() {
        if (window.innerWidth < mobileBreakpoint) {
            document.querySelector('.nav-list').classList.add('mobile');
        } else {
            document.querySelector('.nav-list').classList.remove('mobile');
        }
    }

    // Check on load and resize
    window.addEventListener('resize', checkMobile);
    checkMobile();

    // Optional: Add keyboard navigation for accessibility
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            }
        });
    });
});
