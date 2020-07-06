function verificaCampos(){


    var inpNom = document.getElementById("nome");
    var inSal = document.getElementById("Cidade");
    var inIda = document.getElementById("idade");
    if (!inpNom.checkValidity()) {
     alert(inpNom.validationMessage);
    }
    else if (!inSal.checkValidity()) {
        alert(inSal.validationMessage);
    }
    else if(!inIda.checkValidity()){
        alert(inIda.validationMessage);
    }
    else{
        verOQueFaz();
    }
}


function mostrarDadosDoEmpregado(guaxinims) {
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
function verOQueFaz(){
     if( document.getElementById("botao").innerHTML == "Editar")
     {        
        var xhttp = new XMLHttpRequest();       
        xhttp.open('PUT', '	https://private-071734-juliobrych.apiary-mock.com/guaxinim/'+document.getElementById("idAtual").innerHTML, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
       

        var empregadoEditado = {
            name : document.getElementById("nome").value,
            salary :  document.getElementById("salario").value,
            age: document.getElementById("idade").value,
            profile_image: document.getElementById("perfil").value
        };
        
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
             
                if (this.status == 200) {
                    // sucesso na requisicao
                    var retorno = JSON.parse(this.responseText);
                    var empregado = retorno.data;
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
         var formatoJson = JSON.stringify(empregadoEditado);
         xhttp.send(formatoJson);
         atualiza();
     }
     else
     {
         enviar();
     }
}

function editar(id) {

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '	https://private-071734-juliobrych.apiary-mock.com/guaxinim/'+id, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
    
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var empregado = retorno.data;
                document.getElementById("botao").textContent = "Editar";
                document.getElementById("titulo").innerHTML = "Editando dados do Empregado:";
                document.getElementById("idAtual").innerHTML = empregado.id;
               poeNoForm(empregado);                
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
      
    };
}
function poeNoForm(empregado)
{   
    document.getElementById("nome").value = empregado.nome;
    document.getElementById("Cidade").value = empregado.cidade;
    document.getElementById("idade").value = empregado.idade;
    document.getElementById("votos").value  = empregado.votos;
}
function excluir(id) {
    if (confirm("Deseja realmente apagar este empregado?")) {
        str1 = 'http://rest-api-employees.jmborges.site/api/v1/delete/';
        str = str1 + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', str, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    location.reload();
                }
            }
        };
    }
}



//listando dados
function atualiza(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        var table = document.getElementById("tabela");
        var elemento = document.getElementsByName("tr")
        if(elemento.length != 0){
            table.removeChild(elemento);
        }
        
        if (this.readyState == 4) {
           
            if (this.status == 200) {
                debugger
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


//enviando dados { "name": "test", "salary": "123", "age": "23" }
function enviar() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://private-071734-juliobrych.apiary-mock.com/guaxinim', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    
    //objeto fixo de exemplo - no trabalho tem que obter os dados do formulário
    var novoEmpregado = {
        name : document.getElementById("nome").value,
        salary :  document.getElementById("salario").value,
        age:document.getElementById("idade").value,
        profile_image: document.getElementById("perfil").value
    };
   
    
    
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
           
            if (this.status == 200) {
               
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.data.name;
                alert("O empregado " + nome + " foi cadastrado com sucesso!");
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
        
    }
   
    var formatoJson = JSON.stringify(novoEmpregado);
    xhttp.send(formatoJson);
    alert("bruxaria");// NAO APAGAR ESSA MERDA
}