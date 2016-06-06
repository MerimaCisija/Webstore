<!DOCTYPE HTML>
<HTML>

<HEAD>
  <META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script type="text/javascript" src="validacije.js"></script>
    <script type="text/javascript" src="new.js"></script>
    <script>ProvjeriLogin()</script>
	<script type="text/javascript" src="Korisnici.js"></script>
	<script>getLoginUser()</script>
  <TITLE>Prijava</TITLE>
  <link rel="stylesheet" type="text/css" href="Login_stil.css">
	<link rel="stylesheet" type="text/css" href="Naslovna_stil.css"> 	
	<link rel="stylesheet" type="text/css" href="Logo_stil.css">
</HEAD>

<BODY>
  
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
			<ul id="zaglavljeLinkovi">
				<li><a href="Naslovna.php">Naslovna stranica</a></li>
				<li><a href="DodatneInformacije.html" >Dodatne informacije</a></li>
				<li><a href="Login.php" >Profil</a></li>
				<li><a href="Kontakt.html" >Kontakt</a></li>
			</ul>
		</div>
		<div id="naslov">
			<form name="LoginForma" method='POST'>
				<table>
					<tr>
						<td> <label> KORISNIČKO IME: </label></td>
						<td> <input type="text" name="username" id="username" placeholder="admin"> </td>
					</tr>
					<tr>
						<td> <label> LOZINKA: </label></td>
						<td> <input type="password" id="password" name="password" placeholder="lozinka" ><td>
					</tr>
					<tr>
						<td> <input type="button" value="PRIJAVA" name="prijava" id="prijava" class="button" onclick="validacijaLogin()"> </td>
					</tr>
				</table>
			</form>
		</div>
</div>
</BODY>

</HTML>
