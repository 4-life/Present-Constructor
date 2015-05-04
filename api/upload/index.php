<?php


	require_once($_SERVER['DOCUMENT_ROOT'] . '/api/Flow/Autoloader.php');
	Flow\Autoloader::register();

	$config = new \Flow\Config();
	$config->setTempDir($_SERVER['DOCUMENT_ROOT'] . '/api/chunks_temp_folder');
	$file = new \Flow\File($config);
	$request = new \Flow\Request();

	
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if ($file->checkChunk()) {
			header("HTTP/1.1 200 Ok");
		} else {
			header("HTTP/1.1 204 No Content");
			return ;
		}
	} else {
		if ($file->validateChunk()) {
			$file->saveChunk();
		} else {
			// error, invalid chunk upload request, retry
			header("HTTP/1.1 400 Bad Request");
			return ;
		}
	}
	
	if (\Flow\Basic::save($_SERVER['DOCUMENT_ROOT'] . '/api/temp/' . $request->getIdentifier(), $config, $request)) {
		// file saved successfully and can be accessed at './final_file_destination'
	} else {
		// This is not a final chunk or request is invalid, continue to upload.
	}
	
	
?>