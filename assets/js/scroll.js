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
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -60px 0px'
            });

            elementos.forEach(function (el, i) {
                el.style.transitionDelay = (Math.min(i % 4, 3) * 80) + 'ms';
                observer.observe(el);
            });

        } else {
            elementos.forEach(function (el) { el.classList.add('is-visible'); });
        }

        // --- Palavras rotativas no título do hero ---
        var emHero = document.querySelector('.hero-title em');
        if (emHero) {
            var palavras = ['únicos', 'elegantes', 'perfeitos', 'exclusivos'];
            var idxPalavra = 0;
            emHero.textContent = palavras[0];
            setInterval(function () {
                emHero.classList.add('saindo');
                setTimeout(function () {
                    idxPalavra = (idxPalavra + 1) % palavras.length;
                    emHero.textContent = palavras[idxPalavra];
                    emHero.classList.remove('saindo');
                }, 400);
            }, 2800);
        }

        // --- Contadores animados nos stats do hero ---
        var statsEl = document.querySelector('.hero-meta');
        if (statsEl && 'IntersectionObserver' in window) {
            var contadores = [
                { el: statsEl.querySelectorAll('strong')[0], valor: 80, fmt: function(n){ return '+' + n; } },
                { el: statsEl.querySelectorAll('strong')[1], valor: 8,  fmt: function(n){ return n + ' anos'; } },
                { el: statsEl.querySelectorAll('strong')[2], valor: 5,  fmt: function(n){ return n + '★'; } }
            ];
            var contado = false;
            var obsCount = new IntersectionObserver(function (entries) {
                if (!entries[0].isIntersecting || contado) return;
                contado = true;
                contadores.forEach(function (c) {
                    if (!c.el) return;
                    var inicio = performance.now();
                    var dur = 1800;
                    (function tick(agora) {
                        var p = Math.min((agora - inicio) / dur, 1);
                        var ease = 1 - Math.pow(1 - p, 3);
                        c.el.textContent = c.fmt(Math.round(ease * c.valor));
                        if (p < 1) requestAnimationFrame(tick);
                    })(performance.now());
                });
            }, { threshold: 0.6 });
            obsCount.observe(statsEl);
        }

        // --- Parallax suave no fundo do hero ---
        var heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            window.addEventListener('scroll', function () {
                if (window.scrollY < window.innerHeight * 1.2) {
                    heroBg.style.transform = 'translateY(' + (window.scrollY * 0.35) + 'px)';
                }
            }, { passive: true });
        }
    }

    namespace.iniciarScroll = iniciarScroll;

}(window.EdMoveis = window.EdMoveis || {}));
