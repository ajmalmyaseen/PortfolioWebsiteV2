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
        DARK / LIGHT MODE
    =========================*/

    const themeBtn = document.getElementById("theme-btn");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        body.classList.add("light-theme");

        themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';

    }

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("light-theme");

        if (body.classList.contains("light-theme")) {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';

        } else {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';

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