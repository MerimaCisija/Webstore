function ucitajNovosti()
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
            var opcije = "";
            for (var i = 0; i < sveNovosti.length; i++)
            {
                var novostID = sveNovosti[i]["id"];
                var novostNaslov = sveNovosti[i]["naslov"];
                opcije += "<option value=" + novostID + " >" + novostNaslov + "</option>";
            }
            document.getElementById("ListaNovosti").innerHTML = opcije;
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviNovosti.php?id=*", true);
    xmlhttp.send();
}

function deleteNovost()
{
    var vrijednostID = document.getElementById("NovostZaBrisanje");
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
                alert("Uspješno ste izbrisali novost!");
                window.location.href = "Novosti.html";
            }
            else
                alert("Operacija brisanja novosti nije bila uspješna!");
        }
    };
    xmlhttp.open("DELETE", "Web Server/DeleteNovost.php?id="+id, true);
    xmlhttp.send();
}

function editNovost(){
    var id = document.getElementById("vrijednostNovost");
    var komentarisanje = document.getElementById("komentarisanje");
    var dozvola = komentarisanje.checked ? 1:0;
    var params = "naslov="+id.value+"&komentarisanje="+dozvola;
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
                alert("Uspješno ste uredili novost!");
                window.location.href = "Novosti.html";
            }
            else
                alert("Operacija uređivanja novosti nije bila uspješna!");
        }
    };
    xmlhttp.open("PUT", "Web Server/EditNovosti.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
}

function naslovnaNovosti(){
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
            var novost = "";
            var klasaDiv = "lijevo";
            var kontejner = document.getElementById("novosti");
            for (var i = 0; i < sveNovosti.length; i++)
            {
                var novostID = sveNovosti[i]["id"];
                var novostNaslov = sveNovosti[i]["naslov"];
                var novostTekst = sveNovosti[i]["text"];
                var novostDatum = sveNovosti[i]["datum"];
                novost = "<div class=" + klasaDiv + " >" +
                        "<div class='vrijeme'> Novost objavljena <time class='vrijemeObjave' datetime=" + novostDatum + ">vrijeme</time>.</div>"+
            "<h4>" + novostNaslov + "</h4>"+
            "<BR>"+
            "<p>" +
                novostTekst +
            "</p>"+
            "<img src=" + "slike/" + novostID + ".jpg" + " alt='slike/mango_violeta.jpg'>"+
                    "</div>";
                kontejner.innerHTML += novost;
                if (klasaDiv == "lijevo")
                    klasaDiv = "desno";
                else
                    klasaDiv = "lijevo";
            }
        }
    };
    xmlhttp.open("GET", "Web Server/DobaviNovosti.php?id=*", true);
    xmlhttp.send();
}

function dodajNovost(){
    var naslov = document.getElementById("naslovNovost");
    var komentarisanje = document.getElementById("komentarisanje");
    var dozvola = komentarisanje.checked ? 1:0;
    var sadrzaj = document.getElementById("tekst");
    var params = "naslov="+naslov.value+"&komentarisanje="+dozvola+"&text=" + sadrzaj.value;
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
                alert("Uspješno ste dodali novost!");
                window.location.href = "Naslovna.html";
            }
            else
                alert("Operacija dodavanja novosti nije bila uspješna!");
        }
    };
    xmlhttp.open("POST", "Web Server/DodavanjeNovosti.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
}