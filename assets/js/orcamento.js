(function () {
    'use strict';

    function iniciarFormulario() {
        var form      = document.getElementById('orcamentoForm');
        var feedback  = document.getElementById('formFeedback');
        var btnEnviar = document.getElementById('btnEnviar');

        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var dados = {
                nome:     form.nome.value.trim(),
                email:    form.email.value.trim(),
                telefone: form.telefone.value.trim(),
                ambiente: form.ambiente.value,
                mensagem: form.mensagem.value.trim()
            };

            // Feedback visual de carregando
            btnEnviar.disabled    = true;
            btnEnviar.textContent = 'Enviando...'

            fetch('/api/orcamentos', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(dados)
            })
            .then(function (res) { return res.json(); })
            .then(function (resposta) {
                if (resposta.success) {
                    mostrarFeedback('sucesso', '✅ Pedido enviado! Entraremos em contato em breve.')
                    form.reset();
                } else {
                    mostrarFeedback('erro', '❌ ' + resposta.message);
                }
            })
            .catch(function () {
                mostrarFeedback('erro', '❌ Erro ao enviar. Tente pelo WhatsApp.')
            })
            .finally(function () {
                btnEnviar.disabled    = false;
                btnEnviar.textContent = 'Enviar pedido de orçamento';
            });
        });

        function mostrarFeedback(tipo, mensagem) {
            feedback.hidden    = false;
            feedback.className = 'form-feedback form-feedback--' + tipo;
            feedback.textContent = mensagem;
            feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    document.addEventListener('DOMContentLoaded', iniciarFormulario);

}());
