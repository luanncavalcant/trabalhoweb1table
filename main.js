const KEY_BD = '@empresastrabalho'

let listaEmpresas = {
    ultimoCod : 0,
    empresas :[]
}

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaEmpresas));
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaEmpresas = JSON.parse(data);
    }
    desenhar();
}


function desenhar(){
    debugger;
    const tbody = document.getElementById("listaEmpresasBody")
    if(tbody){
        tbody.innerHTML = listaEmpresas.empresas
        .sort((a, b) => {
            return a.nomeEmpresa < b.nomeEmpresa ? -1: 1
           
        })
        .map(empresas =>{

            return `<tr>
                        <td>${empresas.id}</td>
                        <td>${empresas.nomeEmpresa}</td>
                        <td>${empresas.servico}</td>
                        <td>${empresas.contato}</td>
                        <td>${empresas.email}</td>
                        <td>${empresas.local}</td>
                        <td>
                            <button onclick='vizualizar("cadastro", false ,${empresas.id})'>Editar</button>
                            <button class="vermelho" onclick="perguntaExcluir(${empresas.id})">Excluir</button>
                        </td>
                    <tr/>`
        }) .join('')
    }
}
function salvar(nomeEmpresa ,servico,contato,email,local){
    const id = listaEmpresas.ultimoCod + 1;
    listaEmpresas.ultimoCod =  id;
    listaEmpresas.empresas.push({
        id, nomeEmpresa, servico, contato, email, local
    })
    gravarBD();
    desenhar();
    vizualizar("lista");
}

function editar(id, nomeEmpresa, servico, contato, email, local){
    let empresa = listaEmpresas.empresas.find(empresa => empresa.id == id)
    empresa.nomeEmpresa = nomeEmpresa
    empresa.servico = servico
    empresa.contato = contato
    empresa.email = email
    empresa.local = local
    gravarBD();
    desenhar();
    vizualizar("lista");
}

function deletar(id){
    listaEmpresas.empresas = listaEmpresas.empresas.filter(empresa => {
        return empresa.id != id
    })
    desenhar();
    gravarBD();

}

function perguntaExcluir(id){
    if(confirm('Que deletar esse resgistro?')){
        deletar(id);
        desenhar();
    }

}

function limparEdicao(){
    document.getElementById("nomeEmpresa").value = ''
    document.getElementById("servico").value= ''
    document.getElementById("contato").value= ''
    document.getElementById("email").value= ''
    document.getElementById("local").value= ''
}

function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page', pagina)
    if (pagina = 'cadastro'){
        if(novo) limparEdicao();
        if(id){
            const empresa =listaEmpresas.empresas.find(empresa => empresa.id == id)
            if(empresa){
                document.getElementById("id").value = empresa.id
                document.getElementById("nomeEmpresa").value = empresa.nomeEmpresa
                document.getElementById("servico").value= empresa.servico
                document.getElementById("contato").value= empresa.contato
                document.getElementById("email").value= empresa.email
                document.getElementById("local").value= empresa.local
            }
        }
        document.getElementById("nomeEmpresa").focus();
    }
}

function submeter(e){
    e.preventDefault()
    const data = {
        id:document.getElementById("id").value,
        nomeEmpresa:document.getElementById("nomeEmpresa").value,
        servico:document.getElementById("servico").value,
        contato:document.getElementById("contato").value,
        email:document.getElementById("email").value,
        local:document.getElementById("local").value,
    }
    if (data.id){
        editar(data.id, data.nomeEmpresa, data.servico, data.contato, data.email, data.local)
    }else{
        salvar(data.nomeEmpresa, data.servico, data.contato, data.email, data.local)
    }
}

window.addEventListener('load', () =>{
    lerBD();
    document.getElementById("cadastroRegistros").addEventListener('submit', submeter)
})