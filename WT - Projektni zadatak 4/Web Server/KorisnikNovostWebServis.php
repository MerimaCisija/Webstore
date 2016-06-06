<?php

function headers()
{
    header ( " {$_SERVER [ 'SERVER_PROTOCOL' ] } 200 OK" );
    header ( 'ContentType: text/html' );
    header ( 'AccessControlAllowOrigin:*' );
}

function rest_get ($request, $data)
{
    $konekcija = new mysqli("localhost", "root", "", "eboutique");
    $konekcija->set_charset("utf8");
    if ($konekcija->connect_error) {
        die("Nemoguće se povezati sa bazom!" . $konekcija->connect_error);
    }
    $spremljen = $konekcija->stmt_init();
    $spremljen->prepare("SELECT * FROM novosti WHERE autorId = ? LIMIT ?");
    $spremljen->bind_param("ii", $idAdmina, $brojNovosti);
    $idAdmina = $data["autor"];
    $brojNovosti = $data["x"];
    $spremljen->execute();
    $rezultat = $spremljen->get_result();
    while ($red = $rezultat->fetch_array(MYSQLI_NUM))
        print json_encode($red);
    $spremljen->close();
    $konekcija->close();
}

function rest_post ($request, $data)
{
    // Nije potrebna implementacija za spiralu
}

function rest_delete ($request)
{
    // Nije potrebna implementacija za spiralu
}

function rest_put ($request, $data)
{
    // Nije potrebna implementacija za spiralu
}

function rest_error ($request)
{
    print "Greška! Servis nije dostupan!";
}

$method = $_SERVER ['REQUEST_METHOD'];
$request = $_SERVER ['REQUEST_URI'];

switch ($method)
{
    case 'PUT':
        parse_str ( file_get_contents ( 'php://input' ), $put_vars );
        headers();
        $data = $put_vars;
        rest_put ($request, $data);
        break;
    case 'POST':
        headers();
        $data = $_POST;
        rest_post ($request, $data);
        break;
    case 'GET':
        headers();
        $data = $_GET;
        rest_get ($request, $data);
        break;
    case 'DELETE':
        headers();
        rest_delete ($request);
        break;
    default:
        header("{$_SERVER [ 'SERVER_PROTOCOL' ] } 404 Not Found" );
        rest_error ( $request );
        break;
}