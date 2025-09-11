async function cadastrarfo(event) {
    event.preventDefault();

    const fo = {
        turma: document.getElementById('aluno-turma').value,
        data: document.getElementById('data').value,
        tipo_fato:document.getElementById('tipoFato').value,
        obs: document.getElementById('observacao').value,
        monitor: document.getElementById('monitor').value
    };
       
    try {
        const respo = await fetch('/fo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fo),
        });

        const result = await response.json();
        if (response.ok) {
            alert('fo cadastrado com sucesso!');
            //document.getElementById('fo-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error('Erro na solicitação:', err);
        alert('Erro ao cadastrar cliente.');
    }
}

// Função para listar todos os fo 
async function listarfo() {
    const nome = document.getElementById('func-nome').value.trim();
    const cgm= document.getElementById('func-cgm').value.trim();
    const email = document.getElementById('func-email').value.trim();
    const telefone = document.getElementById('func-telefone').value.trim();

    let url = '/fo';  // URL padrão para todos os funcionario

    if (cgm) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cgm=${cgm}`;
    }

    try {
        const respo = await fetch(url);
        const fo = await respo.json();

        const tabela = document.getElementById('tabela-fo');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (!Array.isArray(fo) || fo.length === 0) {
            // Caso não encontre funcionario, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum fo encontrado.</td></tr>';
        } else {
            fo.forEach(foItem => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${foItem.nome}</td>
                    <td>${foItem.cgm}</td>
                    <td>${foItem.email}</td>
                    <td>${foItem.telefone}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar fo:', error);
    }
}

// Função para atualizar as informações do funcionario
async function atualizarfo() {
    const nome = document.getElementById('func-nome').value;
    const cgm= document.getElementById('func-cgm').value;
    const email = document.getElementById('func-email').value;
    const telefone = document.getElementById('func-telefone').value;

    const foAtualizado = {
        nome,
        cgm,
        email,
        telefone,
    };

    try {
        const respo = await fetch(`/fo/cgm/${cgm}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foAtualizado)
        });

        if (respo.ok) {
            alert('fo atualizado com sucesso!');
        } else {
            const errorMessage = await respo.text();
            alert('Erro ao atualizar fo: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar fo:', error);
        alert('Erro ao atualizar fo.');
    }
}