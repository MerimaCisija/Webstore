<?php

session_start();

$postoji = false;
$admin = "";
$username = $_POST['username'];
$pass = $_POST['psw'];
$konekcija = new mysqli("localhost", "root", "", "eboutique");
$konekcija->set_charset("utf8");

if ($konekcija->connect_error)
    die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);

$sql = "SELECT k.id, k.username, k.password FROM korisnici k";
$rezultat = $konekcija->query($sql);
$konekcija->close();
$isAdmin = false;
$ide = "";
if ($rezultat != null && $rezultat->num_rows > 0) {
    while($red = $rezultat->fetch_assoc()) {
        if ($red["username"] == $username && $red["password"] == hash("sha256",$pass))
        {
            $postoji = true;
            $ide = $red['id'];
            $admin = $red;
            $isAdmin = ($red["username"] == 'Administrator') ? true: false;
            break;
        }
    }
}

if ($postoji)
{
    $_SESSION["username"] = $username;
    $_SESSION["password"] = hash("sha256",$pass);
    $_SESSION["id"] = $ide;
    $podaci = array();
    $podaci[] = $username;
    $podaci[] = hash("sha256",$pass);
    if ($isAdmin)
    {
        $_SESSION["tip"] = "administrator";
        $podaci[] = "administrator";
    }
    else
    {
        $_SESSION["tip"] = "obicni";
        $podaci[] = "obicni";
    }
    print json_encode($podaci);
}
else
    print "FAILURE";