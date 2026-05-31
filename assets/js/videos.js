/**
 * Ed Móveis — Módulo de Vídeos
 *
 * Responsabilidade: abrir e fechar o modal com embed do YouTube.
 * O iframe é criado e destruído dinamicamente — evita que o vídeo
 * continue tocando ao fechar o modal.
 */
(function (namespace) {
    'use strict';

    function iniciarVideos() {
        const modal      = document.getElementById('videoModal');
        const frame      = document.getElementById('videoFrame');
        const videoCards  = document.querySelectorAll('.video-card');
        const emBreve     = document.getElementById('videoEmBreve');

        if (!modal || !frame) return;

        // Mostra a mensagem "em breve" se não houver cards de vídeo
        if (emBreve) emBreve.hidden = videoCards.length > 0;

        // --- Funções de estado do modal ---

        function abrirModal(videoId) {
            if (!videoId) return;

            // Injeta o iframe com autoplay ao abrir
            frame.innerHTML =
                '<iframe' +
                ' src="https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0"' +
                ' title="Vídeo Ed Móveis"' +
                ' allow="autoplay; encrypted-media; picture-in-picture"' +
                ' allowfullscreen>' +
                '</iframe>';

            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function fecharModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            frame.innerHTML = ''; // Remove o iframe = para o áudio/vídeo
            document.body.style.overflow = '';
        }

        // --- Eventos ---

        // Clique em qualquer card de vídeo abre o modal
        videoCards.forEach(function (card) {
            card.addEventListener('click', function () {
                abrirModal(card.dataset.videoId);
            });
        });

        // Fechar pelo backdrop ou pelo botão X
        modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
            el.addEventListener('click', fecharModal);
        });

        // Fechar com Esc (acessibilidade)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) fecharModal();
        });
    }

    namespace.iniciarVideos = iniciarVideos;

}(window.EdMoveis = window.EdMoveis || {}));
