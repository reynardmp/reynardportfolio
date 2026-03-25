// Reynard Portfolio JS Framework

document.addEventListener('DOMContentLoaded', () => {
    // Project data
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
            link: 'google.com',
            image: '/images/project-two.svg'
        },
        {
            title: 'Project Three',
            description: 'A short description of project three.',
            link: '#',
            image: '/images/project-one.svg'
        },
        {
            title: 'Project Four',
            description: 'A short description of project four.',
            link: '#',
            image: '/images/project-two.svg'
        },
        {
            title: 'Project Five',
            description: 'A short description of project five.',
            link: '#',
            image: '/images/project-one.svg'
        }
        // Add more projects as needed
    ];

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        let activeIndex = 0;
        const n = projects.length;

        function getPos(i) {
            if (i === activeIndex) return 'pos-center';
            if (n >= 3) {
                if (i === (activeIndex - 1 + n) % n) return 'pos-left';
                if (i === (activeIndex + 1) % n) return 'pos-right';
            } else if (n === 2) {
                if (i === (activeIndex + 1) % n) return 'pos-right';
            }
            return null;
        }

        function goTo(newIndex) {
            activeIndex = ((newIndex % n) + n) % n;
            viewport.querySelectorAll('.carousel-card').forEach((card, i) => {
                card.classList.remove('pos-center', 'pos-left', 'pos-right');
                const pos = getPos(i);
                if (pos) card.classList.add(pos);
            });
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-prev';
        prevBtn.setAttribute('aria-label', 'Previous project');
        prevBtn.innerHTML = '&#8249;';

        const viewport = document.createElement('div');
        viewport.className = 'carousel-viewport';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-next';
        nextBtn.setAttribute('aria-label', 'Next project');
        nextBtn.innerHTML = '&#8250;';

        projects.forEach((project, i) => {
            const card = document.createElement('div');
            const initialPos = getPos(i);
            card.className = 'carousel-card' + (initialPos ? ' ' + initialPos : '');
            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" />
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a class="project-link" href="${project.link}" target="_blank">View Project</a>
                </div>
            `;

            card.addEventListener('click', (e) => {
                const currentPos = [...card.classList].find(c => c.startsWith('pos-'));
                if (currentPos === 'pos-left' || currentPos === 'pos-right') {
                    goTo(i);
                } else if (currentPos === 'pos-center') {
                    if (!e.target.closest('.project-link')) {
                        const link = card.querySelector('.project-link');
                        if (link && link.href && !link.href.endsWith('#')) {
                            window.open(link.href, '_blank');
                        }
                    }
                }
            });

            // Add click handler for the project image
            const projectImage = card.querySelector('.project-image');
            projectImage.addEventListener('click', (e) => {
                const currentPos = [...card.classList].find(c => c.startsWith('pos-'));
                if (currentPos === 'pos-center') {
                    e.stopPropagation();
                    const link = card.querySelector('.project-link');
                    if (link && link.href && !link.href.endsWith('#')) {
                        window.open(link.href, '_blank');
                    }
                }
            });

            viewport.appendChild(card);
        });

        prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
        nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

        wrapper.appendChild(prevBtn);
        wrapper.appendChild(viewport);
        wrapper.appendChild(nextBtn);
        carouselContainer.appendChild(wrapper);
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
