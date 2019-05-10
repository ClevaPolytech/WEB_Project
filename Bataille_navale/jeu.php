<?php
  include("placerOrdi.php");
  function table($num) {
    $tab=["A","B","C","D","E","F","G","H","I","J"];
  	for($n=0; $n<10; $n++){
  		echo "<tr>";
  		for($m=0; $m<10; $m++){
        echo "<td class=cell id=".$tab[$n].$m.$num.">";
        //echo $tab[$n].$m;
  			echo "</td>";
  		}
  		echo "</tr>";
  	}
  }

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Projet</title>
    <meta name="author" content="Clément Poueyto - Maëva Lecavelier">
    <link rel="stylesheet" href="jeu.css">
    <script src="jeu.js"></script>
</head>

<body>
    <h1>Début du jeu</h1>

<div>
    <table class="board1">
        <caption>Vos bateaux</caption>
    <?php table("P"); ?>
    </table>

    <table class="board2">
                <caption>Bateaux de l'adversaire</caption>
    <?php table(""); ?>
    </table>
</div>
<div id='res'> </div>
<div id="repPHP"></div>
<img id="restart" src="images/refresh.jpg" alt="reinitialiser" />



</body>

</html>
