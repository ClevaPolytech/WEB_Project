<?php
  $case = $_GET['id'];
  // fonctionne pareil que is_taken dans placerOrdi.php
  function getStatus($case){
    $linesIni = file("./bateauxOrdi.csv");
    $linesFin = $linesIni;
    for($i = 0; $i < sizeof($linesIni); $i++){
      $cases = explode(",",$linesIni[$i]);
      array_pop($cases);
      if(in_array($case, $cases)){
        $index = array_search($case, $cases);
        unset($cases[$index]);
        if($cases == []){
          $linesFin[$i] = implode(",",$cases);
                  $linesFin[$i] .= ",\n";
          replaceContent("./bateauxOrdi.csv", $linesFin);
          return 'c';
        }
        $linesFin[$i] = implode(",",$cases);
        $linesFin[$i] .= ",\n";
        replaceContent("./bateauxOrdi.csv", $linesFin);
        return 't';
      }
    }
    return 'o';
  }

  function replaceContent($file, $tab){
    file_put_contents($file, "");
    foreach($tab as $line){
      file_put_contents($file, $line, FILE_APPEND);
    }
  }

  echo(getStatus($case));

 ?>
