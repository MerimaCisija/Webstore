window.onload = function (){

	var klasa = "vrijemeObjave";

	var elementi = document.getElementsByClassName(klasa);
	console.log(klasa);
	for(var i=0; i<elementi.length; i++){
		var s = elementi[i].getAttribute("datetime");
		var ispisi=objavljenoPrije(s);
		document.getElementsByClassName(klasa)[i].innerHTML = ispisi;
	}
	
};

function ispisDatuma(datum){
	var dan=datum.getDate();
	var mjesec=datum.getMonth()+1;
	var sat=datum.getHours();
	var minuta=datum.getMinutes();
	var sekunde=datum.getSeconds();
	if(dan<10) dan="0"+dan;
	if(mjesec<10) mjesec="0"+mjesec;
	if(sat<10) sat="0"+sat;
	if(minuta<10) minuta="0"+minuta;
	if(sekunde<10) sekunde="0"+sekunde;
	return dan+"."+mjesec+"."+datum.getFullYear()+" "+sat+":"+minuta+":"+sekunde;
}

function objavljenoPrije(datum)
{
	var pom="";
	var trenutniDatum=new Date();
	var datumObjave=new Date(datum);
	var razlikaVrijeme =trenutniDatum.getTime() - datumObjave.getTime();
	var razlikaMinute= Math.ceil(razlikaVrijeme/(1000*60));
	var razlikaSati= Math.ceil(razlikaMinute/60);
	var razlikaDani = Math.ceil(razlikaVrijeme / (1000 * 3600 * 24)); 
	
	if (razlikaMinute<=1) pom="prije par sekundi";
	else if (razlikaSati<=1)
	{
		if (razlikaMinute%10==1) pom="prije "+razlikaMinute.toString()+" minutu";
		else if (razlikaMinute%10>1 && razlikaMinute%10<5) pom="prije "+razlikaMinute.toString()+" minute";
		else pom="prije "+razlikaMinute.toString()+" minuta";
	}
	else if (razlikaSati<24)
	{
		if (razlikaSati%10==1) pom="prije "+razlikaSati.toString()+" sat";
		else if (razlikaSati%10>1 && razlikaSati%10<5) pom="prije "+razlikaSati.toString()+" sata";
		else pom="prije "+razlikaSati.toString()+" sati";
	}
	else if (razlikaDani<=7)
	{
		if (razlikaDani%10==1) pom="prije "+razlikaDani.toString()+" dan";
		else pom="prije "+razlikaDani.toString()+" dana";
	}
	else if (razlikaDani>7 && razlikaDani<=14) pom="prije 1 sedmicu";
	else if (razlikaDani>14 && razlikaDani<=21) pom="prije 2 sedmice";
	else if (razlikaDani>21 && razlikaDani<=28) pom="prije 3 sedmice";
	else if(razlikaDani>28 && razlikaDani<=31) pom="prije 4 sedmice";
	else pom=ispisDatuma(datumObjave);
	
	return pom;

}

function Filtriraj ()
{
	var desni=[].slice.call(document.getElementsByClassName("desno"));
	var lijevi=[].slice.call(document.getElementsByClassName("lijevo"));
	var svi=desni.concat(lijevi);
	
	izabrano=document.getElementById("filter").value;
	for(i=0; i<svi.length; i++){
		var test=svi[i].childNodes[1].innerText;
		var pr=Provjera(test);
		if (pr=="dan" && izabrano==1)
		{
			svi[i].style.display="block";
		}
		else if ((pr=="sedmica" || pr=="dan") && izabrano==2)
		{
			svi[i].style.display="block";
		}
		else if ((pr=="sedmica" || pr=="dan" || pr=="mjesec") && izabrano==3)
		{
			svi[i].style.display="block";
		}
		else if(izabrano==0){
			svi[i].style.display="block";
		}
		else
		{
			svi[i].style.display="none";
		}

	}
	
}

function Provjera(str){
	if(str.includes("sat") || str.includes("minut") || str.includes("sekund")) return "dan";
	else if(str.includes("1 sedmice") || str.includes("dan")) return "sedmica";
	else if(str.includes("2 sedmice") || str.includes("3 sedmice") || str.includes("4 sedmice")) return "mjesec";
	else return "sve";
}

function validacijaLogin()
{
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var xmlhttp;
    var params = "username="+username.value+"&psw="+ password.value;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            if (xmlhttp.responseText == "FAILURE")
            {
                alert('Neispravni login podaci!');
                window.location.href = 'Login.php';
            }
            else
            {
                var podaci = JSON.parse(xmlhttp.responseText);
                alert("Uspješno ste prijavljeni na sistem!");
                if (podaci[2] == "administrator")
                    window.location.href = 'Administrator.html';
                else
                    window.location.href = 'Naslovna.html';
            }
        }
    };
    xmlhttp.open("POST", "Web Server/Prijava.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
}

function Odjava()
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
				alert("Uspješno ste se odjavili sa sistema!");
				window.location.href = "Naslovna.html";
			}
		};
		xmlhttp.open("GET", "Web Server/Odjava.php", true);
		xmlhttp.send();
}

function urediProfilLozinka(){
    var lozinka1 = document.getElementById("novaLozinka").value;
    var lozinka2 = document.getElementById("repeatLozinka").value;
    if (lozinka1 != lozinka2 || lozinka1 == "")
    {
        alert("Neispravan unos lozinke!");
    }
    else
    {
        var params = "editProfile=1"+"&noviPass="+lozinka1;
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
                    window.location.href = "Naslovna.html";
                }
                else
                    alert("Operacija uređivanja korisnika nije bila uspješna!");
            }
        };
        xmlhttp.open("PUT", "Web Server/EditKorisnika.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(params);
    }
}

function ProvjeriLogin()
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
            if (xmlhttp.responseText == "SUCCESS")
            {
                var kontejner = document.getElementById("naslov");
                kontejner.innerHTML = "<br/><form id='urediLozinku'>"+
                    "<fieldset>"+
                    "<legend>Uredi korisnika</legend>"+
                    "<input type='hidden' name='korisnikUsername'>"+
                    "<label>Password (*): </label> <input type='password' name='novaLozinka' id='novaLozinka'><br><br>"+
                    "<label>Ponovi Password (*): </label> <input type='password' name='repeatLozinka' id='repeatLozinka'><br><br>"+
                    "<input type='button' value='Pošalji' class='submitButton' id='odradiUredi' onclick='urediProfilLozinka()'>"+
                    "</fieldset>"+
                    "</form>";
                kontejner.innerHTML += "<br/><br/><input type='button' value='ODJAVA' style='background-color: darkred; color: white; font-weight: bold' onclick='Odjava()'/>";
            }
        }
    };
    xmlhttp.open("GET", "Web Server/GetLogin.php", true);
    xmlhttp.send();
}