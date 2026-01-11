// Documentation JavaScript

(function() {
    'use strict';

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('docs-sidebar-toggle');
    const sidebar = document.getElementById('docs-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('is-open') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('is-open');
            }
        });
    }

    // Navigation Group Toggle - Handle all groups including nested ones
    let navGroupClickHandler = null;
    let isInitialized = false;
    
    // Function to collapse all groups
    function collapseAllGroups(container) {
        if (!container) return;
        const allGroups = container.querySelectorAll('.docs-nav-group');
        allGroups.forEach((group) => {
            group.classList.remove('is-expanded');
            const toggle = group.querySelector('.docs-nav-group-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Function to expand the top-level folder by default
    function expandTopLevelGroup(container) {
        if (!container) return;
        
        // Find the first (top-level) group and expand it
        const topLevelGroup = container.querySelector('.docs-nav-group');
        if (topLevelGroup) {
            topLevelGroup.classList.add('is-expanded');
            const toggle = topLevelGroup.querySelector(':scope > .docs-nav-group-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            }
        }
    }
    
    // Function to expand groups containing the active page
    function expandActiveGroups(container) {
        if (!container) return;
        
        // Find the currently active item
        const activeItem = container.querySelector('.docs-nav-item.is-active, .docs-nav-group-link.is-active');
        if (!activeItem) return;
        
        // Walk up the DOM tree and expand all parent groups
        let current = activeItem.closest('.docs-nav-group');
        while (current) {
            current.classList.add('is-expanded');
            const toggle = current.querySelector(':scope > .docs-nav-group-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            }
            // Move to parent group (if nested)
            const parentContent = current.parentElement;
            if (parentContent && parentContent.classList.contains('docs-nav-group-content')) {
                current = parentContent.closest('.docs-nav-group');
            } else {
                current = null;
            }
        }
    }
    
    // Function to toggle a group
    function toggleGroup(group, toggle) {
        const isExpanded = group.classList.contains('is-expanded');
        if (isExpanded) {
            group.classList.remove('is-expanded');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            group.classList.add('is-expanded');
            toggle.setAttribute('aria-expanded', 'true');
        }
    }
    
    function initNavGroupToggles() {
        const sidebar = document.getElementById('docs-sidebar');
        if (!sidebar) {
            // Retry if sidebar not found yet
            setTimeout(initNavGroupToggles, 50);
            return;
        }
        
        // Collapse all groups first
        collapseAllGroups(sidebar);
        
        // Expand the top-level folder by default
        expandTopLevelGroup(sidebar);
        
        // Then expand groups containing the active page
        expandActiveGroups(sidebar);
        
        // Remove existing listener if any
        if (navGroupClickHandler) {
            sidebar.removeEventListener('click', navGroupClickHandler);
        }
        
        // Use event delegation for all clicks - this handles nested groups automatically
        navGroupClickHandler = (e) => {
            // Don't interfere with clicks on navigation items (actual links)
            const navItem = e.target.closest('a.docs-nav-item');
            if (navItem) {
                return;
            }
            
            // Handle clicks on group link (the title that navigates to index page)
            const groupLink = e.target.closest('a.docs-nav-group-link');
            if (groupLink) {
                const toggle = groupLink.closest('.docs-nav-group-toggle');
                if (toggle) {
                    const group = toggle.closest('.docs-nav-group');
                    if (group && group.classList.contains('is-expanded')) {
                        // If group is expanded, clicking the title should collapse it
                        e.preventDefault();
                        e.stopPropagation();
                        toggleGroup(group, toggle);
                        return;
                    }
                    // If group is collapsed, allow navigation to proceed (don't prevent default)
                }
                return;
            }
            
            // Check if click is on a toggle button (but not on the link inside it)
            // This works for both top-level and nested groups
            const toggle = e.target.closest('.docs-nav-group-toggle');
            if (toggle) {
                // Only toggle if not clicking on the link
                const linkInToggle = toggle.querySelector('a.docs-nav-group-link');
                if (!linkInToggle || !linkInToggle.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Find the parent group (works for nested groups too)
                    const group = toggle.closest('.docs-nav-group');
                    if (group) {
                        toggleGroup(group, toggle);
                    }
                }
            }
        };
        
        // Add the event listener
        sidebar.addEventListener('click', navGroupClickHandler);
        isInitialized = true;
    }
    
    // Initialize immediately if possible, then on DOM ready, then on load
    function initialize() {
        if (!isInitialized) {
            initNavGroupToggles();
        }
    }
    
    // Try immediately
    initialize();
    
    // Also on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM already loaded, try with small delay
        setTimeout(initialize, 10);
    }
    
    // Also on window load as final fallback
    window.addEventListener('load', () => {
        const sidebar = document.getElementById('docs-sidebar');
        if (sidebar) {
            collapseAllGroups(sidebar);
            expandTopLevelGroup(sidebar);
            expandActiveGroups(sidebar);
            if (!isInitialized) {
                initNavGroupToggles();
            }
        }
    });
    
    // Use MutationObserver to catch any dynamically added groups
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
            const sidebar = document.getElementById('docs-sidebar');
            if (sidebar) {
                collapseAllGroups(sidebar);
                expandTopLevelGroup(sidebar);
                expandActiveGroups(sidebar);
            }
        });
        
        // Start observing when sidebar is available
        function startObserving() {
            const sidebar = document.getElementById('docs-sidebar');
            if (sidebar) {
                observer.observe(sidebar, {
                    childList: true,
                    subtree: true
                });
            } else {
                setTimeout(startObserving, 100);
            }
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startObserving);
        } else {
            startObserving();
        }
    }

    // Tabs Functionality
    const tabsContainers = document.querySelectorAll('.pai-tabs');
    tabsContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.pai-tab-button');
        const tabContents = container.querySelectorAll('.pai-tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab-target');
                
                // Hide all tabs
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Remove active state from all buttons
                tabButtons.forEach(btn => {
                    btn.setAttribute('aria-selected', 'false');
                });
                
                // Show selected tab
                if (tabId) {
                    const targetContent = document.getElementById(tabId);
                    if (targetContent) {
                        targetContent.style.display = 'block';
                    }
                }
                
                // Set active state
                button.setAttribute('aria-selected', 'true');
            });
        });
    });

    // Table of Contents Generation
    function generateTOC() {
        const tocNav = document.getElementById('docs-toc-nav');
        const toc = document.getElementById('docs-toc');
        if (!tocNav || !toc) return;
        
        // Check multiple possible content containers
        const articleContent = document.querySelector('.docs-article-content') || 
                               document.querySelector('.docs-content-wrapper') ||
                               document.querySelector('.docs-content') ||
                               document.querySelector('.dictionary-content-wrapper');
        
        if (!articleContent) {
            // No content container found, hide TOC
            toc.style.display = 'none';
            return;
        }
        
        // For dictionary list pages, only show letter headings (h2.dictionary-letter)
        // For dictionary single pages and docs pages, show all h2 headings
        const isDictionary = document.querySelector('.dictionary-layout');
        const hasDictionaryLetters = articleContent.querySelector('h2.dictionary-letter');
        const headings = (isDictionary && hasDictionaryLetters)
            ? articleContent.querySelectorAll('h2.dictionary-letter')
            : articleContent.querySelectorAll('h2');
        
        if (headings.length === 0) {
            // Hide TOC if no headings
            toc.style.display = 'none';
            return;
        }
        
        // Clear existing TOC
        tocNav.innerHTML = '';
        
        headings.forEach((heading, index) => {
            // Generate ID if not present
            let id = heading.id;
            if (!id) {
                id = heading.textContent
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim();
                heading.id = id;
            }
            
            // Create TOC item
            const tocItem = document.createElement('a');
            tocItem.href = `#${id}`;
            tocItem.className = 'docs-toc-item';
            tocItem.textContent = heading.textContent;
            tocItem.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL without scrolling
                history.pushState(null, '', `#${id}`);
            });
            
            tocNav.appendChild(tocItem);
        });
        
        // Highlight active TOC item on scroll
        highlightActiveTOCItem();
    }

    // Highlight Active TOC Item
    function highlightActiveTOCItem() {
        const tocItems = document.querySelectorAll('.docs-toc-item');
        
        // Check multiple possible content containers
        const articleContent = document.querySelector('.docs-article-content') || 
                               document.querySelector('.docs-content-wrapper') ||
                               document.querySelector('.docs-content') ||
                               document.querySelector('.dictionary-content-wrapper');
        
        if (!articleContent) return;
        
        // For dictionary list pages, only track letter headings (h2.dictionary-letter)
        // For dictionary single pages and docs pages, track all h2 headings
        const isDictionary = document.querySelector('.dictionary-layout');
        const hasDictionaryLetters = articleContent.querySelector('h2.dictionary-letter');
        const headings = (isDictionary && hasDictionaryLetters)
            ? articleContent.querySelectorAll('h2.dictionary-letter')
            : articleContent.querySelectorAll('h2');
        
        if (tocItems.length === 0 || headings.length === 0) return;
        
        function updateActiveItem() {
            let currentActive = null;
            const scrollPosition = window.scrollY + 100; // Offset for header
            
            headings.forEach((heading, index) => {
                const headingTop = heading.offsetTop;
                const headingBottom = headingTop + heading.offsetHeight;
                
                if (scrollPosition >= headingTop && scrollPosition < headingBottom) {
                    currentActive = index;
                }
            });
            
            // If scrolled past all headings, highlight last one
            if (currentActive === null && scrollPosition >= headings[headings.length - 1].offsetTop) {
                currentActive = headings.length - 1;
            }
            
            // Update active states
            tocItems.forEach((item, index) => {
                if (index === currentActive) {
                    item.classList.add('is-active');
                } else {
                    item.classList.remove('is-active');
                }
            });
        }
        
        // Update on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveItem();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial update
        updateActiveItem();
    }

    // Initialize TOC when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generateTOC);
    } else {
        generateTOC();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Code block copy buttons
    function initCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('.docs-article-content pre, .docs-content-wrapper pre, .dictionary-content-wrapper pre, .page-content pre');
        
        codeBlocks.forEach((pre) => {
            // Skip if already has a copy button
            if (pre.querySelector('.docs-code-copy')) {
                return;
            }
            
            const code = pre.querySelector('code');
            if (!code) return;
            
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'docs-code-copy';
            copyButton.setAttribute('aria-label', 'Copy code');
            copyButton.innerHTML = `
                <svg class="docs-code-copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span class="docs-code-copy-text">Copy</span>
            `;
            
            // Add click handler
            copyButton.addEventListener('click', async () => {
                const text = code.textContent || code.innerText;
                
                try {
                    await navigator.clipboard.writeText(text);
                    
                    // Show success state
                    copyButton.classList.add('copied');
                    const textElement = copyButton.querySelector('.docs-code-copy-text');
                    if (textElement) {
                        const originalText = textElement.textContent;
                        textElement.textContent = 'Copied!';
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            copyButton.classList.remove('copied');
                            textElement.textContent = originalText;
                        }, 2000);
                    } else {
                        // Reset after 2 seconds if no text element
                        setTimeout(() => {
                            copyButton.classList.remove('copied');
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy text:', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        copyButton.classList.add('copied');
                        const textElement = copyButton.querySelector('.docs-code-copy-text');
                        if (textElement) {
                            const originalText = textElement.textContent;
                            textElement.textContent = 'Copied!';
                            setTimeout(() => {
                                copyButton.classList.remove('copied');
                                textElement.textContent = originalText;
                            }, 2000);
                        } else {
                            setTimeout(() => {
                                copyButton.classList.remove('copied');
                            }, 2000);
                        }
                    } catch (fallbackErr) {
                        console.error('Fallback copy failed:', fallbackErr);
                    }
                    document.body.removeChild(textArea);
                }
            });
            
            // Insert button into pre element
            pre.appendChild(copyButton);
        });
    }
    
    // Initialize copy buttons when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeCopyButtons);
    } else {
        initCodeCopyButtons();
    }

})();


