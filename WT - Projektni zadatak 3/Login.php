<!DOCTYPE HTML>
<HTML>

<HEAD>
  <META http-equiv="Content-Type" content="text/html; charset=utf-8">
  
	<script type="text/javascript" src="validacije.js"></script>
  <TITLE>Prijava</TITLE>
  <link rel="stylesheet" type="text/css" href="Login_stil.css">
	<link rel="stylesheet" type="text/css" href="Naslovna_stil.css"> 	
	<link rel="stylesheet" type="text/css" href="Logo_stil.css">
</HEAD>

<BODY>
<?php
	ob_start();
	require_once('Login.php');
    $msg = '';

    $sadrzaj=file('login.txt');
	$array=explode(',',$sadrzaj[0]);
	
	$ime=$array[0];
	$lozinka=$array[1];
	
	if (isset($_POST['prijava']) && $_POST['username']==$ime && md5($_POST['password'])==$lozinka)
	{
		session_start();
		$_SESSION['valid'] = true;
		$_SESSION['timeout'] = time();
		$_SESSION['username'] = $ime;	
		$_SESSION['password']=$lozinka;	
		
		$msg="Uspješno ste se prijavili. Dobrodošli u E-Boutique!";
		header('Refresh: 1; URL = dodajNovost.php');
	}
	
	
	ob_end_clean();
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
				<li><a href="Login.html" >Prijavi se</a></li>
				<li><a href="Kontakt.html" >Kontakt</a></li>
			</ul>
			</div>
		<form name="LoginForma" action="Login.php" method='POST'>
			<table>
				<tr>
					<td> <label> KORISNIČKO IME: </label></td>
					<td> <input type="text" name="username" id="username" onchange="validacijaLogin()" placeholder="admin"> </td>
				</tr>
				<tr>
					<td> <label> LOZINKA: </label></td>
					<td> <input type="password" id="password" name="password" onchange="validacijaLogin()" placeholder="lozinka" ><td>
				</tr>
				<tr>
					<td> <input type="submit" value="PRIJAVA" name="prijava" id="prijava" class="button" onclick="validacijaLogin()"> </td>
				</tr>
			</table>
			
		</form>
		
		 <h5><?php echo $msg; ?></h5>

</div>
</BODY>

</HTML>
