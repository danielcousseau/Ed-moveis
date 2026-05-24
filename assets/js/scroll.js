/**
 * Ed Móveis — Módulo de Scroll
 *
 * Responsabilidades:
 *  - Scroll suave ao clicar em links âncora
 *  - Animações de entrada (reveal) usando IntersectionObserver
 */
(function (namespace) {
    'use strict';

    function iniciarScroll() {
        const header = document.getElementById('siteHeader');

        // --- Scroll suave para âncoras internas ---
        document.querySelectorAll('a[href^="#"]').forEach(function (ancora) {
            ancora.addEventListener('click', function (e) {
                const href = ancora.getAttribute('href');
                if (href === '#' || href.length < 2) return;

                const alvo = document.querySelector(href);
                if (!alvo) return;

                e.preventDefault();
                const topo = alvo.getBoundingClientRect().top + window.scrollY - header.offsetHeight + 1;
                window.scrollTo({ top: topo, behavior: 'smooth' });
            });
        });

        // --- Animações reveal (IntersectionObserver) ---
        const elementos = document.querySelectorAll('.reveal');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Observa só uma vez
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -60px 0px'
            });

            elementos.forEach(function (el, i) {
                // Stagger nos cards para efeito de entrada em cascata
                el.style.transitionDelay = (Math.min(i % 4, 3) * 80) + 'ms';
                observer.observe(el);
            });

        } else {
            // Fallback: mostra tudo em navegadores antigos sem suporte
            elementos.forEach(function (el) { el.classList.add('is-visible'); });
        }
    }

    namespace.iniciarScroll = iniciarScroll;

}(window.EdMoveis = window.EdMoveis || {}));
