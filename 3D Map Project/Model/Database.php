<?php
    $dsn = 'mysql:host=localhost;dbname=mosque_description;charset=utf8';
    $username = 'halalmetro';
    $password = '1jf8a3#9agd&';

    try 
    {
        $db = new PDO($dsn, $username, $password);
    } 
    catch (PDOException $except) 
    {
        $error_message = $except->getMessage();
        include('Error.php');
        exit();
    }
?>