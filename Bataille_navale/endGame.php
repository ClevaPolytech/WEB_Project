<?php 
$gagnant = $_GET["victory"];
$tableau=[$_GET["temps"],$_GET["coups"]];

if ($gagnant=="player"){$message = "BRAVO, vous avez gagné !";
    $score="vous avez gagné en ".$tableau[0]." secondes et en ".$tableau[1]." coups";

    $affichage="<form action='endGameAction.php?temps=".$tableau[0]."&coups=".$tableau[1]."'method='post'>
			Entrez votre nom :
			<br>
			<input type='text' name='name'>";
}
else{$message="Dommage, l'ordinateur a gagné ! ";
    $score="L'ordinateur a gagné en ".$tableau[0]." secondes et en ".$tableau[1]." coups";
    $affichage="<img id='continuer' src='images/continuer.jpeg' alt='continuer' />";}
?>


<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Projet</title>
    <meta name="author" content="Clément Poueyto - Maëva Lecavelier">
    <link rel="stylesheet" href="endGame.css">
    <script src="endGame.js"></script>

</head>

<body>
    <h1><?php echo $message ?></h1>

    <h2><?php echo $score ?></h2>

    <?php echo $affichage ?>
    
    
</body>

</html>