//BUSCAR GENEROS SEM O FILTRO

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        var dado = JSON.parse(xhr.responseText);
        var conteudoHTML = '';
        for (var i = 0; i < dado.length; i++) {

            conteudoHTML += item_gen(dado[i].id, dado[i].nome);
        }

        document.getElementById('resultado').innerHTML = conteudoHTML;
    }
};

xhr.open('GET', 'php/service.php?acao=listar_generos&id_gen=0');
xhr.send();

// Template Simples para ITEM DE GÊNERO

var item_gen = function (id, nome) {

    var html = '<li class="list-group-item" id="' + id + '" style="height: 65px;"> <p>' + nome + '</p><button type="button" onclick="delete_row(this,' + id + ')" class="btn btn-danger" style="position: relative; float: right; top: -40px;">Delete</button> </li>';

    return html;

}

function enviarGen() {

    var nome = document.getElementById('nomeGen').value;
    var idGen = document.getElementById('idGen').value;

    if (nome == "" || idGen == "") {
        alert("Todos os campos devem ser preenchidos!");
    } else {
        var http = new XMLHttpRequest();
        var params = 'nome=' + nome + '&idGen=' + idGen + '';
        http.open('POST', 'php/service.php?acao=inserirGen', true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                var dado = JSON.parse(http.responseText);

                if (dado != 0) {

                    var conteudoHTML = item_gen(nome, idGen);

                    var el = document.getElementById('resultado');

                    var html = el.innerHTML;
                    html += conteudoHTML
                    el.innerHTML = html;

                } else {
                    alert('Erro ao inserir no servidor!');
                }
            }
        }
        http.send(params);

    }

}

// Deletar Gênero

function delete_row(e, id) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var dado = JSON.parse(xhr.responseText);

            if (dado == 1) {
                var aux = document.getElementById(id);
                aux.parentNode.removeChild(aux);

            } else {
                alert('Erro ao deletar do servidor!');
            }
        }
    };

    xhr.open('GET', 'php/service.php?acao=apagarGen&id=' + id);
    xhr.send();
}

