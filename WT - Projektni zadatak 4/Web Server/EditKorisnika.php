<?php
session_start();
parse_str ( file_get_contents ( 'php://input' ), $put_vars );
header ( " {$_SERVER [ 'SERVER_PROTOCOL' ] } 200 OK" );
header ( 'ContentType: text/html' );
header ( 'AccessControlAllowOrigin:*' );
$data = $put_vars;

if (isset($data['editProfile']))
{
    $ide = $_SESSION['id'];
    $konekcija = new mysqli("localhost", "root", "", "eboutique");
    $konekcija->set_charset("utf8");
    if ($konekcija->connect_error) {
        die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
    }
    $ubaciNovost = $konekcija->prepare("UPDATE korisnici SET password = ? Where id=?");
    $stariID = "";
    $ubaciNovost->bind_param("si", $noviPasss, $stariID);
    $stariID = $ide;
    $noviPasss = hash("sha256",$data['noviPass']);
    if ($ubaciNovost->execute())
    {
        $proslo = "SUCCESS";
        $_SESSION['password'] = $data['noviPass'];
    }
    $ubaciNovost->close();
    $konekcija->close();
    print $proslo;
}
else {
    if (isset($data['noviUsername']) && isset($data['noviPass'])) {
        $dodaniUsername = $data['noviUsername'];
        $dodaniPass = $data['noviPass'];
        $konekcija = new mysqli("localhost", "root", "", "eboutique");
        $konekcija->set_charset("utf8");
        if ($konekcija->connect_error) {
            die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
        }
        $postojiUsername = false;
        $sql = "SELECT * FROM korisnici";
        $rezultat = $konekcija->query($sql);
        if ($rezultat != null && $rezultat->num_rows > 0) {
            while ($red = $rezultat->fetch_assoc()) {
                if ($dodaniUsername == $red["username"] && $red["id"] != $data['korisnikUsername']) {
                    $postojiUsername = true;
                    break;
                }
            }
        }
        if ($postojiUsername)
            print "FAILURE";
        else {
            if ($dodaniPass != null) {
                $ubaciNovost = $konekcija->prepare("UPDATE korisnici SET username = ?, password = ? Where Id=?");
                $stariID = "";
                $ubaciNovost->bind_param("ssi", $noviUser, $noviPasss, $stariID);
                $stariID = $data['korisnikUsername'];
                $noviUser = $data['noviUsername'];
                $noviPasss = hash("sha256",$data['noviPass']);
            } else {
                $ubaciNovost = $konekcija->prepare("UPDATE korisnici SET username = ? Where Id=?");
                $stariID = "";
                $ubaciNovost->bind_param("si", $noviUser, $stariID);
                $stariID = $data['korisnikUsername'];
                $noviUser = $data['noviUsername'];
            }
            $uspjeh = "FAILURE";
            if ($ubaciNovost->execute())
            {
                $uspjeh = "SUCCESS";
                $_SESSION['password'] = $data['noviPass'];
                $_SESSION['username'] = $data['noviUsername'];
            }
            $ubaciNovost->close();
            $konekcija->close();
            print $uspjeh;

        }
    }
}