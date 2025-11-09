// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Workflow selector functionality
const workflowButtons = document.querySelectorAll('.workflow-btn');
const workflowContents = document.querySelectorAll('.workflow-content');

workflowButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetWorkflow = button.getAttribute('data-workflow');
        
        // Remove active class from all buttons and contents
        workflowButtons.forEach(btn => btn.classList.remove('active'));
        workflowContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetWorkflow).classList.add('active');
    });
});

// Metrics dashboard toggle
const toggleButtons = document.querySelectorAll('.toggle-btn');
const metricsDashboard = document.querySelector('.metrics-dashboard');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const view = button.getAttribute('data-view');
        
        // Remove active class from all buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update dashboard view
        if (metricsDashboard) {
            metricsDashboard.setAttribute('data-view', view);
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Card hover effects
document.querySelectorAll('.info-card, .solution-card, .metric-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    });
});

// Workflow step click to highlight
document.querySelectorAll('.workflow-step').forEach(step => {
    step.addEventListener('click', function() {
        // Remove highlight from all steps
        document.querySelectorAll('.workflow-step').forEach(s => {
            s.classList.remove('highlighted');
        });
        
        // Add highlight to clicked step
        this.classList.add('highlighted');
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            this.classList.remove('highlighted');
        }, 2000);
    });
    
    // Add cursor pointer
    step.style.cursor = 'pointer';
});

// Add CSS for highlighted step
const style = document.createElement('style');
style.textContent = `
    .workflow-step.highlighted .step-content {
        background: rgba(37, 99, 235, 0.1);
        border: 2px solid var(--primary-color);
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Smooth number animation for metrics (when toggling)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.textContent.includes('%') ? '%' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial view
    if (metricsDashboard) {
        metricsDashboard.setAttribute('data-view', 'before');
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        // Could add mobile menu functionality here if needed
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// Add active nav link highlighting based on scroll position
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styling for nav links
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(navStyle);

// Console log for debugging (can be removed in production)
console.log('Dental Clinic Automation - Solution Design');
console.log('All interactive features initialized');

