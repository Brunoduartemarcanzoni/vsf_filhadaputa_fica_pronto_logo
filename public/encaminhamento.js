async function cadastrarencaminhamento(event) {
    event.preventDefault();

    const encaminhamento= {
        turma : document.getElementById('filtroTurma').value,
        destino: document.getElementById('destino'),
        prazo: document.getElementById('prazoResposta').value,
        tipo_fo:document.getElementById('filtroTipo').value,
        prioridade: document.getElementById('prioridade').value,
        justificativa: document.getElementById('justifictiva').value,
        acoes: document.getElementById('acoesSugeridas').value,
        responsavel: document.getElementById('responsavelEncaminhamento').value,
        funcionario: document.getElementById('destinatario').value,
    };
       
    try {

        const response = await fetch('/encaminhamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(encaminhamento)
        });

        const result = await response.json();
        if (response.ok) {
            alert('encaminhamento cadastrado com sucesso!');
            //document.getElementById('fo-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error('Erro na solicitação:', err);
        alert('Erro ao cadastrar cliente.');
    }
}

// Função para listar todos os encaminhamentos 
async function listarencaminhamento() {
    const  turma  = document.getElementById('filtroTurma').value.trim();
    const  destino = document.getElementById('destino').value.trim();
    const tipo_fo =document.getElementById('filtroTipo').value.trim();
    const acoes = document.getElementById('acoesSugeridas').value.trim();
    const prazo  = document.getElementById('prazoResposta').value.trim();

    let url = '/encaminhamento';  // URL padrão para todos os funcionario

    if (turma) {
        // Se turma foi digitado, adiciona o parâmetro de consulta
        url += `?turma=${turma}`;
    }

    try {
        const respo = await fetch(url);
        const encaminhamento = await respo.json();

        const tabela = document.getElementById('tabela-encaminhamento');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (!Array.isArray(encaminhamento) || encaminhamento.length === 0) {
            // Caso não encontre encaminhamento, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum encaminhamento encontrado.</td></tr>';
        } else {
            encaminhamento.forEach(encaminhamentoItem => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${encaminhamentoItem.nome}</td>
                    <td>${encaminhamentoItem.cgm}</td>
                    <td>${encaminhamentoItem.email}</td>
                    <td>${encaminhamentoItem.telefone}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar encaminhamento:', error);
    }
}

// Função para atualizar as informações do encaminhamento
async function atualizarencaminhamento() {
    const  turma  = document.getElementById('filtroTurma').value.trim();
    const  destino = document.getElementById('destino').value.trim();
    const tipo_fato =document.getElementById('filtroTipo').value.trim();
    const acoes = document.getElementById('acoesSugeridas').value.trim();
    const prazo  = document.getElementById('prazoResposta').value.trim();
    const justificativa = document.getElementById('justificativa').value.trim();

    const encaminhamentoAtualizado = {
        turma,
        destino,
        tipo_fato,
        acoes,
        prazo,
       justificativa 
          
    };

    try {
        const respo = await fetch(`/encaminhamento/turma/${turma}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(encaminhamentoAtualizado)
        });

        if (respo.ok) {
            alert('encaminhamento atualizado com sucesso!');
        } else {
            const errorMessage = await respo.text();
            alert('Erro ao atualizar encaminhamento: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar encaminhamento:', error);
        alert('Erro ao atualizar encaminhamento.');
    }
}