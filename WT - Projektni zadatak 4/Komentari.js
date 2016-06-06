function ucitajKomentare()
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
            var sveNovosti = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < sveNovosti.length; i++)
            {
                var naziv = sveNovosti[i]["naslov"];
                var novostID = sveNovosti[i]["id"];
                var kontejner = document.getElementById("naslov");
                kontejner.innerHTML += "<form><fieldset class='dodavanje' id=" + novostID + ">" +
                    "<legend>"+naziv+"</legend><br>";
                kontejner.innerHTML += "</fieldset></form><br>";
                ispisiKomentare(novostID);
            }
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviNovosti.php?id=*", true);
    xmlhttp.send();
}

function ispisiKomentare(novostID)
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
            var trenutniKomentari = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < trenutniKomentari.length; i++)
            {
                var kontejner = document.getElementById(novostID);
                var komentarID = trenutniKomentari[i]["id"];
                var komentarTekst = trenutniKomentari[i]["text"];
                kontejner.innerHTML += "<label class='prikazKomentara'> ID:" + komentarID + "</label><p class='prikazPorukeKomentara'>" + komentarTekst + "</p><br><br>";
                if (i == trenutniKomentari.length-1)
                {
                    var idBroja = "komentarZaBrisanjeID"+novostID;
                    var idButtona = "buttonZaBrisanje+" + novostID;
                    kontejner.innerHTML += "<hr><p>Unesite ID komentara kojeg želite ukloniti zbog neprimjerenog sadržaja: </p><br>" +
                        "<input id=" + idBroja + " class='unosID' type='number' name='komentarID' min='1'><br><br>";
                    kontejner.innerHTML += "<input id=" + idButtona + " type='button' class='submitButton' value='Izbriši' list='komentarLista' onclick='obrisiKomentar(this.id)'>";
                }
            }
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviKomentare.php?novostID="+novostID, true);
    xmlhttp.send();
}

function obrisiKomentar(KomentarID)
{
    var rijeci = KomentarID.split("+");
    var unos = document.getElementById("komentarZaBrisanjeID"+rijeci[1]).value;
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
                alert("Uspješno ste izbrisali komentar!");
                window.location.href = "Komentari.html";
            }
            else
                alert("Niste izabrali postojeći komentar za brisanje!");
        }
    };
    xmlhttp.open("DELETE", "Web Server/DeleteKomentar.php?id="+unos, true);
    xmlhttp.send();
}