/**
 * Ed Móveis — Controlador Principal (App)
 *
 * Arquitetura MVC (front-end estático):
 *   Model      → assets/data/*.json  (dados dos serviços e da galeria)
 *   View       → index.html + assets/css/style.css  (estrutura e aparência)
 *   Controller → assets/js/*.js  (este arquivo orquestra os módulos)
 *
 * Ordem de inicialização:
 *   1. nav.js      — navegação e header
 *   2. servicos.js — renderiza serviços a partir do JSON
 *   3. galeria.js  — renderiza galeria + filtros a partir do JSON
 *   4. videos.js   — modal de vídeo YouTube
 *   5. scroll.js   — animações reveal e scroll suave (deve ser o último
 *                    para observar os elementos criados pelos outros módulos)
 *
 * Nota: fetch() requer um servidor HTTP. Para testar localmente,
 * use a extensão "Live Server" do VS Code ou execute:
 *   python -m http.server 8080
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        EdMoveis.iniciarNav();
        EdMoveis.iniciarServicos();
        EdMoveis.iniciarGaleria();
        EdMoveis.iniciarVideos();

        // scroll.js deve iniciar por último — os módulos acima
        // podem adicionar elementos com classe .reveal ao DOM
        // e o IntersectionObserver precisa encontrá-los.
        EdMoveis.iniciarScroll();

        // Ano dinâmico no rodapé
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

    });

}());
