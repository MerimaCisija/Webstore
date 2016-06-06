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
$proslo = "FAILURE";
$spremljen = $konekcija->prepare("DELETE FROM korisnici WHERE Id = ?");
$spremljen->bind_param("i", $idKorisnika);
$idKorisnika = $query['id'];
if ($spremljen->execute())
    $proslo = "SUCCESS";
$spremljen->close();
$konekcija->close();
print $proslo;