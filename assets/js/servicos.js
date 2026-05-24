/**
 * Ed Móveis — Módulo de Serviços
 *
 * Padrão MVC:
 *   Model      → assets/data/servicos.json
 *   View       → .services-grid no index.html
 *   Controller → funções abaixo (ler JSON → renderizar HTML)
 *
 * CRUD aplicado:
 *   Create → criarCardServico() monta o HTML do card
 *   Read   → fetch() lê os dados do JSON
 */
(function (namespace) {
    'use strict';

    // Mapa de ícones SVG indexados pela chave definida no JSON
    var ICONES = {
        cozinha:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h18v6H3zM3 9v12h18V9M8 13h2M8 17h2M14 13v8"/></svg>',
        cama:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 17v2h20v-2M4 17v-5a4 4 0 014-4h8a4 4 0 014 4v5M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2"/></svg>',
        banheiro:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12V4h14v8M3 12h18v6a2 2 0 01-2 2h-2v2M5 20v2M5 20H3v-6"/></svg>',
        escritorio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4h18v12H3zM8 20h8M12 16v4M7 8h4M7 12h7"/></svg>',
        tv:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 5h20v12H2zM2 20h20M8 17v3M16 17v3"/></svg>',
        roupeiro:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3h16v18H4zM12 3v18M8 8h0.01M16 8h0.01M8 14h0.01M16 14h0.01"/></svg>',
        servico:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18v12H3zM8 6V3h8v3M7 14h10M9 18v3M15 18v3"/></svg>',
        comercial:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21V8l9-5 9 5v13M9 21v-8h6v8M3 21h18"/></svg>'
    };

    /**
     * Cria o HTML de um card de serviço a partir de um objeto do JSON.
     * @param {Object} servico
     * @returns {string}
     */
    function criarCardServico(servico) {
        var icone = ICONES[servico.icone] || '';
        return (
            '<article class="service-card reveal">' +
            '  <div class="service-icon">' + icone + '</div>' +
            '  <h3>' + servico.titulo + '</h3>' +
            '  <p>' + servico.descricao + '</p>' +
            '</article>'
        );
    }

    /**
     * Renderiza todos os cards no container da View.
     * @param {Array} servicos
     */
    function renderizarServicos(servicos) {
        var container = document.querySelector('.services-grid');
        if (!container) return;
        container.innerHTML = servicos.map(criarCardServico).join('');
    }

    // Dados embutidos — funciona com duplo clique (file://) e com servidor
    var DADOS_SERVICOS = [
        { id: 'cozinhas',    titulo: 'Cozinhas sob medida',  descricao: 'Bancadas, ilhas, despensas e torres quentes — funcionalidade total com acabamento de revista.',          icone: 'cozinha'    },
        { id: 'dormitorios', titulo: 'Dormitórios sob medida',descricao: 'Camas com baú, cabeceiras integradas, criados e nichos pensados para o seu descanso.',                  icone: 'cama'       },
        { id: 'banheiros',   titulo: 'Banheiros',             descricao: 'Gabinetes resistentes à umidade, espelheiras e nichos com iluminação embutida.',                        icone: 'banheiro'   },
        { id: 'escritorios', titulo: 'Escritórios',           descricao: 'Home offices ergonômicos com mesas, prateleiras, gaveteiros e organização total de cabos.',             icone: 'escritorio' },
        { id: 'paineis-tv',  titulo: 'Painéis de TV',         descricao: 'Painéis ripados, racks suspensos e estantes integradas para a sua sala de estar.',                      icone: 'tv'         },
        { id: 'roupeiros',   titulo: 'Roupeiros',             descricao: 'Closets e guarda-roupas com divisórias inteligentes, gavetas internas e cabideiros.',                   icone: 'roupeiro'   },
        { id: 'areas-servico',titulo: 'Áreas de serviço',    descricao: 'Armários, torres para máquinas, tanques embutidos e organização para a sua lavanderia.',                icone: 'servico'    },
        { id: 'comercial',   titulo: 'Móveis comerciais',     descricao: 'Lojas, clínicas, salões e escritórios — projetos sob medida para o seu negócio.',                       icone: 'comercial'  }
    ];

    /**
     * Ponto de entrada do módulo.
     */
    function iniciarServicos() {
        renderizarServicos(DADOS_SERVICOS);
    }

    namespace.iniciarServicos = iniciarServicos;

}(window.EdMoveis = window.EdMoveis || {}));
