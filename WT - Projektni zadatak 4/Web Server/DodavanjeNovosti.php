<?php

session_start();

if (isset($_POST['naslov']) && isset($_POST['text']))
{
    if (!empty($_POST['naslov']) && !empty($_POST['text']))
    {
        $imeAutora = $_SESSION['username'];
        $konekcija = new mysqli("localhost", "root", "", "eboutique");
        $konekcija->set_charset("utf8");
        if ($konekcija->connect_error) {
            die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
        }

        $ubaciNovost = $konekcija->prepare("INSERT INTO novosti (naslov, text, autorId, dozvoljeniKomentari) VALUES (?,?,?,?)");
        $noviUvod="";
        $noviDetaljna="";
        $autorr = "";
        $noviKomentari = "";
        $ubaciNovost->bind_param("ssii", $noviNaslov, $noviUvod, $autorr, $noviKomentari);
        $autorr = $_SESSION['id'];
        $noviNaslov = $_POST['naslov'];
        $noviUvod = $_POST['text'];
        $noviKomentari = $_POST['komentarisanje'];
        $proslo = "FAILURE";
        if ($ubaciNovost->execute())
            $proslo = "SUCCESS";
        $ubaciNovost->close();
        $konekcija->close();
        print $proslo;
    }
    else print "FAILURE";
}
else print "FAILURE";