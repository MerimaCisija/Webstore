<?php

$konekcija = new mysqli("localhost", "root", "", "eboutique");
$konekcija->set_charset("utf8");
if ($konekcija->connect_error) {
    die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
}
if ($_GET["id"] === "*")
{
    $sql = "SELECT * FROM korisnici";
    $rezultat = $konekcija->query($sql);
    $nizKorisnika = array();
    if ($rezultat->num_rows > 0) {
        while($red = $rezultat->fetch_assoc()) {
            $nizKorisnika[] = $red;
        }
    }
    print json_encode($nizKorisnika);
}
else
{
    $spremljen = $konekcija->stmt_init();
    $spremljen->prepare("SELECT * FROM korisnici WHERE Id = ?");
    $spremljen->bind_param("i", $idAdmina);
    $idAdmina = $_GET["id"];
    $spremljen->execute();
    $rezultat = $spremljen->get_result();
    if ($rezultat->num_rows == 0)
    {
        print "FAILURE!";
    }
    else{
        while ($red = $rezultat->fetch_array(MYSQLI_NUM))
            print json_encode($red);
    }
    $spremljen->close();
}
$konekcija->close();