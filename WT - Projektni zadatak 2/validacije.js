function validacijaKontakt()
{
	var ime=document.getElementById("ime");
	var email=document.getElementById("email");
	var poruka=document.getElementById("poruka");
	if (ime==null || ime.value.trim()=="") ime.style.backgroundColor="red";
	else ime.style.backgroundColor="";
	
	if (!validirajEmail(email.value))
	{
		email.style.backgroundColor="red";
	}
	else
	{
		email.style.backgroundColor="";
	}		
	
	if ((ime.value.trim=="" || !validirajEmail(email.value)) && poruka.value.trim()!="")
	{
		poruka.style.backgroundColor="red";
		alert("Ne možete poslati poruku ako niste unijeli ime i email.")
	}
	else if (poruka.value.trim()=="")
	{
		poruka.style.backgroundColor="red";
	}
	else
	{
		poruka.style.backgroundColor="";
	}
	
	return false;
}	

function validirajEmail(email)
{
	console.log(email);
	var regex = /^[^\s@]+\@[^\s@]+\.[^\s@]+$/g;
	
	return regex.test(email);
}

function validacijaLogin()
{
	var kime=document.getElementById("kime");
	var lozinka=document.getElementById("lozinka");
	
	if (kime.value.trim()=="")
	{
		kime.style.backgroundColor="red";
	}
	else
	{
		kime.style.backgroundColor="";
	}
	
	if (!validirajLozinku(lozinka.value))
	{
		lozinka.style.backgroundColor="red";
	}
	else
	{
		lozinka.style.backgroundColor="";
	}
	return false;
}

function validirajLozinku(lozinka)
{
	console.log(lozinka);
	var regex= /\d{1,}/;
	alert(regex.test(lozinka));
	return regex.test(lozinka);
}

