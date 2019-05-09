<?php 
$name=$_POST["name"];
$temps=$_GET["temps"];
$coups=$_GET["coups"];
$pathFile="score.csv";
$array=[];

function create_array($file) {
		$tab=[];
		foreach (file($file) as $line) {
            $token=explode(";",$line);
			if(!empty($token)){
			$tab[array_shift($token)]=$token;}
		}
		return $tab;
		}

function save_array($array,$pathFile) {
		$buffer="";
		$token=explode(".",$pathFile);
		if($token[1]=="csv" && is_array($array)){
			foreach ($array as $id => $info) {
				$buffer.=$id;
				if(is_array($info)){
					foreach ($info as $value) {
						if($value!=" "){
						$buffer.=";".$value;}
					}
				}
            }
	
	file_put_contents($pathFile,$buffer);}
}

$array=create_array($pathFile);
if(isset($array[$name])){
        if($array[$name][0]>$temps){
            $array[$name][0]=$temps;
        }
        if($array[$name][1]>$coups){
            $array[$name][1]=$coups;
        }
		(int)$array[$name][2]=(int)$array[$name][2]+(int)1;
		$array[$name][2]=strval($array[$name][2])."\n";
}

else{
    $array[$name]=[$temps,$coups,"1"."\n"];
    }

save_array($array,$pathFile);
header('Location: index.php');
exit;
?>