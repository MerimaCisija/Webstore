<?php

parse_str ( file_get_contents ( 'php://input' ), $put_vars );
header ( " {$_SERVER [ 'SERVER_PROTOCOL' ] } 200 OK" );
header ( 'ContentType: text/html' );
header ( 'AccessControlAllowOrigin:*' );
$data = $put_vars;

if (isset($data['naslov']))
{
    $konekcija = new mysqli("localhost", "root", "", "eboutique");
    $konekcija->set_charset("utf8");
    if ($konekcija->connect_error) {
        die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
    }
    if ($data['komentarisanje'] == null || $data['komentarisanje'] == true)
    {
        $ubaciNovost = $konekcija->prepare("UPDATE novosti SET dozvoljeniKomentari = 1 Where id=?");
    }
    else
    {
        $ubaciNovost = $konekcija->prepare("UPDATE novosti SET dozvoljeniKomentari = 0 Where id=?");
    }
    $ubaciNovost->bind_param("i", $stariID);
    $stariID = $data['naslov'];
    $proslo = "FAILURE";
    if ($ubaciNovost->execute())
        $proslo = "SUCCESS";
    $ubaciNovost->close();
    $konekcija->close();
    print $proslo;
}
else print "FAILURE";