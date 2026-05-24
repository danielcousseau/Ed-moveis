/**
 * Ed Móveis — Módulo de Navegação
 *
 * Responsabilidades:
 *  - Abrir/fechar menu mobile com overlay
 *  - Aplicar classe is-scrolled no header ao rolar
 *  - Destacar link ativo conforme seção visível
 */
(function (namespace) {
    'use strict';

    function iniciarNav() {
        const header     = document.getElementById('siteHeader');
        const menuToggle = document.getElementById('menuToggle');
        const mainNav    = document.getElementById('mainNav');

        if (!header || !menuToggle || !mainNav) return;

        // Cria o overlay de fundo dinamicamente (evita HTML desnecessário na View)
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        // --- Funções de estado do menu ---

        function abrirMenu() {
            mainNav.classList.add('is-open');
            menuToggle.classList.add('is-open');
            overlay.classList.add('is-visible');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function fecharMenu() {
            mainNav.classList.remove('is-open');
            menuToggle.classList.remove('is-open');
            overlay.classList.remove('is-visible');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        // --- Eventos do menu ---

        menuToggle.addEventListener('click', function () {
            mainNav.classList.contains('is-open') ? fecharMenu() : abrirMenu();
        });

        overlay.addEventListener('click', fecharMenu);

        // Fecha ao clicar em qualquer link interno
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (mainNav.classList.contains('is-open')) fecharMenu();
            });
        });

        // Fecha com tecla Esc (acessibilidade)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mainNav.classList.contains('is-open')) fecharMenu();
        });

        // --- Efeito de scroll no header ---

        function atualizarHeader() {
            header.classList.toggle('is-scrolled', window.scrollY > 30);
        }

        window.addEventListener('scroll', atualizarHeader, { passive: true });
        atualizarHeader(); // Executa no carregamento

        // --- Destaque do link ativo ---

        const secoes   = document.querySelectorAll('section[id]');
        const navLinks = mainNav.querySelectorAll('a[href^="#"]');

        function destacarSecaoAtiva() {
            const posicao = window.scrollY + header.offsetHeight + 60;
            let idAtual = '';

            secoes.forEach(function (sec) {
                if (sec.offsetTop <= posicao) idAtual = sec.id;
            });

            navLinks.forEach(function (link) {
                link.classList.toggle('is-active', link.getAttribute('href') === '#' + idAtual);
            });
        }

        window.addEventListener('scroll', destacarSecaoAtiva, { passive: true });
        destacarSecaoAtiva();
    }

    // Expõe a função no namespace global EdMoveis
    namespace.iniciarNav = iniciarNav;

}(window.EdMoveis = window.EdMoveis || {}));
