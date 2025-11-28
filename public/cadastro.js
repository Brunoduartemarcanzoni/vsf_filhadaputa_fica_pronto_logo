async function cadastrarfuncionario(event) {
    event.preventDefault();

    const funcionario = {
        nome: document.getElementById("func-nome").value,
        data_de_nascimento: document.getElementById("func-data-nascimento").value,
        cpf: document.getElementById("func-cpf").value,
        rg: document.getElementById("func-rg").value,
        genero: document.getElementById("func-genero").value,
        estado_civil: document.getElementById("func-estado-civil").value,
        email: document.getElementById("func-email").value,
        email_institucional: document.getElementById("func-email-institucional").value,
        telefone: document.getElementById("func-telefone").value,
        telefone_alternativo: document.getElementById("func-telefone-alternativo").value,
        cep: document.getElementById("func-cep").value,
        logradouro: document.getElementById("func-logradouro").value,
        numero: document.getElementById("func-numero").value,
        complemento: document.getElementById("func-complemento").value,
        bairro: document.getElementById("func-bairro").value,
        cidade: document.getElementById("func-cidade").value,
        estado: document.getElementById("func-estado").value,
        data_adimissão: document.getElementById("func-data-admissao").value,
        cargo: document.getElementById("func-cargo").value,
        carga_horaria: document.getElementById("func-carga-horaria").value,
        contrato: document.getElementById("func-tipo-contrato").value,
    };

    try {
        const response = await fetch("/funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(funcionario),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Funcionario cadastrado com sucesso!");
            //document.getElementById('funcionario-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar funcionario.");
    }
}

// Função para listar todos os funcionario ou buscar funcionario por CPF
async function listarfuncionario() {
    const cpf = document.getElementById("func-cpf").value.trim();
    let url = "/funcionario";

    if (cpf) {
        url += `?cpf=${cpf}`;
    }

    try {
        const respo = await fetch(url);
        if (!respo.ok) throw new Error(`Erro HTTP: ${respo.status}`);
        const funcionario = await respo.json();

        const tabela = document.getElementById("tabela-funcionario");
        tabela.innerHTML = "";

        if (!Array.isArray(funcionario) || funcionario.length === 0) {
            tabela.innerHTML =
                '<tr><td colspan="6">Nenhum funcionario encontrado.</td></tr>';
        } else {
            funcionario.forEach((item) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.cpf}</td>
                    <td>${item.email}</td>
                    <td>${item.cargo}</td>
                    <td>${item.telefone}</td>
                    <td>${item.data_adimissão}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao listar funcionario:", error);
    }
}

async function atualizarfuncionario() {
    const nome = document.getElementById("func-nome").value;
    const cep = document.getElementById("func-cep").value;
    const numero = document.getElementById("func-numero").value;
    const complemento = document.getElementById("func-complemento").value;
    const bairro = document.getElementById("func-bairro").value;
    const cidade = document.getElementById("func-cidade").value;
    const estado = document.getElementById("func-estado").value;
    const email = document.getElementById("func-email").value;
    const telefone = document.getElementById("func-telefone").value;

    if (!nome) {
        alert("Informe o nome do funcionário para atualizar.");
        return;
    }

    const funcionarioAtualizado = {
        nome,
        cep,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        email,
        telefone,
    };

    try {
        const respo = await fetch(`/funcionario/nome/${nome}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcionarioAtualizado),
        });

        if (respo.ok) {
            alert("Funcionário atualizado com sucesso!");
        } else {
            const errorMessage = await respo.text();
            alert("Erro ao atualizar funcionario: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao atualizar funcionario:", error);
        alert("Erro ao atualizar funcionario.");
    }
}

// ======================= FUNÇÕES PARA ALUNO =======================

async function cadastrarAluno(event) {
    event.preventDefault();

    const responsavel = document.querySelector('.responsavel-item');
    const aluno = {
        nome: document.getElementById("aluno-nome").value,
        data_de_nascimento: document.getElementById("aluno-data-nascimento").value,
        cpf: document.getElementById("aluno-cpf").value,
        rg: document.getElementById("aluno-rg").value,
        genero: document.getElementById("aluno-genero").value,
        email: document.getElementById("aluno-email").value,
        telefone: document.getElementById("aluno-telefone").value,
        cep: document.getElementById("aluno-cep").value,
        logradouro: document.getElementById("aluno-logradouro").value,
        numero: document.getElementById("aluno-numero").value,
        complemento: document.getElementById("aluno-complemento").value,
        bairro: document.getElementById("aluno-bairro").value,
        cidade: document.getElementById("aluno-cidade").value,
        estado: document.getElementById("aluno-estado").value,
        cgm: document.getElementById("aluno-matricula").value,
        curso: document.getElementById("aluno-curso").value,
        turma: document.getElementById("aluno-turma").value,
        turno: document.getElementById("aluno-turno").value,
        nome_responsavel: responsavel ? responsavel.querySelector('input[name*="nome"]').value : '',
        parentesco_responsavel: responsavel ? responsavel.querySelector('select[name*="parentesco"]').value : '',
        cpf_responsavel: responsavel ? responsavel.querySelector('input[name*="cpf"]').value : '',
        telefone_responsavel: responsavel ? responsavel.querySelector('input[name*="telefone"]').value : '',
        email_responsavel: responsavel ? responsavel.querySelector('input[name*="email"]').value : '',
    };

    try {
        const response = await fetch("/aluno", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(aluno),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Aluno cadastrado com sucesso!");
            document.getElementById('form-aluno').reset();
            listarAlunos();
        } else {
            alert(`Erro: ${result.error}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar aluno.");
    }
}

async function listarAlunos() {
    const cgm = document.getElementById("aluno-matricula").value.trim();
    let url = "/alunos";

    if (cgm) {
        url += `?cgm=${cgm}`;
    }

    try {
        const respo = await fetch(url);
        if (!respo.ok) throw new Error(`Erro HTTP: ${respo.status}`);
        const alunos = await respo.json();

        const tabela = document.getElementById("tabela-aluno");
        tabela.innerHTML = "";

        if (!Array.isArray(alunos) || alunos.length === 0) {
            tabela.innerHTML = '<tr><td colspan="6">Nenhum aluno encontrado.</td></tr>';
        } else {
            alunos.forEach((item) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.cgm || '-'}</td>
                    <td>${item.cpf}</td>
                    <td>${item.email}</td>
                    <td>${item.turma}</td>
                    <td>${item.telefone_responsavel}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao listar alunos:", error);
    }
}

function cancelarCadastro(tipo) {
    if (tipo === 'aluno') {
        document.getElementById('form-aluno').reset();
    } else if (tipo === 'funcionario') {
        document.getElementById('form-funcionario').reset();
    }
}

function adicionarResponsavel() {
    const container = document.getElementById('responsaveis-container');
    const index = container.children.length;
    
    const novoResponsavel = document.createElement('div');
    novoResponsavel.className = 'responsavel-item';
    novoResponsavel.setAttribute('data-index', index);
    novoResponsavel.innerHTML = `
        <div class="responsavel-hea">
            <h4>Responsável ${index + 1}</h4>
            <button type="button" class="btn-remove-responsavel" onclick="removerResponsavel(this)">Remover</button>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="required" for="resp${index}-nome">Nome Completo</label>
                <input type="text" id="resp${index}-nome" name="responsavel[${index}][nome]" required>
            </div>
            <div class="form-group">
                <label class="required" for="resp${index}-parentesco">Grau de Parentesco</label>
                <select id="resp${index}-parentesco" name="responsavel[${index}][parentesco]" required>
                    <option value="">Selecione</option>
                    <option value="pai">Pai</option>
                    <option value="mae">Mãe</option>
                    <option value="avo">Avô/Avó</option>
                    <option value="tio">Tio/Tia</option>
                    <option value="irmao">Irmão/Irmã</option>
                    <option value="tutor">Tutor Legal</option>
                    <option value="outro">Outro</option>
                </select>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="required" for="resp${index}-cpf">CPF</label>
                <input type="text" id="resp${index}-cpf" name="responsavel[${index}][cpf]" placeholder="000.000.000-00" maxlength="14" oninput="aplicarMascaraCPF(event)" required>
            </div>
            <div class="form-group">
                <label class="required" for="resp${index}-telefone">Telefone</label>
                <input type="text" id="resp${index}-telefone" name="responsavel[${index}][telefone]" placeholder="(00) 00000-0000" maxlength="15" oninput="aplicarMascaraTelefone(event)" required>
            </div>
        </div>
        
        <div class="form-group">
            <label class="required" for="resp${index}-email">E-mail</label>
            <input type="email" id="resp${index}-email" name="responsavel[${index}][email]" required>
        </div>
    `;
    
    container.appendChild(novoResponsavel);
}

function removerResponsavel(button) {
    button.closest('.responsavel-item').remove();
}

// ======================= MÁSCARA DE ENTRADA =======================

function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{2})$/, '$1-$2');
    return valor;
}

function formatarRG(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 9) valor = valor.slice(0, 9);
    valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1})$/, '$1-$2');
    return valor;
}

function formatarTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    return valor;
}

function aplicarMascaraCPF(event) {
    event.target.value = formatarCPF(event.target.value);
}

function aplicarMascaraRG(event) {
    event.target.value = formatarRG(event.target.value);
}

function aplicarMascaraTelefone(event) {
    event.target.value = formatarTelefone(event.target.value);
}

// ======================= BUSCA DE CEP =======================

async function buscarCEPAluno(event) {
    const cep = event.target.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado");
            return;
        }

        document.getElementById("aluno-logradouro").value = data.logradouro || '';
        document.getElementById("aluno-bairro").value = data.bairro || '';
        document.getElementById("aluno-cidade").value = data.localidade || '';
        document.getElementById("aluno-estado").value = data.uf || '';
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
    }
}

async function buscarCEPFuncionario(event) {
    const cep = event.target.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado");
            return;
        }

        document.getElementById("func-logradouro").value = data.logradouro || '';
        document.getElementById("func-bairro").value = data.bairro || '';
        document.getElementById("func-cidade").value = data.localidade || '';
        document.getElementById("func-estado").value = data.uf || '';
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
    }
}
