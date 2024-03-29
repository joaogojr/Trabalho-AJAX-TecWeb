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

xhr.open('GET', 'php/service.php?acao=listar_jogos&id_gen=0');
xhr.send();

// Template Simples para ITEM DE JOGO

var item_jogo = function (id, nome, valor, imagem, descricao) {

	var html = '<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12"><div class="card" style="margin:10px;"><img src="' + imagem + '" class="card-img-top" height="150"><div class="card-body" style="height:350px;"><h5 class="card-title">' + nome + '</h5><p class="card-text">' + descricao + '</p><span class="badge badge-primary">R$ ' + valor + ',00</span><br><button type="button" onClick="delete_row(this,' + id + ');" class="btn btn-block btn-danger" style="position:absolute; bottom:0px; left:0px;">Apagar</button></div></div></div>';

	return html;
}

//BUSCAR GENEROS

var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function () {
	if (xhr2.readyState === 4) {
		var dadoGen = JSON.parse(xhr2.responseText);
		var conteudoHTML = '<option value="0">Todos</option>';

		for (var i = 0; i < dadoGen.length; i++) {
			conteudoHTML += '<option value="' + dadoGen[i].id + '">' + dadoGen[i].nome + '</option>';
		}

		document.getElementById('filtroGen').innerHTML = conteudoHTML;
	}
};
xhr2.open('GET', 'php/service.php?acao=listar_generos');
xhr2.send();

//BUSCAR PRODUTORAS

var xhr5 = new XMLHttpRequest();
xhr5.onreadystatechange = function () {
	if (xhr5.readyState === 4) {
		var dadoProd = JSON.parse(xhr5.responseText);
		var conteudoHTML = '<option value="0">Todos</option>';
		for (var i = 0; i < dadoProd.length; i++) {
			conteudoHTML += '<option value="' + dadoProd[i].id + '">' + dadoProd[i].nome + '</option>';
		}

		document.getElementById('filtroProd').innerHTML = conteudoHTML;
	}
};
xhr5.open('GET', 'php/service.php?acao=listar_produtoras');
xhr5.send();


//Trocar filtros

var select_element_gen = document.getElementById('filtroGen');

select_element_gen.onchange = function () {
	var elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
	var value = elem.value || elem.options[elem.selectedIndex].value;

	xhr.open('GET', 'php/service.php?acao=listar_jogos&id_gen=' + value);
	xhr.send();
}

var select_element_prod = document.getElementById('filtroProd');

select_element_prod.onchange = function () {
	var elem2 = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
	var value2 = elem2.value || elem2.options[elem2.selectedIndex].value;
	console.log(elem2);
	console.log(value2);

	xhr.open('GET', 'php/service.php?acao=listar_jogos&id_prod=' + value2);
	xhr.send();
}

// Exibir Generos no CRUD Jogo

var xhr3 = new XMLHttpRequest();
xhr3.onreadystatechange = function () {
	if (xhr3.readyState === 4) {
		var dado = JSON.parse(xhr3.responseText);
		var conteudoHTML = '<option value="0">Selecione um Gênero</option>';
		for (var i = 0; i < dado.length; i++) {

			conteudoHTML += '<option value="' + dado[i].id + '">' + dado[i].nome + '</option>';
		}

		document.getElementById('listarGen').innerHTML = conteudoHTML;
	}
};

xhr3.open('GET', 'php/service.php?acao=listar_generos');
xhr3.send();

// Exibir Produtoras no CRUD Jogo

var xhr4 = new XMLHttpRequest();
xhr4.onreadystatechange = function () {
	if (xhr4.readyState === 4) {
		var dado = JSON.parse(xhr4.responseText);
		var conteudoHTML = '<option value="0">Selecione uma Produtora</option>';
		for (var i = 0; i < dado.length; i++) {
			conteudoHTML += '<option value="' + dado[i].id + '">' + dado[i].nome + '</option>';
		}

		document.getElementById('listarProd').innerHTML = conteudoHTML;
	}
};

xhr4.open('GET', 'php/service.php?acao=listar_produtoras');
xhr4.send();

// Inserir Jogo

function enviarJogo() {
	console.log('entrou');

	var nome = document.getElementById('nomeJogo').value;
	var url = document.getElementById('url').value;
	var descricao = document.getElementById('descricao').value;
	var preco = document.getElementById('preco').value;
	var genero = document.getElementById('listarGen').value;
	var produtora = document.getElementById('listarProd').value;

	if (nome == "" || url == "" || descricao == "" || preco == "" || genero == 0 || produtora == 0) {
		alert("Todos os campos devem ser preenchidos!");
	} else {

		var http = new XMLHttpRequest();
		var params = 'nome=' + nome + '&url=' + url + '&descricao=' + descricao + '&preco=' + preco + '&genero=' + genero + '&produtora=' + produtora + '';
		http.open('POST', 'php/service.php?acao=inserir', true);

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

// Deletar Jogo

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

	xhr.open('GET', 'php/service.php?acao=apagar&id=' + id);
	xhr.send();
}


var selectedGen = document.getElementById('btnGen');
var selectedProd = document.getElementById('btnProd');
var filtroGen = document.getElementById('filtroGen');
var filtroProd = document.getElementById('filtroProd');

function alterarFiltro(value) {
	if (value === 'gen') {
		selectedGen.className = "btn btn-outline-secondary active"
		selectedProd.className = "btn btn-outline-secondary"

		filtroGen.style.display = "block"
		filtroProd.style.display = "none"
	} else {
		selectedGen.className = "btn btn-outline-secondary"
		selectedProd.className = "btn btn-outline-secondary active"

		filtroGen.style.display = "none"
		filtroProd.style.display = "block"
	}
}
