//BUSCAR jogos SEM O FILTRO

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4) {
		var dado = JSON.parse(xhr.responseText);
		var conteudoHTML = '';
		for (var i = 0; i < dado.length; i++) {

			conteudoHTML += item_jogo(dado[i].id, dado[i].nome, dado[i].valor, dado[i].imagem, dado[i].descricao);
		}

		document.getElementById('resultado').innerHTML = conteudoHTML;
	}
};

xhr.open('GET', 'service.php?acao=listar_jogos&id_cat=0');
xhr.send();

//BUSCAR generos

var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function () {
	if (xhr2.readyState === 4) {
		var dado = JSON.parse(xhr2.responseText);
		var conteudoHTML = '<option value="0">Todos</option>';
		for (var i = 0; i < dado.length; i++) {

			conteudoHTML += '<option value="' + dado[i].id + '">' + dado[i].nome + '</option>';
		}

		document.getElementById('filtro').innerHTML = conteudoHTML;
	}
};

xhr2.open('GET', 'service.php?acao=listar_generos');
xhr2.send();

//Trocar filtro

var select_element = document.getElementById('filtro');

select_element.onchange = function () {
	var elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
	var value = elem.value || elem.options[elem.selectedIndex].value;

	xhr.open('GET', 'service.php?acao=listar_jogos&id_cat=' + value);
	xhr.send();


}


//Exemplo de Template Simples para ITEM DE jogo

var item_jogo = function (id, nome, valor, imagem, descricao) {

	var html = '<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12"><div class="card" style="margin:10px;"><img src="' + imagem + '" class="card-img-top" height="150"><div class="card-body" style="height:350px;"><h5 class="card-title">' + nome + '</h5><p class="card-text">' + descricao + '</p><span class="badge badge-primary">R$ ' + valor + ',00</span><br><button type="button" onClick="delete_row(this,' + id + ');" class="btn btn-block btn-danger" style="position:absolute; bottom:0px; left:0px;">Apagar</button></div></div></div>';

	return html;

}


function delete_row(e, id) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var dado = JSON.parse(xhr.responseText);

			if (dado == 1) {
				e.parentNode.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode.parentNode);
			} else {
				alert('Erro ao deletar do servidor!');
			}
		}
	};

	xhr.open('GET', 'service.php?acao=apagar&id=' + id);
	xhr.send();
}

function enviar() {

	var nome = document.getElementById('nome').value;
	var url = document.getElementById('url').value;
	var descricao = document.getElementById('descricao').value;
	var preco = document.getElementById('preco').value;
	var genero = document.getElementById('genero').value;

	if (nome == "" || url == "" || descricao == "" || preco == "" || genero == 0) {
		alert("Todos os campos devem ser preenchidos!");
	} else {

		var http = new XMLHttpRequest();
		var params = 'nome=' + nome + '&url=' + url + '&descricao=' + descricao + '&preco=' + preco + '&genero=' + genero + '';
		http.open('POST', 'service.php?acao=inserir', true);

		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				var dado = JSON.parse(http.responseText);

				if (dado != 0) {

					var conteudoHTML = item_jogo(dado, nome, preco, url, descricao);

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


