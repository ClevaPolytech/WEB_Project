<?php

  $bateaux = [[1,2,3,4,5,6],[1,2,3,4], [1,2,3], [1,2]];
  $file = "./bateauxOrdi.csv";
  file_put_contents($file, "");

  function placerBateauxOrdi($bateaux){
    foreach($bateaux as $bateau){
      $long = sizeof($bateau);
      $sens = aleatoireSens();
      $lettre = aleatoireLettre($long);
      $chiffre = aleatoireChiffre();
      $id = $lettre.$chiffre;
      while(!isPossible($bateau, $sens, $id)){
        $sens = aleatoireSens();
        $lettre = aleatoireLettre($long);
        $chiffre = aleatoireChiffre();
        $id = $lettre.$chiffre;
      }
      placerBateauOrdi($bateau, $sens, $id);
    }
  }

  //permet de placer un bateau
  function placerBateauOrdi($boat, $sens, $id){
    $file = "./bateauxOrdi.csv";
    $lettre = $id[0];
    $chiffre = $id[1];
    for($cpt = 0; $cpt < sizeof($boat); $cpt++){
      file_put_contents($file, $lettre.$chiffre.",", FILE_APPEND);
      if($sens == 'h'){
        $chiffre++;
      }
      else{
        $lettre++;
      }
    }
    file_put_contents($file, "\n", FILE_APPEND);
  }

  //tire aleatoire un sens entre vertical et horizontal
  function aleatoireSens(){
    $sens = ['h','v'];
    $x = rand(0,1);
    return $sens[$x];
  }

  //tire aleatoirement une lettre en A et J
  function aleatoireLettre($long){
    $lettres = ["A","B","C","D","E","F","G","H","I","J"];
    $x = rand(0,9-$long);
    return $lettres[$x];
  }

  //tire aleatoirement un chiffre entre 0 et 9
  function aleatoireChiffre(){
      $x = rand(0,9);
      return $x;
    }

  // verifie si le bateau proposé est "posable" (ne depasse pas de la map)
  function isPossible($bateau, $sens, $id){
    $lettre = $id[0];
    $chiffre = $id[1];
    $long = sizeof($bateau);
    if($sens == 'h'){
      for($cpt = 1; $cpt <$long; $cpt++){
        // on incrémente la lettre
        $chiffre++;
        //on vérifie qu'il n'y ait pas deja un bateau sur cette case
        $case = $lettre.$chiffre;
        if(is_taken($case)){
          return false;
        }
      }
      return ($chiffre <= 9);
    }
    else{
      for($cpt = 1; $cpt <$long; $cpt++){
        // on incrémente la lettre
        $lettre++;
        //on vérifie qu'il n'y ait pas deja un bateau sur cette case
        $case = $lettre.$chiffre;
        if(is_taken($case)){
          return false;
        }
      // on vérifie si la dernière n'est pas supérieure à la derniere de la map
      return ($lettre < 'K');
      }
    }
  }

  function is_taken($case){
    $lines = file("./bateauxOrdi.csv");
    foreach($lines as $line){
      $cases = explode(",",$line);
      if(in_array($case, $cases)){
        return true;
      }
    }
    return false;
  }

placerBateauxOrdi($bateaux);

?>
