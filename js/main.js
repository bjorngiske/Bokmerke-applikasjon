//Send inn for skjema 
document.getElementById('myForm').addEventListener('submit', lagreBokmerke);

//Lagre bokmerke
function lagreBokmerke(e){
  //Hent skjemaverdier
  var sideNavn =document.getElementById('sideNavn').value;
  var sideURL =document.getElementById('sideURL').value;

  if(!validerSkjema(sideNavn, sideURL)){
    return false;
  }

  var bokmerke = {
    name: sideNavn,
    url: sideURL
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  //Test om bokmerkeen er null
  if(localStorage.getItem('bokmerker') === null){
    //Initaliser array
    var bokmerker = [];
    //Legg til array
    bokmerker.push(bokmerke);
    //Sett til localStorage
    localStorage.setItem('bokmerker', JSON.stringify(bokmerker));
  } else {
    //Hent bokmerker fra localStorage
    var bokmerker = JSON.parse(localStorage.getItem('bokmerker'));
    //Legg bokmerke til array
    bokmerker.push(bokmerke);
    //Sett tilbake til localStorage
    localStorage.setItem('bokmerker', JSON.stringify(bokmerker));
  }

  //Nullstill skjema
  document.getElementById('myForm').reset();

  //Gjenhet bokmerker
  hentBokmerker();

  //Forhindre fra å sende inn
  e.preventDefault();
}

//Slett bokmerke
function slettBokmerke(url){
  //Hent bokmerke fra localStorage
  var bokmerker = JSON.parse(localStorage.getItem('bokmerker'));
  //Løp gjennom bokmerkene
  for(var i =0;i < bokmerker.length;i++){
    if(bokmerker[i].url == url){
      //Fjern fra array
      bokmerker.splice(i, 1);
    }
  }
  //Sett tilbake til localStorage
  localStorage.setItem('bokmerker', JSON.stringify(bokmerker));

  //Gjenhent bokmerker
  hentBokmerker();
}

//Hent bokmerker 
function hentBokmerker(){
  //Hent bokmerker fra localStorage
  var bokmerker = JSON.parse(localStorage.getItem('bokmerker'));
  // Get output id
  //Hent output id
  var bokmerkeResultater = document.getElementById('bokmerkeResultater');

  // Bygg output
  bokmerkeResultater.innerHTML = '';
  for(var i = 0; i < bokmerker.length; i++){
    var name = bokmerker[i].name;
    var url = bokmerker[i].url;

    bokmerkeResultater.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+leggTilURL(url)+'">Visit</a> ' +
                                  ' <a onclick="slettBokmerke(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

//Valider skjema
function validerSkjema(sideNavn, sideURL){
  if(!sideNavn || !sideURL){
    alert('Vennligst fyll inn skjemaet');
    return false;
  }

  var uttrykk = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(uttrykk);

  if(!sideURL.match(regex)){
    alert('Vennligst fyll inn en gyldig URL');
    return false;
  }

  return true;
}

function leggTilURL(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}