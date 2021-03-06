<?php
function affiche_tab(){
  $infos = ["nom","temps (s)", "nombre de coups", "nombre de partie jouées"];
  $file="score.csv";
  echo "<caption> SCORES </caption>";
  echo "<tr> \n";
  for($i = 0; $i < sizeof($infos); $i++){
    echo "<th>";
    echo $infos[$i];
    echo "</th> \n";
  }
  echo "</tr> \n";
  foreach(file($file) as $line){
    echo "<tr> \n";
    $token=explode(";",$line);
		foreach($token as $value){
      echo "<td>";
      echo $value;
      echo "</td> \n";
		}
		echo "</tr> \n";
  }
}
 ?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Projet</title>
    <meta name="author" content="Clement Poueyto - Maëva Lecavelier">
    <link rel="stylesheet" href="index.css">
    <script src="index.js"></script>

</head>

<body>
    <div>
        <ul class="menu">
            <li> <a href="jeu.php"> Jeu </a></li>
            <li> <a href="index.php"> A propos du jeu </a></li>
            <li> <a href="equipe.html"> Notre équipe </a></li>
        </ul>
    </div>
    <div class="heading">
        <h1> A propos du jeu </h1>
    </div>
    <div class="intro">
        <p>
            Voici notre projet d'ADW : une bataille navale.
            Rappelons tout d'abord les règles.
            <br>
            Le but du jeu est de détruire tous les navires de
            l'adversaire. Pour ce faire, la partie se déroule en 2 phases :
            <ul>
                <li> La première phase est celle du placement des bâteaux.
                    C'est la plus importante, car l'emplacement de vos navires détermine
                    votre stratégie défensive ! Pour notre version de la bataille navale,
                    vous avez 10 bâteaux à placer : un de 5 cases, deux de 4 cases, trois de
                    3 cases et quatre de 2 cases.
                    Pendant ce temps, l'adversaire pose également ces vaisseaux.
                </li>
                <li> Ensuite vient la phase de jeu. Elle est elle même séparée en deux parties.
                    Aléatoirement, un joueur va commencer. Il sélectionne une case et tire un boulet
                    de canon vers cette case. S'il touche un bâteau, c'est bien joué ! En effet, c'est là
                    que commence la stratégie offensive.
                    Une fois que le premier joueur à tirer, c'est à son adversaire de jouer.
                </li>
            </ul>
            Un bâteau est considéré détruit, quand chacune des cases sur lesquelles est ce bâteau ont été
            visées par l'autre joueur.
            La partie se termine lorsqu'un des joueurs a tous ses navires détruits. Dans ce cas là,
            c'est son adversaire, donc le joueur ayant détruit tous les navires, qui est déclaré vainqueur.
        </p>
        <p>
            Alors, prêt pour une partie ?
            <br>
            <img id="start" src="images/start.png" alt="start" />
        </p>
    </div>
    <div class="score">
      <table>
        <?php affiche_tab() ?>
      </table>
      <img src="images/Bataille_navale.jpg" alt="image bateau" />
    </div>
</body>

</html>
