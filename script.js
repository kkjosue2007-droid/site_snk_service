// --- DOM Elements ---
const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const hamburgerBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- System Theme Preference Logic ---
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");

// Apply theme on load
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
} else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
} else {
    document.documentElement.setAttribute("data-theme", "light");
}

// Watch for OS theme changes
prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    }
});

// Theme Toggle Button Handler
themeToggleBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

// --- Hamburger Menu Handler (Mobile) ---
hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Handle Active state styling
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    let windowHeight = window.innerHeight;
    let revealPoint = 100; // Trigger earlier

    revealElements.forEach(el => {
        let revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger initial load

// --- I18n Translation Dictionary ---
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_services: "Nos Services",
        nav_realizes:"Notre quotidien",
        nav_contact: "Contact",
        hero_title_h2:"BIENVENUE CHEZ NOUS",
        hero_title: "L'Excellence du Nettoyage",
        hero_subtitle: "Domicile & Industriel. Expertise, Fiabilité, Performance.",
        hero_btn: "Demander un Devis",
        about_title: "À Propos de SNK",
        about_text1: "Nous sommes les leaders en nettoyage industriel et domestique. Forts de notre expertise, nous garantissons un environnement impeccable et sain pour vos espaces de vie et de travail.",
        about_text2: "Chez SNK SERVICE, nous transformons vos Espaces avec un Nettoyage en profondeur et un souci du Detail Incompaarable.",
        services_title: "Nos Services",
        srv_dom: "Nettoyage De domicile",
        srv_dom_desc: "Entretien complet de votre domicile. Nous prenons soin de votre intérieur avec discrétion et efficacité.",
        srv_ind: "Nettoyage Industriel",
        srv_ind_desc: "Des solutions robustes pour usines et entrepôts. Respect strict des normes de sécurité et de performance.",
        srv_eco: "Entretien Écologique",
        srv_eco_desc: "Utilisation de méthodes et de produits respectueux de l'environnement pour un impact minimal.",
        realizes:"Notre quotidien en images",
        contact_title: "Contactez-nous",
        form_name: "Nom complet",
        form_email: "Adresse Email",
        form_message: "Votre message...",
        form_submit: "Envoyer",
        footer_rights: "Tous droits réservés."
    },
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_services: "Our Services",
        nav_realizes:"Our daily life",
        nav_contact: "Contact",
        hero_title_h2:"WELCOME",
        hero_title: "Cleaning Excellence",
        hero_subtitle: "Home & Industrial. Expertise, Reliability, Performance.",
        hero_btn: "Request a Quote",
        about_title: "About SNK",
        about_text1: "We are leaders in industrial and domestic cleaning. Backed by our expertise, we guarantee a spotless and healthy environment for your living and working spaces.",
        about_text2: "At snk SNK SERVICE, we transform your spaces with deep cleanning and an unmached attention to details.",
        services_title: "Our Services",
        srv_dom: "Home Cleaning",
        srv_dom_desc: "Comprehensive home maintenance. We take care of your interior with discretion and efficiency.",
        srv_ind: "Industrial Cleaning",
        srv_ind_desc: "Robust solutions for factories and warehouses. Strict compliance with safety and performance standards.",
        srv_eco: "Eco-Friendly Cleaning",
        srv_eco_desc: "Use of environmentally friendly methods and products for minimal environmental impact.",
        realizes:"Our daily life in pictures",
        contact_title: "Contact Us",
        form_name: "Full Name",
        form_email: "Email Address",
        form_message: "Your message...",
        form_submit: "Send Message",
        footer_rights: "All rights reserved."
    }
};

let currentLang = 'fr';

// Language Toggle Handler
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    
    // Update button text
    langToggleBtn.innerText = currentLang === 'fr' ? 'FR | EN' : 'EN | FR';
    
    // Update standard text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });

    // Update placeholders in forms
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });
});
