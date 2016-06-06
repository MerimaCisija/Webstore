<?php
session_start();

if (isset($_SESSION["username"]) && isset($_SESSION["password"]))
    $proslo = "SUCCESS";
else
    $proslo = "FAILURE";
print $proslo;