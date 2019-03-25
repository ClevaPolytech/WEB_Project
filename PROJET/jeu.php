<?php function table() {
        $tab=["A","B","C","D","E","F","G","H","I","J"];
		for($n=0; $n<10; $n++){
			echo "<tr>";

			for($m=1; $m<=10; $m++){
                echo "<td id=".$tab[$n].$m.">";
                echo $tab[$n].$m;
                
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
    <meta name="author" content="Clement Poueyto - Maëva Lecavelier">
    <link rel="stylesheet" href="jeu.css">
    <script src="jeu.js"></script>
</head>

<body>
    <h1>Début du jeu</h1>

<div>
    <table class="board1">
        <caption>Vos bateaux</caption>
    <?php table(); ?>
    </table>

    <table>
                <caption>Bateaux de l'adversaire</caption>
    <?php table(); ?>
    </table class="board2">
</div>

    
    
</body>

</html>