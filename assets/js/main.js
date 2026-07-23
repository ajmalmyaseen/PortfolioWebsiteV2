/*==========================================
    PORTFOLIO MAIN.JS
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
        STICKY NAVBAR
    =========================*/

    const navbar = document.querySelector(".custom-navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

    /*=========================
        TYPING EFFECT
    =========================*/

    if (document.querySelector("#typing")) {

        new Typed("#typing", {

            strings: [

                "Frontend Developer",

                "Web Designer",

                "Java Programmer",

                "React Learner",

                "Aspiring Full Stack Developer"

            ],

            typeSpeed: 80,

            backSpeed: 45,

            backDelay: 1800,

            loop: true

        });

    }

    /*=========================
        AOS
    =========================*/

    AOS.init({

        duration: 1000,

        once: true,

        offset: 80

    });

    /*=========================
        SMOOTH SCROLL
    =========================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /*=========================
        ACTIVE NAV LINK
    =========================*/

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(nav => nav.classList.remove("active"));

            this.classList.add("active");

        });

    });

    /*=========================
        FOOTER YEAR (OPTIONAL)
    =========================*/

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

});

AOS.init({

    duration:1000,

    once:true,

    easing:"ease-in-out"

});

// ================= EMAILJS =================

// Initialize EmailJS

if (typeof emailjs !== "undefined") {

emailjs.init({
    publicKey: "ZgwLYAD2ObpsK-Hp3"
});

const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = form.querySelector("button");

        button.disabled = true;
        button.innerHTML = "Sending...";

        emailjs.sendForm(
            "service_31oo3qd",
            "template_9zk2z97",
            this
        ).then(() => {

            alert("Message sent successfully!");

            form.reset();

            button.disabled = false;
            button.innerHTML = "Send Message";

        }).catch((error) => {

            console.error(error);

            alert("Failed to send message.");

            button.disabled = false;
            button.innerHTML = "Send Message";
        });

    });
}
}

//=========================
// ================= GitHub API - Fetch Repositories =================

/**
 * Fetch GitHub repositories for a user
 * Uses Fetch API + Async/Await + JSON + Error Handling
 * @param {string} username - GitHub username
 * @param {number} limit - Number of repositories to fetch (default: 10)
 */
async function fetchGitHubRepos(username, limit = 10) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const projectsContainer = document.getElementById('projectsContainer');
    const emptyState = document.getElementById('emptyState');

    try {
        // Show loading state
        if (loadingSpinner) loadingSpinner.classList.add('active');
        if (errorMessage) errorMessage.classList.remove('active');
        if (projectsContainer) projectsContainer.innerHTML = '';

        // Fetch data from GitHub API with async/await
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        // Parse JSON response
        const repos = await response.json();

        // Hide loading spinner
        if (loadingSpinner) loadingSpinner.classList.remove('active');

        // Check if repositories exist
        if (!repos || repos.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        // Hide empty state
        if (emptyState) emptyState.style.display = 'none';

        // Render each repository as a card
        repos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            if (projectsContainer) {
                projectsContainer.appendChild(projectCard);
            }
        });

    } catch (error) {
        // Handle errors
        console.error('Error fetching GitHub repositories:', error);

        // Hide loading spinner
        if (loadingSpinner) loadingSpinner.classList.remove('active');

        // Show error message
        if (errorMessage) {
            errorMessage.classList.add('active');
            errorMessage.innerHTML = `
                <div class="alert alert-danger mb-0">
                    <i class="bi bi-exclamation-circle"></i>
                    <strong>Error:</strong> Unable to fetch repositories. 
                    ${error.message}
                </div>
            `;
        }

        // Log error for debugging
        console.log('Full error details:', error);
    }
}

/**
 * Create a project card element for a repository
 * @param {Object} repo - Repository object from GitHub API
 * @returns {HTMLElement} - Project card element
 */
function createProjectCard(repo) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'card project-card shadow-sm';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    // Repository name and description
    const title = document.createElement('h5');
    title.className = 'card-title fw-bold';
    title.innerHTML = `<i class="bi bi-github"></i> ${repo.name}`;

    const description = document.createElement('p');
    description.className = 'card-text text-muted flex-grow-1';
    description.textContent = repo.description || 'No description provided';

    // Language badge
    const languageDiv = document.createElement('div');
    if (repo.language) {
        const languageBadge = document.createElement('span');
        languageBadge.className = 'language-badge';
        languageBadge.innerHTML = `<i class="bi bi-code-square"></i> ${repo.language}`;
        languageDiv.appendChild(languageBadge);
    }

    // Repository stats
    const statsDiv = document.createElement('div');
    statsDiv.className = 'project-stats';

    if (repo.stargazers_count > 0) {
        const starsItem = document.createElement('div');
        starsItem.className = 'stat-item';
        starsItem.innerHTML = `<i class="bi bi-star-fill text-warning"></i> ${repo.stargazers_count}`;
        statsDiv.appendChild(starsItem);
    }

    if (repo.forks_count > 0) {
        const forksItem = document.createElement('div');
        forksItem.className = 'stat-item';
        forksItem.innerHTML = `<i class="bi bi-diagram-3"></i> ${repo.forks_count}`;
        statsDiv.appendChild(forksItem);
    }

    // Buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'mt-3 d-flex gap-2';

    const viewButton = document.createElement('a');
    viewButton.href = repo.html_url;
    viewButton.target = '_blank';
    viewButton.className = 'btn btn-primary btn-sm flex-grow-1';
    viewButton.innerHTML = '<i class="bi bi-github"></i> View on GitHub';

    const cloneButton = document.createElement('button');
    cloneButton.className = 'btn btn-outline-secondary btn-sm';
    cloneButton.innerHTML = '<i class="bi bi-clipboard"></i>';
    cloneButton.title = 'Copy repository URL';
    cloneButton.addEventListener('click', () => {
        navigator.clipboard.writeText(repo.clone_url)
            .then(() => {
                cloneButton.innerHTML = '<i class="bi bi-check-lg"></i>';
                setTimeout(() => {
                    cloneButton.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy URL:', err);
            });
    });

    buttonGroup.appendChild(viewButton);
    buttonGroup.appendChild(cloneButton);

    // Assemble card
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    if (repo.language) cardBody.appendChild(languageDiv);
    cardBody.appendChild(statsDiv);
    cardBody.appendChild(buttonGroup);

    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}