window.onload=function(){
    let dimBoat=[6,4,3,2];
    let indexBoat=0;
    let tab = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let GameStarted=false;
    let PlayerBoat=[];
    let ordiBoat=[];
    let ordiCoup=[];
    let touche=[false,"X"];
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

    function caseAdj(obj,joueur){
        let tableau;
        if (joueur == "player") { tableau = PlayerBoat[indexBoat];}
        else{tableau=lastTour[1];}

        for (let i=0; i<tableau.length; i++){
            let cell =tableau[i];
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

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function PlacerOrdi(){
        /*for(let i=0; i<dimBoat.length;i++){
            while(val0-dimBoat[i]<0){
                let val0 = tab[getRandomInt(10)];
                }
                
                let chiffre = 0;
                ordiBoat.push([val0 + chiffre]);
                alert(ordiBoat);
                for (let j = 0; j < dimBoat[i]; j++) {

            }
            
        }*/
        ordiBoat = ["A3", "B3", "C3", "D3", "E3", "F3", "C6", "C7", "C8", "C9", "G6", "H6", "I6", "I2", "I3"];
    }

    function ordiIA(){
        let verif=false;
        let coup=aleatoire();
        /*if(lastTour[0]==false){
            while (verif == false){
                coup = aleatoire();
                verif=caseAdj(coup,"ordi");
            }
            checkHit(coup,"ordi");
        }
        else{*/
            let ordiCell=document.getElementById(coup+"P");
            checkHit(ordiCell,"ordi");
        //}
    }

    function aleatoire(){
        let val0 = tab[getRandomInt(10)];
        let val1 = getRandomInt(10);
        while(ordiCoup.indexOf(val0+val1)!==-1){
            val0 = tab[getRandomInt(10)];
            val1 = getRandomInt(10);}
        return val0+val1;
        }

    //appeler au début pour que le joueur place ses bateaux
    function PlacerBateau(obj){
        if (PlayerBoat[indexBoat]!=null){
            if(caseAdj(obj,"player")){
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
                main();
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
    function checkHit(obj,joueur){
        if(ordiBoat.indexOf(obj.id)<0&&joueur=="player"){
            BadCase(obj.id);
            
        }
        
        else if (PlayerBoat[3].indexOf(obj.id) < 0 &&PlayerBoat[2].indexOf(obj.id) < 0 &&PlayerBoat[1].indexOf(obj.id) < 0 &&PlayerBoat[0].indexOf(obj.id) < 0 && joueur == "ordi") {
            alert(obj.id);
            BadCase(obj.id);
            touche[0] = false;
            ordiCoup.push(obj.id);
        }
        else{
            GoodCase(obj.id);
            if(joueur=="player"){ordiBoat.splice(ordiBoat.indexOf(obj.id),1);}
            else { PlayerBoat.splice(PlayerBoat.indexOf(obj.id), 1);
                touche[1]=obj.id;
                touche[0]=true;
                ordiCoup.push(obj.id);}
        }
    }
    PlacerOrdi();
    if(!GameStarted){
        let restart=document.getElementById("restart");
        restart.onclick=replacer;
    //crée un evenement de clic pour chaque case
        let board1=document.getElementsByClassName("cell");
        for (n = 0; n < 100; n++) {
            board1[n].onclick=function(){
            if(GameStarted==false){
                PlacerBateau(this);
                }
                
            }
        }
    }

    function main(){
        let board2 = document.getElementsByClassName("cell");
        for (n = 100; n < 200; n++) {
            board2[n].onclick = function () {
            alert(this.id);
            checkHit(this,"player");
            ordiIA();
            }
        }
    }
}