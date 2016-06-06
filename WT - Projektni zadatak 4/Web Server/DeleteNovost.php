<?php

header ( " {$_SERVER [ 'SERVER_PROTOCOL' ] } 200 OK" );
header ( 'ContentType: text/html' );
header ( 'AccessControlAllowOrigin:*' );
$request = $_SERVER ['REQUEST_URI'];
$parts = parse_url($request);
parse_str($parts['query'], $query);

$konekcija = new mysqli("localhost", "root", "", "eboutique");
$konekcija->set_charset("utf8");
if ($konekcija->connect_error) {
    die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
}
$spremljen = $konekcija->prepare("DELETE FROM novosti WHERE id = ?");
$spremljen->bind_param("i", $idVijestt);
$idVijestt = $query['id'];
$proslo = "FAILURE";
if ($spremljen->execute())
    $proslo = "SUCCESS";
$spremljen->close();
$konekcija->close();
print $proslo;