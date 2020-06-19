function verificaCampos(){


    var inpNom = document.getElementById("nome");
    var inSal = document.getElementById("salario");
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


function mostrarDadosDoEmpregado(empregado) {
    var identificador = empregado.id;
    var nome = empregado.employee_name;
    var salario = empregado.employee_salary;
    var idade = empregado.employee_age;
    var avatar = empregado.profile_image;

    var table = document.getElementById("tabela");

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.innerHTML = identificador;
    tr.appendChild(td);

    tn = document.createElement('tn');
    tn.innerHTML = nome;
    tr.appendChild(tn);

    ts = document.createElement('ts');
    ts.innerHTML = salario;
    tr.appendChild(ts);

    ti = document.createElement('ti');
    ti.innerHTML = idade;
    tr.appendChild(ti);

    var imagem = avatar;
    ta = document.createElement('ta');
    var teste = '<img src="' + imagem + '" alt="imagem" width="113px" height="150px"></img>'
    ta.innerHTML =
        teste
    tr.appendChild(ta);

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
        xhttp.open('PUT', '	http://rest-api-employees.jmborges.site/api/v1/update/'+document.getElementById("idAtual").innerHTML, true);
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
         alert('bruxaria2');// NAO APAGAR ESSA MERDA
     }
     else
     {
         enviar();
     }
}

function editar(id) {

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '	http://rest-api-employees.jmborges.site/api/v1/employee/'+id, true);
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
    document.getElementById("nome").value = empregado.employee_name;
    document.getElementById("salario").value = empregado.employee_salary;
    document.getElementById("idade").value = empregado.employee_age;
    document.getElementById("perfil").value  = empregado.profile_image;
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
    
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var empregados = retorno.data; //array de empregados
                for (var i = 0; i < empregados.length; i++) {
                    var empregado = empregados[i];
                    mostrarDadosDoEmpregado(empregado);
                }
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
      
    };
    xhttp.open('GET', 'http://rest-api-employees.jmborges.site/api/v1/employees', true);
    xhttp.send();
    
}


//enviando dados { "name": "test", "salary": "123", "age": "23" }
function enviar() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://rest-api-employees.jmborges.site/api/v1/create', true);
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