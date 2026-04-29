// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.ethics-card, .insight-card, .assignment-card, .resource-card, .stat, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.ethics-card, .resource-card, .assignment-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on hero title if desired
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        // Uncomment below to enable typing effect
        // const originalText = heroTitle.textContent;
        // typeWriter(heroTitle, originalText, 80);
    }
});

// Add search functionality for resources (if needed later)
function searchResources(query) {
    const resources = document.querySelectorAll('.resource-card, .assignment-card');
    const lowerQuery = query.toLowerCase();
    
    resources.forEach(resource => {
        const title = resource.querySelector('h3').textContent.toLowerCase();
        const description = resource.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
            resource.style.display = 'block';
        } else {
            resource.style.display = 'none';
        }
    });
}

// Add print functionality for assignment sheets
function printAssignment(assignmentId) {
    const assignment = document.getElementById(assignmentId);
    if (assignment) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Assignment Print</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1, h2, h3 { color: #1e293b; }
                    .assignment-header { border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
                    .assignment-content { line-height: 1.6; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                ${assignment.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels to dynamic content
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent);
        }
    });
    
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.ethics-card, .resource-card, .assignment-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });
});

// Add loading states for download buttons
document.querySelectorAll('.btn').forEach(button => {
    if (button.textContent.includes('Download')) {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    }
});

// Add form validation for upload (when implemented)
function validateUpload(files) {
    const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    for (let file of files) {
        if (!allowedTypes.includes(file.type)) {
            alert(`Please upload only Word documents. ${file.name} is not a valid format.`);
            return false;
        }
        
        if (file.size > maxSize) {
            alert(`File ${file.name} is too large. Please upload files smaller than 10MB.`);
            return false;
        }
    }
    
    return true;
}

// Add progress indicators for file uploads
function showUploadProgress(fileName) {
    const progress = document.createElement('div');
    progress.className = 'upload-progress';
    progress.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">Uploading ${fileName}...</div>
    `;
    
    document.querySelector('.upload-area').appendChild(progress);
    
    // Simulate progress
    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        progress.querySelector('.progress-fill').style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => progress.remove(), 1000);
        }
    }, 200);
}

// Add tooltips for additional information
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    element.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    });
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    });
}

// Add CSS for tooltips dynamically
const tooltipStyles = `
    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #1e293b;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        margin-bottom: 0.5rem;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: #1e293b;
    }
    
    .upload-progress {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e2e8f0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .progress-fill {
        height: 100%;
        background: #2563eb;
        border-radius: 4px;
        transition: width 0.3s ease;
    }
    
    .progress-text {
        font-size: 0.875rem;
        color: #64748b;
    }
`;

const tooltipSheet = document.createElement('style');
tooltipSheet.textContent = tooltipStyles;
document.head.appendChild(tooltipSheet);
