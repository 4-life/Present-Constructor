<?php

	//require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
	
	//$current_user_id = get_current_user_id();
	
	//$brand = get_the_author_meta( 'brand', $current_user_id );
	
	$dir   = $_SERVER['DOCUMENT_ROOT'] . '/api/presents/';
	$files = scandir($dir);	
	
	$data = array();
	foreach($files as $i){
		if($i != '.' && $i != '..'){
			$fileData = json_decode(file_get_contents($dir.'/'.$i), true);
			if($fileData["brand"] == $brand || $current_user_id == 1){					
				$data[] = $fileData;
			}
		}
	}
	
	echo json_encode($data);
	
?>