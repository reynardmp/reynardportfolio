// Reynard Portfolio JS Framework

document.addEventListener('DOMContentLoaded', () => {
    // Example project data
    const projects = [
        {
            title: 'Project One',
            description: 'A short description of project one.',
            link: '#'
        },
        {
            title: 'Project Two',
            description: 'A short description of project two.',
            link: '#'
        }
        // Add more projects as needed
    ];

    const projectsList = document.querySelector('.projects-list');
    if (projectsList) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
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
});
