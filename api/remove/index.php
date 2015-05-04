<?php

	$params = json_decode(file_get_contents('php://input'), true);	
	
	$dir   = $_SERVER['DOCUMENT_ROOT'] . '/api/presents/' . $params['id'];
			
	unlink($dir);	
	
?>