<?php

if(!empty($_GET['acao'])){

	$acao = $_GET['acao'];
	
	//Criar conexão universal banco
	include('config.php');
	
	//Listar Produtos
	if($acao == "listar_produtos"){
		
		if(!empty($_GET['id_cat'])){
			$sql_produtos = "SELECT * FROM produtos WHERE id_cat=".$_GET['id_cat'].";";			
		}else{
			$sql_produtos = "SELECT * FROM produtos;";
		}
	
		$query_produtos = mysqli_query($conexao,$sql_produtos);
		
		if($query_produtos){
			
			$produtos = [];
			
			while($dados = mysqli_fetch_array($query_produtos)){
				
				$id = $dados['id'];
				$nome = $dados['nome'];
				$preco = $dados['preco'];
				$imagem = $dados['url_img'];
				$descricao = $dados['descricao'];
				
				array_push($produtos, ['id'=>$id,'nome'=>$nome, 'valor'=>$preco, 'imagem'=>$imagem, 'descricao'=>$descricao]);											
			}
			echo json_encode($produtos);
			
		}else{
			echo 0;
		}
		
		
	}else if($acao == "inserir"){
		
		if(!empty($_POST['nome']) && !empty($_POST['url']) && !empty($_POST['descricao']) && !empty($_POST['preco']) && !empty($_POST['categoria'])){
		
			$nome = $_POST['nome'];
			$url = $_POST['url'];
			$descricao = $_POST['descricao'];
			$preco = $_POST['preco'];
			$categoria = $_POST['categoria'];
			
			$sql_inserir = "INSERT INTO produtos (id_cat, nome, url_img, preco, descricao) VALUES ($categoria,'$nome','$url',$preco,'$descricao')";
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
			
			$sql_apagar = "DELETE FROM produtos WHERE id=".$id_apagar.";";
			$query_apagar = mysqli_query($conexao,$sql_apagar);
		
			if($query_apagar){
				echo 1;
			}else{
				echo 0;
			}

		}else{
			echo 0;
		}

	}else if($acao == "listar_categorias"){
	
		$sql_categoria = "SELECT * FROM categorias;";
		$query_categoria = mysqli_query($conexao,$sql_categoria);
		
		if($query_categoria){
			
			$categoria = [];
			
			while($dados = mysqli_fetch_array($query_categoria)){
				
				$id = $dados['id'];
				$nome = $dados['nome'];
				
				array_push($categoria, ['id'=>$id,'nome'=>$nome]);											
			}
			echo json_encode($categoria);
			
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