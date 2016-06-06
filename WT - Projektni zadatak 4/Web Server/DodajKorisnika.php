<?php

if (isset($_POST['username']) && isset($_POST['password']))
{
    if (!empty($_POST['username']) && !empty($_POST['password']))
    {
        $dodaniUsername = $_POST['username'];
        $dodaniPass = $_POST['password'];
        $konekcija = new mysqli("localhost", "root", "", "eboutique");
        $konekcija->set_charset("utf8");
        if ($konekcija->connect_error) {
            die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
        }
        $postoji = false;
        $sql = "SELECT * FROM korisnici";
        $rezultat = $konekcija->query($sql);
        if ($rezultat->num_rows > 0) {
            while($red = $rezultat->fetch_assoc()) {
                if ($dodaniUsername == $red["username"])
                {
                    $postoji = true;
                    break;
                }
            }
        }
        if ($postoji == true)
            print "FAILURE";
        else
        {
            $spreman = $konekcija->prepare("INSERT INTO korisnici (username, password) VALUES (?, ?)");
            $spreman->bind_param("ss", $dodajUsername, $dodajPassword);
            $dodajUsername = $dodaniUsername;
            $dodajPassword = hash("sha256",$dodaniPass);
            $uspjeh = "FAILURE";
            if ($spreman->execute())
                $uspjeh = "SUCCESS";
            $spreman->close();
            $konekcija->close();
            print $uspjeh;
        }
    }
}