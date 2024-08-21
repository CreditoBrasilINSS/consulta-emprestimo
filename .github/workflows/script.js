// Carrega os dados dos clientes do arquivo JSON
async function carregarDados() {
    const response = await fetch('dados.json');
    const dados = await response.json();
    return dados;
}

// Consulta o cliente pelo CPF
async function consultar() {
    const cpf = document.getElementById('cpfConsulta').value;
    const dados = await carregarDados();

    const cliente = dados.find(item => item.cpf === cpf);
    if (cliente) {
        const hoje = new Date();
        const dataValor = new Date(cliente.dataValorDisponivel);
        const tempoRestante = Math.ceil((dataValor - hoje) / (1000 * 60 * 60 * 24));

        document.getElementById('resultadoConsulta').innerHTML = `
            <p>Nome: ${cliente.nome}</p>
            <p>Data de Solicitação: ${cliente.dataSolicitacao}</p>
            <p>Tempo Restante para Recebimento: ${tempoRestante} dias</p>
        `;
    } else {
        document.getElementById('resultadoConsulta').innerHTML = `<p>CPF não encontrado.</p>`;
    }
}

// Pesquisa cliente por CPF ou Nome
async function pesquisar() {
    const termoPesquisa = document.getElementById('pesquisaCliente').value.toLowerCase();
    const dados = await carregarDados();

    const resultados = dados.filter(item => 
        item.cpf.toLowerCase().includes(termoPesquisa) || 
        item.nome.toLowerCase().includes(termoPesquisa)
    );

    if (resultados.length > 0) {
        const listaResultados = resultados.map(cliente => `
            <p>Nome: ${cliente.nome}, CPF: ${cliente.cpf}</p>
        `).join('');
        document.getElementById('resultadoPesquisa').innerHTML = listaResultados;
    } else {
        document.getElementById('resultadoPesquisa').innerHTML = `<p>Nenhum cliente encontrado.</p>`;
    }
}
