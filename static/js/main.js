// Theme - Always enforce dark mode
(function() {
    // Always set dark mode - remove any light theme attribute
    document.documentElement.removeAttribute('data-theme');
    
    // Clear any stored theme preference to ensure dark mode
    try {
        localStorage.removeItem('theme');
    } catch (e) {
        // Ignore
    }
})();

// Mobile Menu Toggle
(function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
})();

// Features Tabs - Reorganize elements for desktop/mobile layouts
(function() {
    function initFeatures() {
        try {
            const featuresSection = document.querySelector('.features-section');
            if (!featuresSection) return;
            
            // Check if already processed
            if (featuresSection.dataset.processed === 'true') {
                console.log('Features section already processed, skipping');
                return;
            }
            
            const tabsContainer = featuresSection.querySelector('.features-tabs');
            const contentContainer = featuresSection.querySelector('.features-content');
            const initialContainer = featuresSection.querySelector('.features-tabs-initial');
            
            if (!tabsContainer || !contentContainer || !initialContainer) return;
            
            // Check if initial container is already processed (empty or has processed class)
            if (initialContainer.classList.contains('features-tabs-initial-processed') || initialContainer.children.length === 0) {
                console.log('Initial container already processed');
                return;
            }
            
            const tabItems = initialContainer.querySelectorAll('.feature-tab-item');
            console.log('Features tabs init - found', tabItems.length, 'tab items');
            if (tabItems.length === 0) {
                // Try again after a short delay - shortcodes might not be rendered yet
                console.log('No tab items found, will retry');
                return;
            }
            
            // Mark as processing to prevent multiple runs
            featuresSection.dataset.processed = 'true';
        
        // Function to reorganize for desktop (separate tabs and content)
        function organizeDesktop() {
            if (window.innerWidth <= 768) return; // Skip on mobile
            
            // Clear containers first
            tabsContainer.innerHTML = '';
            contentContainer.innerHTML = '';
            
            // Move actual elements (not clones) from initial container
            let movedButtons = 0;
            let movedContent = 0;
            tabItems.forEach(item => {
                const button = item.querySelector('.tab-button');
                const content = item.querySelector('.tab-content');
                
                // Check if elements are still within the initial container (not already moved)
                const isInInitialContainer = (el) => {
                    if (!el) return false;
                    // Check if element is still a descendant of initialContainer
                    return initialContainer.contains(el);
                };
                
                if (button && isInInitialContainer(button)) {
                    tabsContainer.appendChild(button);
                    movedButtons++;
                }
                if (content && isInInitialContainer(content)) {
                    contentContainer.appendChild(content);
                    movedContent++;
                }
            });
            console.log('Moved', movedButtons, 'buttons and', movedContent, 'content sections');
            
            // Verify elements are in their new containers
            const buttonsInTabs = tabsContainer.querySelectorAll('.tab-button');
            const contentInContainer = contentContainer.querySelectorAll('.tab-content');
            console.log('Verification: tabs container has', buttonsInTabs.length, 'buttons, content container has', contentInContainer.length, 'content sections');
            
            // Ensure at least the first tab content is active
            const firstContent = contentContainer.querySelector('.tab-content');
            if (firstContent && !contentContainer.querySelector('.tab-content.active')) {
                firstContent.classList.add('active');
                console.log('Activated first content:', firstContent.id);
            }
            
            // Ensure at least the first tab button is active
            const firstButton = tabsContainer.querySelector('.tab-button');
            if (firstButton && !tabsContainer.querySelector('.tab-button.active')) {
                firstButton.classList.add('active');
                console.log('Activated first button:', firstButton.getAttribute('data-tab'));
            }
            
            // Only hide initial container if we successfully moved elements
            if (movedButtons > 0 || movedContent > 0) {
                initialContainer.classList.add('features-tabs-initial-processed');
                console.log('Hidden initial container after successful move');
            } else {
                console.warn('No elements moved, keeping initial container visible');
            }
        }
        
        // Function to reorganize for mobile (show all content, hide tabs)
        function organizeMobile() {
            if (window.innerWidth > 768) return; // Skip on desktop
            
            // Clear containers
            tabsContainer.innerHTML = '';
            contentContainer.innerHTML = '';
            
            // Move all content sections to content container (no tabs)
            let movedContent = 0;
            tabItems.forEach(item => {
                const content = item.querySelector('.tab-content');
                
                // Check if content is still in initial container
                const isInInitialContainer = (el) => {
                    if (!el) return false;
                    return initialContainer.contains(el);
                };
                
                if (content && isInInitialContainer(content)) {
                    // Show all content sections on mobile
                    content.classList.add('active');
                    contentContainer.appendChild(content);
                    movedContent++;
                }
            });
            console.log('Mobile: Moved', movedContent, 'content sections');
            
            // Hide the initial container after moving elements
            initialContainer.classList.add('features-tabs-initial-processed');
        }
        
        // Attach tab switching event listeners (works for both desktop and mobile)
        function attachTabListeners() {
            const tabButtons = document.querySelectorAll('.tab-button');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetTab = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    const targetContent = document.getElementById(targetTab);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }
        
        // Initial organization
        if (window.innerWidth > 768) {
            organizeDesktop();
        } else {
            organizeMobile();
        }
        
        // Attach listeners after initial organization
        setTimeout(attachTabListeners, 100);
        
        // Reorganize on resize (only if already processed)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Only reorganize if already processed
                if (featuresSection.dataset.processed === 'true') {
                    if (window.innerWidth > 768) {
                        organizeDesktop();
                        setTimeout(attachTabListeners, 100);
                    } else {
                        organizeMobile();
                        setTimeout(attachTabListeners, 100);
                    }
                }
            }, 250);
        });
        } catch (error) {
            console.error('Error initializing features tabs:', error);
        }
    }
    
    // Run on DOM ready with multiple attempts to catch shortcode rendering
    function tryInit() {
        initFeatures();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        // If already loaded, try immediately and with delays
        tryInit();
    }
    
    // Retry with delays to catch slow shortcode rendering
    setTimeout(tryInit, 100);
    setTimeout(tryInit, 500);
    setTimeout(tryInit, 1000);
})();

// Make cards with "Read more" links fully clickable
(function() {
    function makeCardsClickable() {
        // Find all cards (feature, blog, pricing)
        const cards = document.querySelectorAll('.feature-card, .blog-card, .pricing-card');
        
        cards.forEach(card => {
            // Find "Read more" or "Read Me" link in the card
            // Check for specific link classes or links containing "Read more" or "Read Me"
            const readMoreLink = card.querySelector('.feature-card-link, .blog-card-link, a[href*="/"]');
            
            if (readMoreLink && readMoreLink.href && readMoreLink.href !== window.location.href) {
                const cardLink = readMoreLink.href;
                
                // Make card clickable
                card.style.cursor = 'pointer';
                
                // Add click handler to entire card
                card.addEventListener('click', function(e) {
                    // Don't trigger if clicking directly on a link or button
                    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                        return;
                    }
                    
                    // Navigate to the link
                    window.location.href = cardLink;
                });
            }
        });
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', makeCardsClickable);
    } else {
        makeCardsClickable();
    }
})();

// Tab switching functionality (moved outside features section)
(function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
})();

// Dashboard Sidebar Toggle
(function() {
    const sidebarToggle = document.getElementById('dashboard-sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (sidebar.classList.contains('open') && 
                    !sidebar.contains(e.target) && 
                    !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
})();

// Role Selector Dropdown
(function() {
    const roleButton = document.getElementById('dashboard-role-button');
    const roleDropdown = document.getElementById('dashboard-role-dropdown');
    const roleLabel = document.getElementById('dashboard-role-label');
    
    if (!roleButton || !roleDropdown) return;
    
    // Determine current role from URL
    const currentPath = window.location.pathname;
    let currentRole = 'AI Manager';
    let currentRoleData = 'ai-manager';
    
    if (currentPath.includes('/dashboard/financials')) {
        currentRole = 'Financials';
        currentRoleData = 'financials';
    } else if (currentPath.includes('/dashboard/marketing')) {
        currentRole = 'Marketing';
        currentRoleData = 'marketing';
    } else if (currentPath.includes('/dashboard/product')) {
        currentRole = 'Product';
        currentRoleData = 'product';
    } else if (currentPath.includes('/dashboard/sales')) {
        currentRole = 'Sales';
        currentRoleData = 'sales';
    } else if (currentPath.includes('/dashboard/board')) {
        currentRole = 'Board';
        currentRoleData = 'board';
    } else if (currentPath.includes('/dashboard/hr')) {
        currentRole = 'HR';
        currentRoleData = 'hr';
    }
    
    // Update label
    if (roleLabel) {
        roleLabel.textContent = currentRole;
    }
    
    // Update active state
    const roleOptions = roleDropdown.querySelectorAll('.dashboard-role-option');
    roleOptions.forEach(option => {
        if (option.getAttribute('data-role') === currentRoleData) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Toggle dropdown
    roleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const selector = roleButton.closest('.dashboard-role-selector');
        if (selector) {
            selector.classList.toggle('open');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const selector = roleButton.closest('.dashboard-role-selector');
        if (selector && !selector.contains(e.target)) {
            selector.classList.remove('open');
        }
    });
    
    // Handle role option clicks
    roleOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const href = option.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
})();

// Dashboard Time Period Filter
(function() {
    const timeFilters = document.querySelectorAll('.dashboard-time-filter');
    
    timeFilters.forEach(filter => {
        const buttons = filter.querySelectorAll('.dashboard-time-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the period
                const period = button.getAttribute('data-period');
                
                // Here you would typically update the dashboard data based on the period
                // For now, we'll just log it
                console.log('Time period changed to:', period);
            });
        });
    });
})();

// FAQ Accordion
(function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
})();

// Header scroll effect with direction detection
(function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
        } else if (currentScrollY < lastScrollY) {
            scrollDirection = 'up';
        }
        
        lastScrollY = currentScrollY;
        
        // Apply classes based on scroll position and direction
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
            header.classList.remove('scroll-down', 'scroll-up');
            header.classList.add(scrollDirection === 'down' ? 'scroll-down' : 'scroll-up');
        } else {
            header.classList.remove('scrolled', 'scroll-down', 'scroll-up');
        }
    });
})();

// Team Carousel
(function() {
    const carousel = document.getElementById('teamCarousel');
    const prevButton = document.getElementById('teamCarouselPrev');
    const nextButton = document.getElementById('teamCarouselNext');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    const scrollAmount = 300;
    
    prevButton.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextButton.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update button visibility based on scroll position
    function updateButtons() {
        const isAtStart = carousel.scrollLeft <= 0;
        const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1;
        
        prevButton.style.opacity = isAtStart ? '0.5' : '1';
        prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextButton.style.opacity = isAtEnd ? '0.5' : '1';
        nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }
    
    carousel.addEventListener('scroll', updateButtons);
    updateButtons();
})();

