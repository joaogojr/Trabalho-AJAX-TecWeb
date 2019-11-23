<?php

if(!empty($_GET['acao'])){

	$acao = $_GET['acao'];
	
	//Criar conexão universal banco
	include('config.php');
	
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
		
		if(!empty($_POST['nome']) && !empty($_POST['url']) && !empty($_POST['descricao']) && !empty($_POST['preco']) && !empty($_POST['genero'])){
		
			$nome = $_POST['nome'];
			$url = $_POST['url'];
			$descricao = $_POST['descricao'];
			$preco = $_POST['preco'];
			$genero = $_POST['genero'];
			
			$sql_inserir = "INSERT INTO jogos (id_gen, nome, url_img, preco, descricao) VALUES ($genero,'$nome','$url',$preco,'$descricao')";
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

	}else if($acao == "listar_generos"){
	
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
			
		
	}else{
		echo 0;
	}
	
	
}else{
	echo 0;
}

?>