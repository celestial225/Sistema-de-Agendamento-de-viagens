// Dados mockados para demonstração
const viagensMock = [
    {
        id: "V001",
        origem: "Luanda",
        destino: "Benguela",
        dataHoraPartida: "2024-01-15T08:00:00",
        dataHoraChegada: "2024-01-15T14:30:00",
        agencia: "MACON",
        preco: 2500.0,
        lugaresDisponiveis: 45,
        tipoAutocarro: "Expresso",
        status: "Disponível"
    },
    {
        id: "V002",
        origem: "Luanda",
        destino: "Lubango",
        dataHoraPartida: "2024-01-16T06:30:00",
        dataHoraChegada: "2024-01-16T18:00:00",
        agencia: "MACON",
        preco: 3500.0,
        lugaresDisponiveis: 40,
        tipoAutocarro: "Luxo",
        status: "Disponível"
    },
    {
        id: "V003",
        origem: "Luanda",
        destino: "Cabinda",
        dataHoraPartida: "2024-01-15T10:00:00",
        dataHoraChegada: "2024-01-15T16:00:00",
        agencia: "Expresso Angola",
        preco: 4000.0,
        lugaresDisponiveis: 35,
        tipoAutocarro: "Expresso",
        status: "Disponível"
    },
    {
        id: "V004",
        origem: "Benguela",
        destino: "Luanda",
        dataHoraPartida: "2024-01-17T07:00:00",
        dataHoraChegada: "2024-01-17T13:30:00",
        agencia: "MACON",
        preco: 2500.0,
        lugaresDisponiveis: 50,
        tipoAutocarro: "Normal",
        status: "Disponível"
    }
];

const agenciasMock = [
    {
        nome: "MACON",
        codigo: "MAC001",
        endereco: "Rua Amílcar Cabral, Luanda",
        telefone: "+244 222 123 456",
        email: "info@macon.co.ao",
        rotas: ["Luanda", "Benguela", "Lubango", "Huambo"]
    },
    {
        nome: "Expresso Angola",
        codigo: "EXP001",
        endereco: "Avenida 4 de Fevereiro, Luanda",
        telefone: "+244 222 789 012",
        email: "contacto@expressoangola.co.ao",
        rotas: ["Luanda", "Cabinda", "Soyo", "Malanje"]
    }
];

// Variáveis globais
let viagemSelecionada = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarAgencias();
    configurarEventListeners();
    definirDataMinima();
});

// Configurar event listeners
function configurarEventListeners() {
    // Navegação suave
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Atualizar link ativo
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Formulário de reserva
    document.getElementById('form-reserva').addEventListener('submit', function(e) {
        e.preventDefault();
        processarReserva();
    });

    // Fechar modal ao clicar fora
    document.getElementById('modal-reserva').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharModal();
        }
    });
}

// Navegação suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Definir data mínima para o campo de data
function definirDataMinima() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data').setAttribute('min', hoje);
}

// Buscar viagens
function buscarViagens() {
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    const data = document.getElementById('data').value;

    if (!origem || !destino) {
        mostrarNotificacao('Por favor, selecione origem e destino', 'warning');
        return;
    }

    mostrarLoading(true);
    
    // Simular delay da API
    setTimeout(() => {
        const viagensFiltradas = viagensMock.filter(viagem => {
            const matchOrigem = !origem || viagem.origem.toLowerCase().includes(origem.toLowerCase());
            const matchDestino = !destino || viagem.destino.toLowerCase().includes(destino.toLowerCase());
            const matchData = !data || viagem.dataHoraPartida.startsWith(data);
            return matchOrigem && matchDestino && matchData && viagem.status === 'Disponível';
        });

        mostrarLoading(false);
        exibirViagens(viagensFiltradas);
        
        if (viagensFiltradas.length === 0) {
            mostrarNotificacao('Nenhuma viagem encontrada para os critérios selecionados', 'info');
        }
    }, 1500);
}

// Exibir viagens
function exibirViagens(viagens) {
    const container = document.getElementById('viagens-results');
    
    if (viagens.length === 0) {
        container.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666;">Nenhuma viagem encontrada</h3>
                <p style="color: #999;">Tente ajustar os filtros de busca</p>
            </div>
        `;
        return;
    }

    container.innerHTML = viagens.map(viagem => `
        <div class="viagem-card">
            <div class="viagem-header">
                <div class="viagem-route">
                    <i class="fas fa-map-marker-alt"></i>
                    ${viagem.origem} → ${viagem.destino}
                </div>
                <div class="viagem-price">${formatarMoeda(viagem.preco)}</div>
            </div>
            <div class="viagem-details">
                <div class="viagem-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formatarData(viagem.dataHoraPartida)}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-clock"></i>
                    <span>${formatarHora(viagem.dataHoraPartida)} - ${formatarHora(viagem.dataHoraChegada)}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-building"></i>
                    <span>${viagem.agencia}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-bus"></i>
                    <span>${viagem.tipoAutocarro}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-users"></i>
                    <span>${viagem.lugaresDisponiveis} lugares disponíveis</span>
                </div>
            </div>
            <div class="viagem-actions">
                <button class="btn btn-primary btn-small" onclick="abrirModalReserva('${viagem.id}')">
                    <i class="fas fa-ticket-alt"></i>
                    Reservar
                </button>
                <button class="btn btn-secondary btn-small" onclick="verDetalhes('${viagem.id}')">
                    <i class="fas fa-info-circle"></i>
                    Detalhes
                </button>
            </div>
        </div>
    `).join('');
}

// Consultar reservas
function consultarReservas() {
    const bi = document.getElementById('bi-consulta').value.trim();
    
    if (!bi) {
        mostrarNotificacao('Por favor, digite seu bilhete de identidade', 'warning');
        return;
    }

    // Simular busca de reservas
    const reservas = buscarReservasPorBI(bi);
    exibirReservas(reservas);
}

// Exibir reservas
function exibirReservas(reservas) {
    const container = document.getElementById('reservas-results');
    
    if (reservas.length === 0) {
        container.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <i class="fas fa-ticket-alt" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666;">Nenhuma reserva encontrada</h3>
                <p style="color: #999;">Verifique se o bilhete de identidade está correto</p>
            </div>
        `;
        return;
    }

    container.innerHTML = reservas.map(reserva => `
        <div class="reserva-card">
            <div class="viagem-header">
                <div class="viagem-route">
                    <i class="fas fa-ticket-alt"></i>
                    Reserva ${reserva.id}
                </div>
                <div class="viagem-price">${formatarMoeda(reserva.valorTotal)}</div>
            </div>
            <div class="viagem-details">
                <div class="viagem-detail">
                    <i class="fas fa-user"></i>
                    <span>${reserva.passageiro.nome}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${reserva.viagem.origem} → ${reserva.viagem.destino}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formatarData(reserva.viagem.dataHoraPartida)}</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-users"></i>
                    <span>${reserva.numeroLugares} lugar(es)</span>
                </div>
                <div class="viagem-detail">
                    <i class="fas fa-info-circle"></i>
                    <span class="text-${reserva.status === 'Confirmada' ? 'success' : 'warning'}">${reserva.status}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Carregar agências
function carregarAgencias() {
    const container = document.getElementById('agencias-grid');
    
    container.innerHTML = agenciasMock.map(agencia => `
        <div class="agencia-card">
            <div class="agencia-icon">
                <i class="fas fa-building"></i>
            </div>
            <div class="agencia-name">${agencia.nome}</div>
            <div class="agencia-code">Código: ${agencia.codigo}</div>
            <div class="agencia-contact">
                <p><i class="fas fa-map-marker-alt"></i> ${agencia.endereco}</p>
                <p><i class="fas fa-phone"></i> ${agencia.telefone}</p>
                <p><i class="fas fa-envelope"></i> ${agencia.email}</p>
            </div>
        </div>
    `).join('');
}

// Abrir modal de reserva
function abrirModalReserva(viagemId) {
    viagemSelecionada = viagensMock.find(v => v.id === viagemId);
    if (viagemSelecionada) {
        document.getElementById('modal-reserva').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Preencher resumo da viagem
        preencherResumoViagem();
        
        // Calcular total inicial
        calcularTotal();
        
        // Configurar eventos de pagamento
        configurarEventosPagamento();
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal-reserva').style.display = 'none';
    document.body.style.overflow = 'auto';
    viagemSelecionada = null;
    document.getElementById('form-reserva').reset();
}

// Processar reserva
function processarReserva() {
    if (!viagemSelecionada) {
        mostrarNotificacao('Erro: Viagem não selecionada', 'danger');
        return;
    }

    const formData = new FormData(document.getElementById('form-reserva'));
    const dados = {
        nome: formData.get('nome') || document.getElementById('nome').value,
        bi: formData.get('bi') || document.getElementById('bi').value,
        telefone: formData.get('telefone') || document.getElementById('telefone').value,
        email: formData.get('email') || document.getElementById('email').value,
        lugares: parseInt(formData.get('lugares') || document.getElementById('lugares').value)
    };

    // Validações
    if (!dados.nome || !dados.bi || !dados.telefone || !dados.email || !dados.lugares) {
        mostrarNotificacao('Por favor, preencha todos os campos', 'warning');
        return;
    }

    if (dados.lugares > viagemSelecionada.lugaresDisponiveis) {
        mostrarNotificacao('Não há lugares suficientes disponíveis', 'danger');
        return;
    }

    // Simular processamento
    mostrarLoading(true);
    
    setTimeout(() => {
        mostrarLoading(false);
        
        // Criar reserva
        const reserva = {
            id: 'R' + Date.now(),
            passageiro: {
                nome: dados.nome,
                bi: dados.bi,
                telefone: dados.telefone,
                email: dados.email
            },
            viagem: viagemSelecionada,
            numeroLugares: dados.lugares,
            valorTotal: viagemSelecionada.preco * dados.lugares,
            status: 'Confirmada'
        };

        // Salvar reserva (em um cenário real, seria enviado para o servidor)
        salvarReserva(reserva);
        
        mostrarNotificacao('Reserva realizada com sucesso!', 'success');
        fecharModal();
        
        // Atualizar lugares disponíveis
        viagemSelecionada.lugaresDisponiveis -= dados.lugares;
        if (viagemSelecionada.lugaresDisponiveis === 0) {
            viagemSelecionada.status = 'Esgotado';
        }
    }, 2000);
}

// Ver detalhes da viagem
function verDetalhes(viagemId) {
    const viagem = viagensMock.find(v => v.id === viagemId);
    if (viagem) {
        const detalhes = `
Viagem: ${viagem.origem} → ${viagem.destino}
Data/Hora: ${formatarData(viagem.dataHoraPartida)} às ${formatarHora(viagem.dataHoraPartida)}
Duração: ${calcularDuracao(viagem.dataHoraPartida, viagem.dataHoraChegada)}
Agência: ${viagem.agencia}
Tipo: ${viagem.tipoAutocarro}
Preço: ${formatarMoeda(viagem.preco)}
Lugares: ${viagem.lugaresDisponiveis} disponíveis
Status: ${viagem.status}
        `;
        alert(detalhes);
    }
}

// Funções auxiliares
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (mostrar) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function mostrarNotificacao(mensagem, tipo) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.innerHTML = `
        <i class="fas fa-${getIconeTipo(tipo)}"></i>
        <span>${mensagem}</span>
    `;
    
    // Adicionar estilos
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getCorTipo(tipo)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notificacao);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 300);
    }, 5000);
}

function getIconeTipo(tipo) {
    const icones = {
        success: 'check-circle',
        warning: 'exclamation-triangle',
        danger: 'times-circle',
        info: 'info-circle'
    };
    return icones[tipo] || 'info-circle';
}

function getCorTipo(tipo) {
    const cores = {
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#17a2b8'
    };
    return cores[tipo] || '#17a2b8';
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA',
        minimumFractionDigits: 0
    }).format(valor);
}

function formatarData(dataHora) {
    return new Date(dataHora).toLocaleDateString('pt-AO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatarHora(dataHora) {
    return new Date(dataHora).toLocaleTimeString('pt-AO', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function calcularDuracao(partida, chegada) {
    const inicio = new Date(partida);
    const fim = new Date(chegada);
    const diff = fim - inicio;
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}min`;
}

// Simulação de armazenamento local
let reservas = [];

function salvarReserva(reserva) {
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

function buscarReservasPorBI(bi) {
    const reservasSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    return reservasSalvas.filter(r => r.passageiro.bi === bi);
}

// Carregar reservas salvas ao inicializar
document.addEventListener('DOMContentLoaded', function() {
    const reservasSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas = reservasSalvas;
});

// Sistema de Pagamentos
function preencherResumoViagem() {
    if (!viagemSelecionada) return;
    
    const resumo = document.getElementById('viagem-summary');
    resumo.innerHTML = `
        <h5>${viagemSelecionada.origem} → ${viagemSelecionada.destino}</h5>
        <p><strong>Data:</strong> ${formatarData(viagemSelecionada.dataHoraPartida)}</p>
        <p><strong>Hora:</strong> ${formatarHora(viagemSelecionada.dataHoraPartida)} - ${formatarHora(viagemSelecionada.dataHoraChegada)}</p>
        <p><strong>Agência:</strong> ${viagemSelecionada.agencia}</p>
        <p><strong>Tipo:</strong> ${viagemSelecionada.tipoAutocarro}</p>
        <p><strong>Lugares disponíveis:</strong> ${viagemSelecionada.lugaresDisponiveis}</p>
    `;
}

function calcularTotal() {
    if (!viagemSelecionada) return;
    
    const lugares = parseInt(document.getElementById('lugares').value) || 0;
    const precoUnitario = viagemSelecionada.preco;
    const subtotal = precoUnitario * lugares;
    const taxaServico = subtotal * 0.05; // 5% de taxa de serviço
    const total = subtotal + taxaServico;
    
    // Atualizar valores na interface
    document.getElementById('preco-unitario').textContent = formatarMoeda(precoUnitario);
    document.getElementById('quantidade-lugares').textContent = lugares;
    document.getElementById('subtotal').textContent = formatarMoeda(subtotal);
    document.getElementById('taxa-servico').textContent = formatarMoeda(taxaServico);
    document.getElementById('total-pagar').innerHTML = `<strong>${formatarMoeda(total)}</strong>`;
}

function configurarEventosPagamento() {
    // Event listeners para métodos de pagamento
    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', function() {
            mostrarFormularioPagamento(this.value);
        });
    });
    
    // Event listeners para formatação de cartão
    document.getElementById('numero-cartao').addEventListener('input', formatarNumeroCartao);
    document.getElementById('validade').addEventListener('input', formatarValidade);
    document.getElementById('cvv').addEventListener('input', formatarCVV);
    
    // Gerar referência para transferência
    gerarReferenciaTransferencia();
}

function mostrarFormularioPagamento(metodo) {
    // Esconder todos os formulários
    document.querySelectorAll('.payment-form').forEach(form => {
        form.classList.add('hidden');
    });
    
    // Mostrar formulário selecionado
    const formId = metodo + '-form';
    const form = document.getElementById(formId);
    if (form) {
        form.classList.remove('hidden');
    }
}

function formatarNumeroCartao(event) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    event.target.value = formattedValue;
}

function formatarValidade(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
}

function formatarCVV(event) {
    let value = event.target.value.replace(/\D/g, '');
    event.target.value = value.substring(0, 3);
}

function gerarReferenciaTransferencia() {
    const referencia = 'REF' + Date.now().toString().substring(8);
    document.getElementById('referencia-transferencia').textContent = referencia;
}

// Processar reserva com pagamento
function processarReserva() {
    if (!viagemSelecionada) {
        mostrarNotificacao('Erro: Viagem não selecionada', 'danger');
        return;
    }

    const formData = new FormData(document.getElementById('form-reserva'));
    const dados = {
        nome: document.getElementById('nome').value,
        bi: document.getElementById('bi').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        lugares: parseInt(document.getElementById('lugares').value),
        metodoPagamento: document.querySelector('input[name="pagamento"]:checked').value
    };

    // Validações básicas
    if (!dados.nome || !dados.bi || !dados.telefone || !dados.email || !dados.lugares) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios', 'warning');
        return;
    }

    if (dados.lugares > viagemSelecionada.lugaresDisponiveis) {
        mostrarNotificacao('Não há lugares suficientes disponíveis', 'danger');
        return;
    }

    // Validar método de pagamento
    if (!validarPagamento(dados.metodoPagamento)) {
        return;
    }

    // Simular processamento de pagamento
    mostrarLoading(true);
    
    setTimeout(() => {
        mostrarLoading(false);
        
        // Processar pagamento
        const pagamentoProcessado = processarPagamento(dados.metodoPagamento);
        
        if (pagamentoProcessado) {
            // Criar reserva
            const reserva = criarReserva(dados);
            
            // Salvar reserva
            salvarReserva(reserva);
            
            // Atualizar lugares disponíveis
            viagemSelecionada.lugaresDisponiveis -= dados.lugares;
            if (viagemSelecionada.lugaresDisponiveis === 0) {
                viagemSelecionada.status = 'Esgotado';
            }
            
            // Mostrar confirmação
            mostrarConfirmacaoReserva(reserva);
            
            // Fechar modal
            fecharModal();
        } else {
            mostrarNotificacao('Pagamento não processado. Tente novamente.', 'danger');
        }
    }, 3000);
}

function validarPagamento(metodo) {
    switch (metodo) {
        case 'cartao':
            const numeroCartao = document.getElementById('numero-cartao').value.replace(/\s/g, '');
            const cvv = document.getElementById('cvv').value;
            const validade = document.getElementById('validade').value;
            const titular = document.getElementById('titular').value;
            
            if (!numeroCartao || numeroCartao.length < 16) {
                mostrarNotificacao('Número do cartão inválido', 'warning');
                return false;
            }
            if (!cvv || cvv.length < 3) {
                mostrarNotificacao('CVV inválido', 'warning');
                return false;
            }
            if (!validade || validade.length < 5) {
                mostrarNotificacao('Data de validade inválida', 'warning');
                return false;
            }
            if (!titular) {
                mostrarNotificacao('Nome do titular é obrigatório', 'warning');
                return false;
            }
            break;
            
        case 'mobile-money':
            const numeroMobile = document.getElementById('numero-mobile').value;
            const operadora = document.getElementById('operadora').value;
            
            if (!numeroMobile) {
                mostrarNotificacao('Número de telefone é obrigatório', 'warning');
                return false;
            }
            if (!operadora) {
                mostrarNotificacao('Selecione a operadora', 'warning');
                return false;
            }
            break;
    }
    
    return true;
}

function processarPagamento(metodo) {
    // Simular processamento de pagamento
    // Em um sistema real, aqui seria feita a integração com gateway de pagamento
    
    switch (metodo) {
        case 'cartao':
            // Simular validação de cartão
            return Math.random() > 0.1; // 90% de sucesso
            
        case 'transferencia':
            // Transferência sempre "processada" (aguarda confirmação)
            return true;
            
        case 'mobile-money':
            // Simular processamento mobile money
            return Math.random() > 0.05; // 95% de sucesso
            
        default:
            return false;
    }
}

function criarReserva(dados) {
    const subtotal = viagemSelecionada.preco * dados.lugares;
    const taxaServico = subtotal * 0.05;
    const total = subtotal + taxaServico;
    
    return {
        id: 'R' + Date.now(),
        codigo: 'REF' + Date.now().toString().substring(8),
        passageiro: {
            nome: dados.nome,
            bi: dados.bi,
            telefone: dados.telefone,
            email: dados.email
        },
        viagem: viagemSelecionada,
        numeroLugares: dados.lugares,
        valorTotal: total,
        metodoPagamento: dados.metodoPagamento,
        status: 'Confirmada',
        dataReserva: new Date().toISOString()
    };
}

function mostrarConfirmacaoReserva(reserva) {
    const confirmacao = `
        <div class="confirmacao-reserva">
            <div class="confirmacao-header">
                <i class="fas fa-check-circle"></i>
                <h3>Reserva Confirmada!</h3>
            </div>
            <div class="confirmacao-detalhes">
                <p><strong>Código da Reserva:</strong> ${reserva.codigo}</p>
                <p><strong>Passageiro:</strong> ${reserva.passageiro.nome}</p>
                <p><strong>Viagem:</strong> ${reserva.viagem.origem} → ${reserva.viagem.destino}</p>
                <p><strong>Data:</strong> ${formatarData(reserva.viagem.dataHoraPartida)}</p>
                <p><strong>Lugares:</strong> ${reserva.numeroLugares}</p>
                <p><strong>Total Pago:</strong> ${formatarMoeda(reserva.valorTotal)}</p>
                <p><strong>Método:</strong> ${getNomeMetodoPagamento(reserva.metodoPagamento)}</p>
            </div>
            <div class="confirmacao-acoes">
                <button class="btn btn-primary" onclick="imprimirTicket('${reserva.id}')">
                    <i class="fas fa-print"></i> Imprimir Ticket
                </button>
                <button class="btn btn-secondary" onclick="enviarPorEmail('${reserva.id}')">
                    <i class="fas fa-envelope"></i> Enviar por Email
                </button>
            </div>
        </div>
    `;
    
    // Criar modal de confirmação
    const modalConfirmacao = document.createElement('div');
    modalConfirmacao.className = 'modal';
    modalConfirmacao.style.display = 'block';
    modalConfirmacao.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Confirmação de Reserva</h3>
                <span class="close" onclick="fecharConfirmacao()">&times;</span>
            </div>
            <div class="modal-body">
                ${confirmacao}
            </div>
        </div>
    `;
    
    document.body.appendChild(modalConfirmacao);
    document.body.style.overflow = 'hidden';
}

function getNomeMetodoPagamento(metodo) {
    const metodos = {
        'cartao': 'Cartão de Crédito/Débito',
        'transferencia': 'Transferência Bancária',
        'mobile-money': 'Mobile Money'
    };
    return metodos[metodo] || metodo;
}

function fecharConfirmacao() {
    const modal = document.querySelector('.modal:last-of-type');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function imprimirTicket(reservaId) {
    // Simular impressão de ticket
    mostrarNotificacao('Ticket enviado para impressão', 'success');
}

function enviarPorEmail(reservaId) {
    // Simular envio por email
    mostrarNotificacao('Confirmação enviada por email', 'success');
}

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .confirmacao-reserva {
        text-align: center;
        padding: 2rem;
    }
    
    .confirmacao-header {
        margin-bottom: 2rem;
    }
    
    .confirmacao-header i {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 1rem;
    }
    
    .confirmacao-header h3 {
        color: #333;
        margin: 0;
    }
    
    .confirmacao-detalhes {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        text-align: left;
    }
    
    .confirmacao-detalhes p {
        margin: 0.5rem 0;
        color: #666;
    }
    
    .confirmacao-acoes {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
`;
document.head.appendChild(style);
