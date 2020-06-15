function mostrarDadosDoEmpregado(empregado) {
    var identificador = empregado.id;
    var nome = empregado.employee_name;
    var salario = empregado.employee_salary;
    var idade = empregado.employee_age;
    var avatar = empregado.profile_image;
 
    var table = document.getElementById("tabelaempregados");
 
    var tr = document.createElement('tr');
 
    var td = document.createElement('td');
    td.innerHTML = identificador;
    tr.appendChild(td);
 
    td = document.createElement('td');
    td.innerHTML = nome;
    tr.appendChild(td);
 
    td = document.createElement('td');
    td.innerHTML = salario;
    tr.appendChild(td);
 
    td = document.createElement('td');
    td.innerHTML = idade;
    tr.appendChild(td);
 
    td = document.createElement('td');
    td.innerHTML = avatar;
    tr.appendChild(td);
 
    var id = parseInt(Math.random() * 100);
    td = document.createElement('td');
    td.innerHTML =
        '<a href="#" onclick="editar(' + id + ')">Editar</a> ' +
        '<a href="#" onclick="excluir(' + id + ')">Excluir</a>';
    tr.appendChild(td);
 
    table.appendChild(tr);
}
 
function editar(id) {
    alert('editando o empregado ' + id);
}
 
function excluir(id) {
    alert('excluindo o empregado ' + id);
}


 
//console.log("Empregado: Nome:" + nome + ", Salário:" + salario + ", Idade: " + idade);
 
// console.log(nome + ", " + salario + ", " + idade + ", , [editar]() [excluir]()");
 
//listando dados
 
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
 
//enviando dados { "name": "test", "salary": "123", "age": "23" }
function enviar() {
    var xhttp = new XMLHttpRequest();
 
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                debugger;
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
 
    xhttp.open('POST', 'http://rest-api-employees.jmborges.site/api/v1/create', true);
 
    //objeto fixo de exemplo - no trabalho tem que obter os dados do formulário
    var novoEmpregado = {
        name: "test",
        salary: "123",
        age: "23"
    };
    var formatoJson = JSON.stringify(novoEmpregado);
    xhttp.send(formatoJson);
}