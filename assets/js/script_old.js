/* ==========================================================
   MADEIRARTE — Script principal
   - Menu responsivo
   - Header com efeito ao rolar
   - Scroll suave dos links internos
   - Filtros da galeria
   - Modal de vídeo
   - Animações on-scroll (IntersectionObserver)
   - Ano dinâmico no rodapé
   ========================================================== */

(function () {
    'use strict';

    /* ---------- 1. Referências de elementos ---------- */
    const header      = document.getElementById('siteHeader');
    const menuToggle  = document.getElementById('menuToggle');
    const mainNav     = document.getElementById('mainNav');
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const galleryItems= document.querySelectorAll('.gallery-item');
    const videoCards  = document.querySelectorAll('.video-card');
    const videoModal  = document.getElementById('videoModal');
    const videoFrame  = document.getElementById('videoFrame');
    const yearEl      = document.getElementById('year');


    /* ---------- 2. Ano dinâmico no rodapé ---------- */
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    /* ---------- 3. Header — efeito ao rolar ---------- */
    let lastScroll = 0;
    function handleHeaderScroll() {
        const y = window.scrollY;
        if (y > 30) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
        lastScroll = y;
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();


    /* ---------- 4. Menu responsivo (mobile) ---------- */
    // Cria overlay dinamicamente para escurecer fundo quando menu aberto
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        mainNav.classList.add('is-open');
        menuToggle.classList.add('is-open');
        overlay.classList.add('is-visible');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        mainNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', function () {
        if (mainNav.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Fecha o menu ao clicar em um link interno
    mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (mainNav.classList.contains('is-open')) {
                closeMenu();
            }
        });
    });

    // Fecha o menu com tecla Esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
            closeMenu();
        }
    });


    /* ---------- 5. Filtros da galeria de ideias ---------- */
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const filter = btn.dataset.filter;

            // Atualiza estado visual dos botões
            filterBtns.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-selected', 'true');

            // Filtra os itens
            galleryItems.forEach(function (item) {
                const matches = (filter === 'all') || (item.dataset.category === filter);
                if (matches) {
                    item.classList.remove('is-hidden');
                } else {
                    item.classList.add('is-hidden');
                }
            });
        });
    });


    /* ---------- 6. Modal de vídeo (YouTube embed) ---------- */
    function openVideoModal(videoId) {
        if (!videoId) return;
        // Cria iframe com autoplay
        videoFrame.innerHTML =
            '<iframe src="https://www.youtube.com/embed/' + encodeURIComponent(videoId) +
            '?autoplay=1&rel=0" ' +
            'title="Vídeo do projeto" ' +
            'allow="autoplay; encrypted-media; picture-in-picture" ' +
            'allowfullscreen></iframe>';
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden', 'true');
        videoFrame.innerHTML = ''; // remove iframe = para o vídeo
        document.body.style.overflow = '';
    }

    // Clique nos cards de vídeo abre o modal
    videoCards.forEach(function (card) {
        card.addEventListener('click', function () {
            const id = card.dataset.videoId;
            openVideoModal(id);
        });
    });

    // Fecha o modal — backdrop, botão X ou tecla Esc
    videoModal.querySelectorAll('[data-close-modal]').forEach(function (el) {
        el.addEventListener('click', closeVideoModal);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && videoModal.classList.contains('is-open')) {
            closeVideoModal();
        }
    });


    /* ---------- 7. Scroll suave para links âncora ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = anchor.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });


    /* ---------- 8. Animações on-scroll (reveal) ---------- */
    // Usa IntersectionObserver para revelar elementos suavemente
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach(function (el, i) {
            // pequeno stagger nos cards de uma mesma grid para um efeito mais elegante
            el.style.transitionDelay = (Math.min(i % 4, 3) * 80) + 'ms';
            io.observe(el);
        });
    } else {
        // Fallback: mostra tudo se o navegador não suportar
        reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }


    /* ---------- 9. Destaque do link de menu ativo ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = mainNav.querySelectorAll('a[href^="#"]');

    function highlightActiveSection() {
        const scrollPos = window.scrollY + header.offsetHeight + 60;
        let currentId = '';
        sections.forEach(function (sec) {
            if (sec.offsetTop <= scrollPos) {
                currentId = sec.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.toggle(
                'is-active',
                link.getAttribute('href') === '#' + currentId
            );
        });
    }
    window.addEventListener('scroll', highlightActiveSection, { passive: true });
    highlightActiveSection();

})();
