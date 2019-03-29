window.onload=function(){
    let dimBoat=[6,4,3,2];
    let indexBoat=0;
    let tab = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let GameStarted=false;
    let PlayerBoat=[];
    let ordiBoat=[];
    let countCellBoat=0;

    let PlayerselectCase; //case selectionné par le joueur
     alert("choisissez le placement de vos bateaux - Placez un bateau de 6 cases");

     function GoodCase(id){ //modifie l'état d'une bonne case 
         let carre=document.getElementById(id);
         carre.style.backgroundColor="green";
     }

    function NeutreCase(id) { //modifie l'état d'une case neutre 
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "#87CEFA";
    }

    function BadCase(id) { //modifie l'état d'une mauvaise case
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "red";
    }

    function BoatCase(id){
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "grey";
        countCellBoat++;
    }

    function ID(n,m){ //chiffre et indice du tableau
        return (tab[m]+n).toString(); //retourne l'ID sous forme de String
    }

    function elemCommun(obj){
        let Commun0=obj.id[0];
        let Commun1 = obj.id[1];
        for(let i=0; i<PlayerBoat[indexBoat].length;i++){
            let valeur = PlayerBoat[indexBoat][i];
            if(valeur[0]!=Commun0&&valeur[1]!=Commun1){
                return false;
            }
        }
        return true;

    }

    function caseAdj(obj){

        for (let i=0; i<PlayerBoat[indexBoat].length; i++){
            let cell = PlayerBoat[indexBoat][i];
            if (cell[0] == obj.id[0] && Number(cell[1])+1 == obj.id[1]&&elemCommun(obj)){
                return true;
            }
            if (cell[0] == obj.id[0] && Number(cell[1])-1== obj.id[1]&&elemCommun(obj)) {
                return true;
            }
            if (tab[Number(tab.indexOf(cell[0]))+1] == obj.id[0] && cell[1] == obj.id[1] && elemCommun(obj)) {
                return true;
            }
            if (tab[Number(tab.indexOf(cell[0])) - 1] == obj.id[0] && cell[1] == obj.id[1] && elemCommun(obj)) {
                return true;
            }
        }
        return false;

    }

    function PlacerOrdi(){
        for(let i=0; i<dimBoat.length;i++){
            let lettre = tab[getRandomInt(10)];
            let chiffre = getRandomInt(10);
            
        }
    }

    //appeler au début pour que le joueur place ses bateaux
    function PlacerBateau(obj){
        if (PlayerBoat[indexBoat]!=null){
            if(caseAdj(obj)){
                PlayerBoat[indexBoat].push(obj.id);
                BoatCase(obj.id);
            }
            else{alert("Case non adjacente au bateau");}
        }
        else{
            PlayerBoat[indexBoat]=[obj.id];
            BoatCase(obj.id);
        }
        if (countCellBoat == dimBoat[indexBoat]) {
            indexBoat++;
            countCellBoat = 0;
            if(dimBoat[indexBoat]==null){
                GameStarted=true;
                alert(PlayerBoat);
            }
            else{
            alert("placez bateau de " + dimBoat[indexBoat] + " cases");}
        }
    }

    function replacer(){
        indexBoat = 0;
        GameStarted = false;
        PlayerBoat = [];
        ordiBoat = [];
        countCellBoat = 0;
        for (n = 0; n < 100; n++) {NeutreCase(board1[n].id);}
    }

    //vérifie si touché ou non
    function checkHit(){

    }

    if(!GameStarted){
        let restart=document.getElementById("restart");
        restart.onclick=replacer;
    }

    //crée un evenement de clic pour chaque case
    let board1=document.getElementsByClassName("cell");
    for (n = 0; n < 100; n++) {
            board1[n].onclick=function(){
                if(GameStarted){
                    
                }
                else{
                    PlacerBateau(this);}
            }
            
        
    }

}