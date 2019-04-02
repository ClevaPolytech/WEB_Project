window.onload=function(){
    let dimBoat=[6,4,3,2]; //taille des bateaux
    let indexBoat=0;
    let tabLettre = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]; //tableau de la colonne
    let GameStarted=false;
    let PlayerBoats=[]; //stock la position des bateaux du joueur
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

//-----------------------------------------------------------------------------//

/*          GESTION DE L'ETAT DES CASE          */

    //modifie l'état d'une bonne case
    function GoodCase(id){
         let carre=document.getElementById(id);
         carre.style.backgroundColor="green";
     }

     //modifie l'état d'une case neutre
    function NeutreCase(id) {
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "#87CEFA";
    }

    //modifie l'état d'une mauvaise case
    function BadCase(id) {
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "red";
    }

    //indique qu'une case contient un bateau
    function BoatCase(id){
        let carre = document.getElementById(id);
        carre.style.backgroundColor = "grey";
        countCellBoat++;
    }

//---------------------------------------------------------------------//

/*          PHASE DE PLACEMENT            */

  //vérifie si l'élément cellClicked forme "une ligne droite" avec les autres cases du bateau en cours de placement
  function elemCommun(cellClicked){
    let Commun0 = cellClicked.id[0]; //récupère la lettre de l'ID
    let Commun1 = cellClicked.id[1]; //récupère le chiffre de l'ID
    // on parcourt le tableau de l'index
    for(let i=0; i<PlayerBoats[indexBoat].length;i++){
      let valeur = PlayerBoats[indexBoat][i];
      if(valeur[0]!=Commun0&&valeur[1]!=Commun1){
        return false;
      }
    }
    return true;
  }

  //verifie si une case est adjacente a une autre
  function caseAdj(cellClicked,joueur){
    let caseDessus;
    let caseDessous;
    let caseDroite;
    let caseGauche;
    let cellLettre;
    let cellChiffre;
    for (let i = 0; i < PlayerBoats[indexBoat].length; i++){
      let cell = PlayerBoats[indexBoat][i]; //de la forme lettreChiffre (A6, B4...)
      cellLettre = cell[0];
      cellChiffre = cell[1];
      /*vérifie, si la case cliquée est adjacente au bateau en cours de placement. On parcourt toutes les cellules déjà cliquées.
      Vérifie :
        * 1er cas :
          - Si la lettre de la ième case correspond à la lettre de la case cliquée ET
          - Si le chiffre de la ième case +1 correspond au chiffre de la case cliquée ET
          - Si les précédentes cases du bateau et la nouvelle forment une ligne droite
        * OU 2ème cas :
          - Si la lettre de la ième case correspond à la lettre de la case cliquée ET
          - Si le chiffre de la ième case -1 correspond au chiffre de la case cliquée ET
          - Si les précédentes cases du bateau et la nouvelle forment une ligne droite
        * OU 3ème cas :
          - Si la lettre de la ième case "+1" (suivante dans l'alphabet) correspond à la lettre  de la case cliquée ET
          - Si le chiffre de la ième case  correspond au chiffre de la case cliquée ET
          - Si les précédentes cases du bateau et la nouvelle forment une ligne droite
        * OU 4ème cas :
          - Si la lettre de la ième case "-1" (précédente dans l'alphabet) correspond à la lettre de la case cliquée ET
          - Si le chiffre de la ième case  correspond au chiffre de la case cliquée ET
          - Si les précédentes cases du bateau et la nouvelle forment une ligne droite
      Sinon, ça renvoie false;
      */
      //1er cas
      if (cellLettre == cellClicked.id[0]  &&   Number(cellChiffre)+1 == cellClicked.id[1]  &&  elemCommun(cellClicked)){
        return true;
      }
      //2ème cas
      if (cellLettre == cellClicked.id[0] && Number(cellChiffre)-1== cellClicked.id[1] && elemCommun(cellClicked)) {
        return true;
      }
      //3ème cas
      if (tabLettre[Number(tabLettre.indexOf(cellLettre))+1] == cellClicked.id[0] && cellChiffre == cellClicked.id[1] && elemCommun(cellClicked)) {
        return true;
      }
      //4ème cas
      if (tabLettre[Number(tabLettre.indexOf(cellLettre)) - 1] == cellClicked.id[0] && cellChiffre == cellClicked.id[1] && elemCommun(cellClicked)) {
        return true;
      }
    }
    return false;
  }

  function PlacerOrdi(){ //place les bateaux de l'ordinateur
    for(let i = 0; i < dimBoat; i++){

    }
    ordiBoat = ["A3", "B3", "C3", "D3", "E3", "F3", "C6", "C7", "C8", "C9", "G6", "H6", "I6", "I2", "I3"];
  }

    //appeler au début pour que le joueur place ses bateaux
  function PlacerBateau(cellClicked){
    if (PlayerBoats[indexBoat]!=null){
      if(caseAdj(cellClicked,"player")){
        PlayerBoats[indexBoat].push(cellClicked.id);
        BoatCase(cellClicked.id);
      }
      else{
        alert("Case non adjacente au bateau");
      }
    }
    else{
      PlayerBoats[indexBoat]=[cellClicked.id];
      BoatCase(cellClicked.id);
    }
    if (countCellBoat == dimBoat[indexBoat]) { //crée un tableau pour chaque bateau
      indexBoat++;
      countCellBoat = 0;
      if(dimBoat[indexBoat]==null){
        GameStarted=true;
        main();
      }
      else{
        alert("placez bateau de " + dimBoat[indexBoat] + " cases");
      }
    }
  }

//---------------------------------------------------------------------//

/*          PHASE DE JEU            */

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

  function coupPossible(id){
    coupsPossible=[];
    let caseDroite = Number(tabLettre.indexOf(id[0])) + 1;
    let caseGauche = Number(tabLettre.indexOf(id[0])) - 1;
    if (ordiCoup.includes(tabLettre[caseDroite] + id[1] + "P") == false && typeof(tabLettre[caseDroite])!=="undefined"){
      coupsPossible.push(tabLettre[caseDroite] + id[1]+"P");
    }
    if (ordiCoup.includes(tabLettre[caseGauche] + id[1] + "P") == false && typeof(tabLettre[caseGauche]) !== "undefined"){
      coupsPossible.push(tabLettre[caseGauche] + id[1]+"P");
    }
    if (ordiCoup.includes(id[0] + (Number(id[1]) - 1) + "P") == false && (Number(id[1]) - 1)>0){
      coupsPossible.push(id[0] + (Number(id[1]) - 1)+"P");
    }
    if (ordiCoup.includes(id[0] + (Number(id[1]) + 1) + "P") == false && (Number(id[1]) + 1)<10){
      coupsPossible.push(id[0]+(Number(id[1])+1)+"P");
    }
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
    let val0 = tabLettre[getRandomInt(10)];
    let val1 = getRandomInt(10);
    while(ordiCoup.includes(val0+val1+"P")==true){
      val0 = tabLettre[getRandomInt(10)];
      val1 = getRandomInt(10);}
    return val0+val1;
  }

  function chronometre(){chrono ++;}

  function replacer(){ //reinitialise le placement des bateaux
    indexBoat = 0;
    GameStarted = false;
    PlayerBoats = [];
    ordiBoat = [];
    countCellBoat = 0;
    for (n = 0; n < 100; n++) {NeutreCase(board1[n].id);}
  }

  //vérifie si touché ou non
  function checkHit(cellClicked,joueur){
    if (joueur == "player"&&ordiBoat.includes(cellClicked.id)==false){ //si le joueur ne touche pas
      BadCase(cellClicked.id);
    }
    //si l'ordinateur ne touche pas
    else if (PlayerBoats[3].indexOf(cellClicked.id)==-1 &&PlayerBoats[2].indexOf(cellClicked.id)==-1 &&PlayerBoats[1].indexOf(cellClicked.id)==-1 &&PlayerBoats[0].indexOf(cellClicked.id)==-1 && joueur == "ordi") {
      BadCase(cellClicked.id);
      ordiCoup.push(cellClicked.id);
    }
    else{
      GoodCase(cellClicked.id);
      if(joueur=="player"){playerBonCoup.push(cellClicked.id);}//si le joueur touche
      else {//si l'ordinateur touche
        ordiBonCoup.push(cellClicked.id);
        touche[1]=cellClicked.id;
        touche[0]=true;
        ordiCoup.push(cellClicked.id);
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

  function begin(){
    PlacerOrdi(); //place les bateaux de l'ordinateur aléatoirement
    if(!GameStarted){
      let restart = document.getElementById("restart");
      restart.onclick=replacer;
      //crée un evenement de clic pour chaque case
      let board1=document.getElementsByClassName("cell");
      for (n = 0; n < 100; n++) {
        board1[n].onclick=function(){
          if(GameStarted==false){
            PlacerBateau(this);
            if (this.style.backgroundColor == "grey") {
              this.onclick=function(){void(0);};
            }// si une case a deja été sélectionnée alors elle n'est plus cliquable
          }
        }
      }
    }
  }

  begin();
};
