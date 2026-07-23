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