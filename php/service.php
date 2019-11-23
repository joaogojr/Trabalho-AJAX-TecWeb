<?php

if(!empty($_GET['acao'])){

	$acao = $_GET['acao'];
	
	//Criar conexão universal banco
	include('./config.php');
	
	//Listar jogos
	if($acao == "listar_jogos"){
		
		if(!empty($_GET['id_gen'])){
			$sql_jogos = "SELECT * FROM jogos WHERE id_gen=".$_GET['id_gen'].";";			
		}else{
			$sql_jogos = "SELECT * FROM jogos;";
		}
	
		$query_jogos = mysqli_query($conexao,$sql_jogos);
		
		if($query_jogos){
			
			$jogos = [];
			
			while($dados = mysqli_fetch_array($query_jogos)){
				
				$id = $dados['id'];
				$nome = $dados['nome'];
				$preco = $dados['preco'];
				$imagem = $dados['url_img'];
				$descricao = $dados['descricao'];
				
				array_push($jogos, ['id'=>$id,'nome'=>$nome, 'valor'=>$preco, 'imagem'=>$imagem, 'descricao'=>$descricao]);											
			}
			echo json_encode($jogos);
			
		}else{
			echo 0;
		}
		
		
	}else if($acao == "inserir"){
		
		if(!empty($_POST['nome']) && !empty($_POST['url']) && !empty($_POST['descricao']) && !empty($_POST['preco']) && !empty($_POST['genero']) && !empty($_POST['produtora'])){
		
			$nome = $_POST['nome'];
			$url = $_POST['url'];
			$descricao = $_POST['descricao'];
			$preco = $_POST['preco'];
			$genero = $_POST['genero'];
			$produtora = $_POST['produtora'];
			
			$sql_inserir = "INSERT INTO jogos (id_gen, id_prod, nome, url_img, preco, descricao) VALUES ($genero,$produtora,'$nome','$url',$preco,'$descricao')";
			$query_inserir = mysqli_query($conexao,$sql_inserir);
		
			if($query_inserir){
				
				$id_insercao = mysqli_insert_id($conexao);
				
				echo $id_insercao;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}		
		
	}else if($acao == "apagar"){
	
		if(!empty($_GET['id'])){
		
			$id_apagar = $_GET['id'];
			
			$sql_apagar = "DELETE FROM jogos WHERE id=".$id_apagar.";";
			$query_apagar = mysqli_query($conexao,$sql_apagar);
		
			if($query_apagar){
				echo 1;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}

	} else if ($acao == "inserirGen") {
		if(!empty($_POST['nome']) && !empty($_POST['idGen'])){
		
			$nome = $_POST['nome'];
			$idGen = $_POST['idGen'];
			
			$sql_inserirGen = "INSERT INTO generos (nome, id) VALUES ('$nome','$idGen')";
			$query_inserirGen = mysqli_query($conexao,$sql_inserirGen);
		
			if($query_inserirGen){
				
				$id_insercao = mysqli_insert_id($conexao);
				
				echo $id_insercao;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}		
	} else if($acao == "apagarGen"){
	
		if(!empty($_GET['id'])){
		
			$id_apagarGen = $_GET['id'];
			
			$sql_apagarGen = "DELETE FROM generos WHERE id=".$id_apagarGen.";";
			$query_apagarGen = mysqli_query($conexao,$sql_apagarGen);
		
			if($query_apagarGen){
				echo 1;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}

	} else if($acao == "listar_generos"){
	
		$sql_genero = "SELECT * FROM generos;";
		$query_genero = mysqli_query($conexao,$sql_genero);
		
		if($query_genero){
			
			$genero = [];
			
			while($dados = mysqli_fetch_array($query_genero)){
				
				$id = $dados['id'];
				$nome = $dados['nome'];
				
				array_push($genero, ['id'=>$id,'nome'=>$nome]);											
			}
			echo json_encode($genero);
			
		}else{
			echo 0;
		}
			
		
	} else if($acao == "listar_produtoras"){
	
		$sql_produtora = "SELECT * FROM produtoras;";
		$query_produtora = mysqli_query($conexao,$sql_produtora);
		
		if($query_produtora){
			
			$produtora = [];
			
			while($dados = mysqli_fetch_array($query_produtora)){
				
				$id = $dados['id'];
				$nome = $dados['nome'];
				
				array_push($produtora, ['id'=>$id,'nome'=>$nome]);											
			}
			echo json_encode($produtora);
			
		}else{
			echo 0;
		}
			
		
	} else if($acao == "apagarProd"){
	
		if(!empty($_GET['id'])){
		
			$id_apagarProd = $_GET['id'];
			
			$sql_apagarProd = "DELETE FROM produtoras WHERE id=".$id_apagarProd.";";
			$query_apagarProd = mysqli_query($conexao,$sql_apagarProd);
		
			if($query_apagarProd){
				echo 1;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}

	} else if ($acao == "inserirProd") {
		if(!empty($_POST['nome']) && !empty($_POST['idProd'])){
		
			$nome = $_POST['nome'];
			$idProd = $_POST['idProd'];
			
			$sql_inserirProd = "INSERT INTO produtoras (nome, id) VALUES ('$nome','$idProd')";
			$query_inserirProd = mysqli_query($conexao,$sql_inserirProd);
		
			if($query_inserirProd){
				
				$id_insercao = mysqli_insert_id($conexao);
				
				echo $id_insercao;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}		
	}
	 else{
		echo 0;
	}
		
} else{
	echo 0;
}

?>