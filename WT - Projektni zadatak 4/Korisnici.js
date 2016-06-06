function popuniDatalist(){
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var sviKorisnici = JSON.parse(xmlhttp.responseText);
            var lista = "";
            for (var i = 0; i < sviKorisnici.length; i++)
            {
                if (sviKorisnici[i]["username"] != "Administrator") {
                    var korisnikID = sviKorisnici[i]["id"];
                    var korisnikUsername = sviKorisnici[i]["username"];
                    lista += "<option value=" + korisnikID + " >" + korisnikUsername + "</option>";
                }
            }
            document.getElementById("SviKorisnici").innerHTML = lista;
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviKorisnike.php?id=*", true);
    xmlhttp.send();
}

function dodajKorisnika()
{
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var xmlhttp;
    var params = "username="+username.value+"&password="+password.value;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            if (xmlhttp.responseText == "SUCCESS")
            {
                alert("Uspješno ste dodali korisnika!");
                window.location.href = "Korisnici.html";
            }
            else
                alert("Operacija dodavanja korisnika je bila neuspješna!");
        }
    };
    xmlhttp.open("POST", "Web Server/DodajKorisnika.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
}

function povuciVrijednost(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

function ucitajKorisnika(user)
{
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var zaposlenik = JSON.parse(xmlhttp.responseText);
            var username = document.getElementById("noviUsername");
            username.value = zaposlenik[1];
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviKorisnike.php?id="+user, true);
    xmlhttp.send();
}

function editKorisnika(user)
{
    var username = document.getElementById("noviUsername").value;
    var pass = document.getElementById("noviPass").value;
    var params = "korisnikUsername="+user+"&noviUsername="+username+"&noviPass="+pass;
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            if (xmlhttp.responseText == "SUCCESS")
            {
                alert("Uspješno ste uredili korisnika!");
                window.location.href = "Korisnici.html";
            }
            else
                alert("Operacija uređivanja korisnika je bila neuspješna!");
        }
    };
    xmlhttp.open("PUT", "Web Server/EditKorisnika.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
}

function deleteKorisnika()
{
    var vrijednostID = document.getElementById("BrisanjeKorisnik");
    var id = vrijednostID.value;
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            if (xmlhttp.responseText == "SUCCESS")
            {
                alert("Uspješno ste izbrisali korisnika!");
                window.location.href = "Korisnici.html";
            }
            else
                alert("Operacija brisanja korisnika je bila neuspješna!");
        }
    };
    xmlhttp.open("DELETE", "Web Server/DeleteKorisnika.php?id="+id, true);
    xmlhttp.send();
}

function getEditUser() {
    event.preventDefault();
    var element = document.getElementById("izabraniKorisnik").value;
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            if (xmlhttp.responseText != "FAILURE!")
                document.forms["test"].submit();
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviKorisnike.php?id="+element, true);
    xmlhttp.send();
}

function getLoginUser(){
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            if (xmlhttp.responseText == "SUCCESS")
            {
                var zaglavlja = document.getElementById("zaglavljeLinkovi");
                zaglavlja.innerHTML += "<li><a href='DodajNovost.html' >Novost</a></li>"
            }
        }
    };
    xmlhttp.open("GET", "Web Server/CheckLogin.php?", true);
    xmlhttp.send();
}