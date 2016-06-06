<?php

$novosti = array();
$brojac = 0;
$konekcija = new mysqli("localhost", "root", "", "eboutique");
$konekcija->set_charset("utf8");
if ($konekcija->connect_error) {
    die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
}

if ($_GET["id"] === "*")
{
    $sql = "SELECT * FROM novosti n";
    $rezultat = $konekcija->query($sql);
    $konekcija->close();

    if ($rezultat != null && $rezultat->num_rows > 0) {
        while($red = $rezultat->fetch_assoc()) {
            $novosti[$brojac++] = $red;
        }
    }
    print json_encode($novosti);
}
else
{
    $spremljen = $konekcija->stmt_init();
    $spremljen->prepare("SELECT * FROM novosti n WHERE n.id=?");
    $spremljen->bind_param("i", $idAdmina);
    $idAdmina = $_GET["id"];
    $spremljen->execute();
    $rezultat = $spremljen->get_result();
    while ($red = $rezultat->fetch_array(MYSQLI_NUM))
        print json_encode($red);
    $spremljen->close();
}