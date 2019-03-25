window.onload=function(){
    let tab = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let GameStarted=false;
    let PlayerBoat=[];
    let ordiBoat=[];
    let PlayerselectCase; //case selectionné par le joueur
     alert("choisissez le placement de vos bateaux");

     function GoodCase(id){ //modifie l'état d'une bonne case 
         let carre=document.getElementById(id);
         carre.style.backgroundColor="green";
     }

    function BadCase(id) { //modifie l'état d'une mauvaise case
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "red";
    }

    function BoatCase(id){
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "grey";
    }

    function ID(n,m){ //chiffre et indice du tableau
        return (tab[m]+n).toString(); //retourne l'ID sous forme de String
    }


    //appeler au début pour que le joueur place ses bateaux
    function PlacerBateau(){
        PlayerBoat.push(this.id);
        alert(PlayerBoat);
    }

    //vérifie si touché ou non
    function check(){

    }

    //crée un evenement de clic pour chaque case
    for (n = 0; n < 10; n++) {
        for (m = 1; m <= 10; m++) {
            id=ID(m,n).toString();
            caseclick=document.getElementById(id);
            caseclick.onclick=function(){
                if(GameStarted){

                }
                else{PlacerBateau();}
            }
            
        }
    }

}