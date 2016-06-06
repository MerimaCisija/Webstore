<?php

if (isset($_GET["novostID"]))
{
    $komentari = array();
    $brojac = 0;
    $konekcija = new mysqli("localhost", "root", "", "eboutique");
    $konekcija->set_charset("utf8");
    if ($konekcija->connect_error) {
        die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
    }
    $sql = "SELECT * FROM komentari WHERE novostId = " . $_GET["novostID"];
    $rezultat = $konekcija->query($sql);
    $konekcija->close();
    if ($rezultat->num_rows > 0) {
        while($red = $rezultat->fetch_assoc()) {
            $komentari[$brojac++] = $red;
        }
    }
    print json_encode($komentari);
}