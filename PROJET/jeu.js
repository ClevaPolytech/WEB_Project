window.onload=function(){
    let dimBoat=[6,4,3,2]; //taille des bateaux
    let indexBoat=0;
    let tab = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]; //tableau de la colonne
    let GameStarted=false;
    let PlayerBoat=[]; //stock la position des bateaux du joueur
    let ordiBoat=[]; //stock la position des bateaux de l'ordinateur
    let ordiCoup=[]; //l'ensemble des coups joués par l 'ordinateur
    let ordiBonCoup=[]; //ensemble des coups "touché" par l'ordinateur
    let playerBonCoup=[]; //ensemble des coups "touhés" par le joueur
    let coupsPossible=[];//ensemble des coups réalisable par l'ordi
    let touche=[false,"XX"];
    let countCellBoat=0;
    let playerCoup=0;
    let chrono=0;

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

    function elemCommun(obj){ //vérifie si l'élément obj (case) a un attribut commun avec les autres cases
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

    function caseAdj(obj,joueur){ //verifie si une case est adjacente a une autre
        for (let i = 0; i < PlayerBoat[indexBoat].length; i++){
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

    function checkWin(){ //vérifie les conditions de victoire
        if(ordiBonCoup.length==15){
            document.location.href = "endGame.php?victory=ordi&temps="+chrono+"&coups="+ ordiCoup.length;
        }
        else if(playerBonCoup.length==15){
            document.location.href = "endGame.php?victory=player&temps="+ chrono + "&coups=" + playerCoup;
        }
    }

    function getRandomInt(max) { //renvoie une valeur aléatoire
        return Math.floor(Math.random() * Math.floor(max));
    }

    function PlacerOrdi(){ //place les bateaux de l'ordinateur
        
        ordiBoat = ["A3", "B3", "C3", "D3", "E3", "F3", "C6", "C7", "C8", "C9", "G6", "H6", "I6", "I2", "I3"];
    }

    function coupPossible(id){
        coupsPossible=[];
        if (ordiCoup.includes(tab[Number(tab.indexOf(id[0])) + 1] + id[1] + "P") == false && typeof(tab[Number(tab.indexOf(id[0])) + 1])!=="undefined"){
            coupsPossible.push(tab[Number(tab.indexOf(id[0])) + 1] + id[1]+"P");}
        if (ordiCoup.includes(tab[Number(tab.indexOf(id[0])) - 1] + id[1] + "P") == false && typeof(tab[Number(tab.indexOf(id[0])) - 1]) !== "undefined"){
            coupsPossible.push(tab[Number(tab.indexOf(id[0])) - 1] + id[1]+"P");}
        if (ordiCoup.includes(id[0] + (Number(id[1]) - 1) + "P") == false && (Number(id[1]) - 1)>0){
            coupsPossible.push(id[0] + (Number(id[1]) - 1)+"P");}
        if (ordiCoup.includes(id[0] + (Number(id[1]) + 1) + "P") == false && (Number(id[1]) + 1)<10){
            coupsPossible.push(id[0]+(Number(id[1])+1)+"P");}
        if (coupsPossible.length > 0) {
            return true;}
    
        else{touche[0]=false;
            return false;}
    }

    function ordiIA(){ //structure du jeu de l'ordinateur
        let ordiCell;
        let coup=aleatoire();
        if (touche[0] == true && coupPossible(touche[1])){
            ordiCell=document.getElementById(coupsPossible[0]);
            checkHit(ordiCell,"ordi");
        }
        else{
            ordiCell=document.getElementById(coup+"P");
            checkHit(ordiCell,"ordi");
        }
    }

    function aleatoire(){ //renvoie l'ID d'une case aléatoire 
        let val0 = tab[getRandomInt(10)];
        let val1 = getRandomInt(10);
        while(ordiCoup.includes(val0+val1+"P")==true){
            val0 = tab[getRandomInt(10)];
            val1 = getRandomInt(10);}
        return val0+val1;
        }
    function chronometre(){chrono ++;}

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
        if (countCellBoat == dimBoat[indexBoat]) { //crée un tableau pour chaque bateau
            indexBoat++;
            countCellBoat = 0;
            if(dimBoat[indexBoat]==null){
                GameStarted=true;
                main();
            }
            else{
            alert("placez bateau de " + dimBoat[indexBoat] + " cases");}
        }
    }

    function replacer(){ //reinitialise le placement des bateaux
        indexBoat = 0;
        GameStarted = false;
        PlayerBoat = [];
        ordiBoat = [];
        countCellBoat = 0;
        for (n = 0; n < 100; n++) {NeutreCase(board1[n].id);}
    }

    //vérifie si touché ou non
    function checkHit(obj,joueur){
        if (joueur == "player"&&ordiBoat.includes(obj.id)==false){ //si le joueur ne touche pas
            BadCase(obj.id);
    
        }
        //si l'ordinateur ne touche pas
        else if (PlayerBoat[3].indexOf(obj.id)==-1 &&PlayerBoat[2].indexOf(obj.id)==-1 &&PlayerBoat[1].indexOf(obj.id)==-1 &&PlayerBoat[0].indexOf(obj.id)==-1 && joueur == "ordi") {
            BadCase(obj.id);
            ordiCoup.push(obj.id);
        }
        else{
            GoodCase(obj.id);
            if(joueur=="player"){playerBonCoup.push(obj.id);}//si le joueur touche
            else {//si l'ordinateur touche
                ordiBonCoup.push(obj.id);
                touche[1]=obj.id;
                touche[0]=true;
                ordiCoup.push(obj.id);
            }
        }
    }


    PlacerOrdi(); //place les bateaux de l'ordinateur aléatoirement
    if(!GameStarted){
        let restart=document.getElementById("restart");
        restart.onclick=replacer;
    //crée un evenement de clic pour chaque case
        let board1=document.getElementsByClassName("cell");
        for (n = 0; n < 100; n++) {
            board1[n].onclick=function(){
            if(GameStarted==false){
                PlacerBateau(this);
                if (this.style.backgroundColor == "grey") { this.onclick=function(){void(0);};}// si une case a deja été sélectionnée alors elle n'est plus cliquable
                }
                
            }
        }
    }

    function main(){ //structure déroulement partie
        setInterval(chronometre,1000);
        let board2 = document.getElementsByClassName("cell");
        for (n = 100; n < 200; n++) {
            board2[n].onclick = function () {
            checkHit(this,"player");
            playerCoup++;
            checkWin();
            if (this.style.backgroundColor == "red" || this.style.backgroundColor == "green") { this.onclick = function () { void (0); }; }
            ordiIA();
            checkWin();
            }
        }
    }
}