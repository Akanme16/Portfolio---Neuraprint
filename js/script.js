// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // --- MANEJO DEL MENÚ HAMBURGUESA ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');

    // Verifica si los elementos existen para evitar errores
    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', function() {
            // Alterna la clase 'is-active' en el botón hamburguesa
            this.classList.toggle('is-active');
            // Alterna la clase 'is-active' en el menú de navegación
            mainNav.classList.toggle('is-active');

            // Actualiza el atributo aria-expanded para accesibilidad
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);

            // Opcional: Evitar scroll en el body cuando el menú está abierto
            // document.body.classList.toggle('no-scroll'); // Necesitarías CSS para .no-scroll { overflow: hidden; }
        });

        // Cierra el menú si se hace clic en un enlace (para SPAs o navegación en la misma página)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-active')) {
                    hamburgerButton.classList.remove('is-active');
                    mainNav.classList.remove('is-active');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    // document.body.classList.remove('no-scroll');
                }
            });
        });
    }


    // --- ACTUALIZACIÓN DEL AÑO EN EL FOOTER ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // --- OPCIONAL: RESALTAR ENLACE ACTIVO EN NAVEGACIÓN AL HACER SCROLL ---
    // (Esta es una implementación básica, puede requerir ajustes)
    const sections = document.querySelectorAll('main section[id]');
    const navLi = document.querySelectorAll('.main-nav ul li a');

    function highlightActiveLink() {
        let currentSectionId = '';
        // Considerar la altura de la cabecera fija para la detección precisa de la sección.
        // El '50' es un offset adicional para que la sección se marque como activa un poco antes de que su borde superior exacto llegue al borde superior de la cabecera.
        const headerHeight = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
        const scrollOffset = headerHeight + 50; 
        
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            // section.offsetTop es la distancia desde el inicio del documento hasta el inicio de la sección.
            // Le restamos scrollOffset para que la detección sea relativa a la parte visible debajo de la cabecera.
            const sectionTop = section.offsetTop - scrollOffset;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLi.forEach(link => {
            link.classList.remove('active-link');
            // Asegurarse de que el href del link coincide con el formato '#sectionId'
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    }

    // Ejecuta la función al cargar la página y al hacer scroll
    if (sections.length > 0 && navLi.length > 0) {
        window.addEventListener('scroll', highlightActiveLink);
        highlightActiveLink(); // Llama una vez para estado inicial
    }


    // --- EFECTO DE "APARICIÓN" SUAVE EN ELEMENTOS AL HACER SCROLL (OPCIONAL) ---
    // (Requiere CSS adicional para las clases de animación)
    /*
    Ejemplo CSS:
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    */
    /*
    const observerOptions = {
        root: null, // Relativo al viewport
        rootMargin: '0px', // Podrías ajustar esto, por ej. '-var(--header-height) 0px 0px 0px' para que se active después de pasar la cabecera
        threshold: 0.1 // 10% del elemento visible
    };

    function observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Deja de observar una vez que es visible
            }
        });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToFade = document.querySelectorAll('.service-card, .portfolio-item, .about-section p, .contact-section p'); // Selecciona los elementos a animar
    
    if (elementsToFade.length > 0) {
        elementsToFade.forEach(element => {
            element.classList.add('fade-in-element'); // Añade clase base para estado inicial
            observer.observe(element);
        });
    }
    */

    // --- FIN DEL SCRIPT ---
    console.log("Portafolio de Pablo Camargo cargado y listo. v2");
});