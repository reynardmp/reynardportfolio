// Reynard Portfolio JS Framework

document.addEventListener('DOMContentLoaded', () => {
    // Example project data
    const projects = [
        {
            title: 'Project One',
            description: 'A short description of project one.',
            link: '#',
            image: '/images/project-one.svg'
        },
        {
            title: 'Project Two',
            description: 'A short description of project two.',
            link: '#',
            image: '/images/project-two.svg'
        }
        // Add more projects as needed
    ];

    const projectsList = document.querySelector('.projects-list');
    if (projectsList) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" />
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                </div>
            `;
            projectsList.appendChild(card);
        });
    }

    // Contact form handler (frontend only)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! (Form is frontend only)');
            contactForm.reset();
        });
    }

    // PDF Resume Viewer - Load embedded Base64 PDF
    const resumeViewer = document.getElementById('resume-viewer');
    const resumeFallback = document.getElementById('resume-fallback');
    
    if (resumeViewer) {
        // Import and display the Base64 encoded resume
        import('./resumeData.js').then(module => {
            const base64Pdf = module.RESUME_BASE64;
            const pdfDataUrl = `data:application/pdf;base64,${base64Pdf}`;
            resumeViewer.src = pdfDataUrl;
        }).catch(error => {
            console.error('Error loading resume:', error);
            if (resumeFallback) {
                resumeFallback.classList.add('active');
                resumeFallback.textContent = 'Resume could not be loaded. Please try again later.';
            }
        });
    }

    // Open Resume Button - Open PDF in new tab
    const openResumeBtn = document.getElementById('open-resume-btn');
    if (openResumeBtn) {
        openResumeBtn.style.cursor = 'pointer';
        openResumeBtn.addEventListener('click', function() {
            window.open('/resume.pdf', '_blank');
        });
    }
});
