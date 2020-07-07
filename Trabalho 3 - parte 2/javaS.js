function verificaCampos(){      //feito
    

    var inpNom = document.getElementById("nome");
    var inCid = document.getElementById("cidade");
    var inIda = document.getElementById("idade");
    var inVot = document.getElementById("votos");
    if (!inpNom.checkValidity()) {
     alert(inpNom.validationMessage);
    }
    else if (!inCid.checkValidity()) {
        alert(inCid.validationMessage);
    }
    else if(!inIda.checkValidity()){
        alert(inIda.validationMessage);
    }else if(!inVot.checkValidity()){
        alert(inVot.validationMessage);
    }else{
        verOQueFaz();
    }
}


function mostrarDadosDoEmpregado(guaxinims) {       //feito
    var identificador = guaxinims.id;
    var nome = guaxinims.nome;
    var cidade = guaxinims.cidade;
    var idade = guaxinims.idade;
    var votos = guaxinims.votos;

    var table = document.getElementById("tabela");

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.innerHTML = identificador;
    tr.appendChild(td);

    tn = document.createElement('tn');
    tn.innerHTML = nome;
    tr.appendChild(tn);

    tc = document.createElement('tc');
    tc.innerHTML = cidade;
    tr.appendChild(tc);

    ti = document.createElement('ti');
    ti.innerHTML = idade;
    tr.appendChild(ti);

    tv = document.createElement('tv');
    tv.innerHTML = votos;
    tr.appendChild(tv);

    var id = identificador;
    tp = document.createElement('tp');
    tp.innerHTML =
    '<a href="#" onclick="editar(\'' + id + '\')">Editar</a> ' +
    '<a href="#" onclick="excluir(\'' + id + '\')">Excluir</a>';
    tr.appendChild(tp);

    table.appendChild(tr);
}
function verOQueFaz(){      //feito
    
     if( document.getElementById("botao").innerHTML == "Editar")
     {        
        var xhttp = new XMLHttpRequest();       
        xhttp.open('PUT', 'https://private-071734-juliobrych.apiary-mock.com/guaxinim/'+document.getElementById("idAtual").innerHTML, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
       

        var guaximinEditado = {
            nome : document.getElementById("nome").value,
            cidade :  document.getElementById("cidade").value,
            idade: document.getElementById("idade").value,
            votos: document.getElementById("votos").value
        };
        
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
             
                if (this.status == 200) {
                    // sucesso na requisicao
                    var retorno = JSON.parse(this.responseText);
                    var empregado = retorno.dados;
                    alert('Empregado ' + empregado.name + " atualizado com sucesso");
                    document.getElementById("botao").value = "Salvar";
                    document.getElementById("titulo").innerHTML = "Adicionando novo empregado";
                    document.getElementById("idAtual").innerHTML = "";      
                } else {
                    //erro na requisicao
                    alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
                }
            }
          
        };
         var formatoJson = JSON.stringify(guaximinEditado);
         xhttp.send(formatoJson);
         atualiza();
     }
     else
     {
         enviar();
     }
}

function editar(id) {       //feito
    
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://private-071734-juliobrych.apiary-mock.com/guaxinim/'+id, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
    
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                document.getElementById("botao").textContent = "Editar";
                document.getElementById("titulo").innerHTML = "Editando dados do Empregado:";
                document.getElementById("idAtual").innerHTML = retorno.id;
               poeNoForm(retorno);                
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
      
    };
}
function poeNoForm(retorno)     //feito
{   
    document.getElementById("nome").value = retorno.nome;
    document.getElementById("cidade").value = retorno.cidade;
    document.getElementById("idade").value = retorno.idade;
    document.getElementById("votos").value  = retorno.votos;
}


function excluir(id) {      //feito
    debugger
    if (confirm("Deseja realmente apagar este empregado?")) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', 'https://private-071734-juliobrych.apiary-mock.com/guaxinim/'+id, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var retorno = JSON.parse(this.responseText);
                    alert("Matarão o "+retorno.nome+"!")
                    location.reload();
                }
            }
        };
    }
}



//listando dados
function atualiza(){        //feito

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        var table = document.getElementById("tabela");
        var elemento = document.getElementsByName("tr")
        if(elemento.length != 0){
            table.removeChild(elemento);
        }
        
        if (this.readyState == 4) {
           
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var Array = retorno.dados;
                for (var i = 0; i < Array.length; i++) {
                    var guaxinim = Array[i];
                    mostrarDadosDoEmpregado(guaxinim);
                    
                }
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
      
    };
    xhttp.open('GET', 'https://private-071734-juliobrych.apiary-mock.com/guaxinim', true);
    xhttp.send();
    
}


//enviando dados { "nome": "test", "cidade": "123", "idade": "23" }
function enviar() {     //ta funcionando
    debugger
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://private-071734-juliobrych.apiary-mock.com/guaxinim', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    
    //objeto fixo de exemplo - no trabalho tem que obter os dados do formulário
    var novoEmpregado = {
        nome : document.getElementById("nome").value,
        cidade :  document.getElementById("cidade").value,
        idade : document.getElementById("idade").value,
        votos: document.getElementById("votos").value
    };
   
    
    
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
           
            if (this.status == 200) {
               
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.nome;
                alert("O empregado " + nome + " foi cadastrado com sucesso!");
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
        
    }
   
    var formatoJson = JSON.stringify(novoEmpregado);
    xhttp.send(formatoJson);
}