(function (namespace) {
    'use strict';

    var filtroAtivo = 'all';

    var PINTEREST = {
        all:        'https://www.pinterest.com/search/pins/?q=moveis+sob+medida+mdf',
        cozinha:    'https://www.pinterest.com/search/pins/?q=cozinha+sob+medida+mdf',
        quarto:     'https://www.pinterest.com/search/pins/?q=quarto+sob+medida+mdf',
        banheiro:   'https://www.pinterest.com/search/pins/?q=banheiro+sob+medida+mdf',
        sala:       'https://www.pinterest.com/search/pins/?q=sala+sob+medida+mdf',
        escritorio: 'https://www.pinterest.com/search/pins/?q=home+office+sob+medida+mdf',
        comercial:  'https://www.pinterest.com/search/pins/?q=moveis+comerciais+sob+medida'
    };

    var LABELS = {
        all:        'Todos os Ambientes',
        cozinha:    'Cozinha',
        quarto:     'Quarto',
        banheiro:   'Banheiro',
        sala:       'Sala',
        escritorio: 'Escritório',
        comercial:  'Comercial'
    };

    function criarItemGaleria(item) {
        var slug = item.categoria ? item.categoria.slug : '';

        return (
            '<article class="gallery-item reveal" data-category="' + slug + '">' +
            '  <div class="gallery-img">' +
            '    <img src="' + item.imagem + '" alt="' + item.alt + '" loading="lazy">' +
            '  </div>' +
            '</article>'
        );
    }

    function atualizarBotaoPinterest(filtro) {
        var hint = document.getElementById('pinterest-hint');
        if (!hint) return;
        var link = hint.querySelector('.pinterest-link');
        link.href = PINTEREST[filtro] || PINTEREST['all'];
        link.querySelector('.pinterest-label').textContent = LABELS[filtro] || 'Móveis';
        hint.hidden = false;
    }

    function aplicarFiltro(filtro) {
        filtroAtivo = filtro;
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            var visivel = filtroAtivo === 'all' || item.dataset.category === filtroAtivo;
            item.classList.toggle('is-hidden', !visivel);
        });
        atualizarBotaoPinterest(filtro);
    }

    function iniciarFiltros() {
        var botoes = document.querySelectorAll('.filter-btn');
        botoes.forEach(function (btn) {
            btn.addEventListener('click', function () {
                botoes.forEach(function (b) {
                    b.classList.remove('is-active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('is-active');
                btn.setAttribute('aria-selected', 'true');
                aplicarFiltro(btn.dataset.filter);
            });
        });
    }

    function mostrarErro() {
        var container = document.getElementById('gallery');
        if (container) {
            container.innerHTML =
                '<p style="grid-column:1/-1;text-align:center;color:#999;padding:2rem">' +
                'Nenhum projeto encontrado. Adicione projetos pelo painel de administração.' +
                '</p>';
        }
    }

    function renderizarGaleria(itens) {
        var container = document.getElementById('gallery');
        if (!container) return;

        if (!itens || itens.length === 0) {
            mostrarErro();
            return;
        }

        container.innerHTML = itens.map(criarItemGaleria).join('');
        if (filtroAtivo !== 'all') aplicarFiltro(filtroAtivo);
    }

    function iniciarLightbox() {
        var lb        = document.getElementById('lightbox');
        var lbImg     = document.getElementById('lightboxImg');
        var lbTitulo  = document.getElementById('lightboxTitulo');
        var lbClose   = document.getElementById('lightboxClose');
        var lbPrev    = document.getElementById('lightboxPrev');
        var lbNext    = document.getElementById('lightboxNext');
        var lbBackdrop = document.getElementById('lightboxBackdrop');
        if (!lb) return;

        var itens = [];
        var idx = 0;

        function abrir(i) {
            itens = Array.from(document.querySelectorAll('.gallery-item:not(.is-hidden)'));
            idx = i;
            var item = itens[idx];
            if (!item) return;
            lbImg.src = item.querySelector('img').src;
            lbImg.alt = item.querySelector('img').alt;
            lbTitulo.textContent = (item.querySelector('h3') || {}).textContent || '';
            lb.classList.add('is-open');
            lb.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function fechar() {
            lb.classList.remove('is-open');
            lb.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            lbImg.src = '';
        }

        function navegar(dir) {
            idx = (idx + dir + itens.length) % itens.length;
            lbImg.style.opacity = '0';
            setTimeout(function () {
                abrir(idx);
                lbImg.style.opacity = '';
            }, 150);
        }

        document.getElementById('gallery').addEventListener('click', function (e) {
            var item = e.target.closest('.gallery-item');
            if (!item) return;
            var todos = Array.from(document.querySelectorAll('.gallery-item:not(.is-hidden)'));
            abrir(todos.indexOf(item));
        });

        lbClose.addEventListener('click', fechar);
        lbBackdrop.addEventListener('click', fechar);
        lbPrev.addEventListener('click', function () { navegar(-1); });
        lbNext.addEventListener('click', function () { navegar(1); });

        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('is-open')) return;
            if (e.key === 'Escape')     fechar();
            if (e.key === 'ArrowLeft')  navegar(-1);
            if (e.key === 'ArrowRight') navegar(1);
        });
    }

    function iniciarGaleria() {
        iniciarFiltros();
        atualizarBotaoPinterest('all');
        iniciarLightbox();

        // Busca projetos da API
        fetch('/api/galeria')
            .then(function (res) { return res.json(); })
            .then(function (resposta) {
                renderizarGaleria(resposta.data);
            })
            .catch(function () {
                mostrarErro();
            });
    }

    namespace.iniciarGaleria = iniciarGaleria;

}(window.EdMoveis = window.EdMoveis || {}));
