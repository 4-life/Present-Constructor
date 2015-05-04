<?php

	$params = json_decode(file_get_contents('php://input'), true);	
	
	if(!$params["id"]){
		$params["id"] = uniqid("present_");
	}
	
	$dir   = $_SERVER['DOCUMENT_ROOT'] . '/api/presents/' . $params['id'];
	
	file_put_contents($dir, json_encode($params));	
	
	echo "done";
	
?>