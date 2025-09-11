async function cadastrarfreq(event) {
    event.preventDefault();

    const frequencia= {
        turma : document.getElementById('filtroTurma').value,
        ausencias: document.getElementById('ausencias'),
        presencas: document.getElementById('prazoResposta').value,
        total_aulas: document.getElementById('prioridade').value,
        data_aula: document.getElementById('date').value,
        aluno_nome: document.getElementById('prioridade').value,
        justificativa: document.getElementById('justifictiva').value,
        cgm: document.getElementById('acoesSugeridas').value,
        responsavel: document.getElementById('responsavelfrequencia').value,
        porcentagem: document.getElementById('content3').value,
    };
       
    try {

        const response = await fetch('/frequencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(frequencia)
        });

        const result = await response.json();
        if (response.ok) {
            alert('frequencia cadastrado com sucesso!');
            //document.getElementById('fo-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error('Erro na solicitação:', err);
        alert('Erro ao cadastrar cliente.');
    }
}

// Função para listar todos os frequencias 
async function listarfrequencia() {
        const turma = document.getElementById('filtroTurma').value.trim();
        const ausencias = document.getElementById('ausencias').value.trim();
        const presencas = document.getElementById('prazoResposta').value.trim();
        const justificativa = document.getElementById('justificativa').value.trim();
        const aluno_nome = document.getElementById('prioridade').value.trim(); 

    let url = '/frequencia';  // URL padrão para todos os funcionario

    if (aluno_nome) {
        // Se turma foi digitado, adiciona o parâmetro de consulta
        url += `?aluno_nome=${aluno_nome}`;
    }

    try {
        const respo = await fetch(url);
        const frequencia = await respo.json();

        const tabela = document.getElementById('tabela-frequencia');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (!Array.isArray(frequencia) || frequencia.length === 0) {
            // Caso não encontre frequencia, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum frequencia encontrado.</td></tr>';
        } else {
            frequencia.forEach(frequenciaItem => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${frequenciaItem.turma}</td>
                    <td>${frequenciaItem.justificativa}</td>
                    <td>${frequenciaItem.ausencias}</td>
                    <td>${frequenciaItem.total_aulas}</td>
                    <td>${frequenciaItem.porcentagem }</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar frequencia:', error);
    }
}

// Função para atualizar as informações do frequencia
async function atualizarfrequencia() {
    const turma = document.getElementById('filtroTurma').value.trim();
    const ausencias = document.getElementById('ausencias').value.trim();
    const presencas = document.getElementById('prazoResposta').value.trim();
    const justificativa = document.getElementById('justificativa').value.trim();
    const aluno_nome = document.getElementById('prioridade').value.trim();
    const porcentagem = document.getElementById('content3').value.trim();

    const frequenciaAtualizado = {
        turma,
        aluno_nome,
        justificativa,
        ausencias,
        presencas,
        porcentagem
          
    };

    try {
        const respo = await fetch(`/frequencia/aluno_nome/${aluno_nome}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(frequenciaAtualizado)
        });

        if (respo.ok) {
            alert('frequencia atualizado com sucesso!');
        } else {
            const errorMessage = await respo.text();
            alert('Erro ao atualizar frequencia: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar frequencia:', error);
        alert('Erro ao atualizar frequencia.');
    }
}