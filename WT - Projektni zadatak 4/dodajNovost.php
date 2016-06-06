<!DOCTYPE HTML>
<HTML>

<HEAD>
  <META http-equiv="Content-Type" content="text/html; charset=utf-8">
  
	<script type="text/javascript" src="validacije.js"></script>
  <TITLE>Dodaj novost</TITLE>
  	
	<link rel="stylesheet" type="text/css" href="Logo_stil.css">	
	<link rel="stylesheet" type="text/css" href="Naslovna_stil.css"> 
    <link rel="stylesheet" type="text/css" href="DodajNovost_stil.css">
</HEAD>

<BODY>
<?php
session_start();

		$msg = "";
		if(isset($_POST['odjava']))
		{
			unset($_SESSION['username']);
			unset($_SESSION['password']);
			session_destroy();
			
			$msg = "Uspješno ste odjavljeni!";
			header('Refresh: 1; URL = Naslovna.php');
			
		}

		
			if(isset($_POST['dodaj']))
			{
				if (isset($_SESSION['username']) && $_SESSION['username']=="admin")
				{
					if($_POST['naslov'] != "" && $_POST['slika'] != "" && preg_match('/\.(jpeg|jpg|gif|png)$/', $_POST['slika']) && $_POST['tekst'] != "" && $_POST['telefon'] != "")
					{
						
						date_default_timezone_set('Europe/Sarajevo');
						$naslov = htmlEntities($_POST['naslov'], ENT_QUOTES);
						$naslov = str_replace(",", "&#44;", $naslov);
						$tekst = htmlEntities($_POST['tekst'], ENT_QUOTES);
						$tekst = str_replace(",", "&#44;", $tekst);
						$tekst = explode("\n", $tekst);
						$tekst = implode(" ", $tekst);
						$slika = htmlEntities($_POST['slika'], ENT_QUOTES);
						
						file_put_contents("novosti.csv", $naslov.",".$slika.",".$tekst.",".date("Y-m-d H:i:s")."\n", FILE_APPEND);
						$msg = "Uspješno ste dodali novost!";
					
					}
					else $msg = "Unesite sve podatke ispravno!";
				}
				else $msg="Morate biti prijavljeni kako biste mogli dodati novost!";
		
			} 
		
	?>

    <div id="okvir">
		<div id="zaglavlje">
			<div class="logo">
				<div class="ravnaLinija"></div>
				<div class="krivaLinija"></div>
				<div class="ravnaLinijaDva"></div>
				<div class="ravnaLinijaTri"></div>	
				<div class="ravnaLinijaCetiri"></div>
				<div class="krivaLinijaDva"></div>	
				<div class="drska"></div>
				<div class="krug" id="krug1"></div>
				<div class="krug" id="krug2"></div>
				<h1>E-Boutique</h1>
			</div>
		</div>
		
		<div id="meni">
			<ul>
				<li><a href="Naslovna.php">Naslovna stranica</a></li>
				<li><a href="DodatneInformacije.html" >Dodatne informacije</a></li>
				<li><a href="Login.php" >Prijavi se</a></li>
				<li><a href="Kontakt.html" >Kontakt</a></li>
			</ul>
			</div>
		<form name="FormaNovost" action="dodajNovost.php" method="post"  >
			<table>

				<tr>
					<td> <label> Naslov * </label></td>
					<td> <input type="text" id="naslov" name="naslov" onchange="validacijaNovosti()"><td>
				</tr>
			
				<tr>
					<td> <label> Tekst * </label></td>
					<td> <textarea id="tekst" name="tekst" onchange="validacijaNovosti()" > </textarea>
				</tr>
				<tr>
					<td> <label> Slika *</label></td>
					<td> <input type="file" id="slika" name="slika"><td>
				</tr>
				<tr>
					<td> <br> <input type="submit" value="Dodaj novost" name="dodaj" class="button" onclick="return validacijaNovosti();" > </td>
				</tr>
				<tr></tr>
				<tr></tr>
			</table>
		</form>
	</div>
</BODY>

</HTML>
