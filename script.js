
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
$(document).ready(function(){

    //intercetto il tasto invio
    // $('#search').keypress(function(){
    //
    // })


  //intercetto il click sul pulsante
  $('#search').click(function(){

      // trovo il testo inserito dall'utente
      var filmCercato = $('#movies-text').val();

      //resetto l'input dopo aver cercato il film
      $('#movies-text').val('');
      //nascondo tutti i risultati ogni volta che mando una nuova ricerca
      $('.container').empty();
      // ad ogni clik faccio una chiamata ajax


//chiamata ajax per ottenere i film
      $.ajax({
          'url': 'https://api.themoviedb.org/3' + '/search/movie',
          'data': {
              'api_key': '6b3cd5d3e2b37d08e79608e6b6eaa004',
              'query': filmCercato
          },
          'method': 'GET',
          'success': function(data){

              var filmTrovati = data.results;

              stampaRisultati(filmTrovati);

          },
          'error': function(){
              alert('error');
          }

      });
      //chiamata ajax per ottenere le serie
      $.ajax({
          'url': 'https://api.themoviedb.org/3/search/tv',
          'data': {
              'api_key': '6b3cd5d3e2b37d08e79608e6b6eaa004',
              'query': filmCercato
          },
          'method': 'GET',
          'success': function(data){

              var serieTrovate = data.results;

              stampaRisultati(serieTrovate);

          },
          'error': function(){
              alert('error');
          }

      });

  });

});

function votoToStelle(votoTrovato){

    // ricavo il voto del film dato dal server e lo divido per due
    var voto_dec = votoTrovato / 2;
    // arrotondo il risultato per eccesso e ottengo un numero intero
    var voto_5 = Math.round(voto_dec);
    //creo una variabile vuota
    var votoStelle = '';

    //ciclo for per inerire le stelle nella variabile

    for (var j = 0; j < 5; j++) {
        if(j < voto_5){
           votoStelle = votoStelle + '<i class="fas fa-star full"></i>';

        } else {
            votoStelle = votoStelle + '<i class="far fa-star empty"></i>';

        }
    };
    return votoStelle;
};

function bandiere(linguaTrovata){

    if(linguaTrovata == 'en'){
        linguaTrovata = '<img class="flag eng"src="https://icon-icons.com/icons2/97/PNG/32/united_kingdom_flags_flag_17079.png" alt="bandiera inglese">'
    } else if(linguaTrovata == 'it') {
        linguaTrovata = '<img class="flag ita"src="https://cdn.icon-icons.com/icons2/97/PNG/32/italy_flags_flag_17018.png" alt="bandiera italiana">'
    } else if (linguaTrovata == 'es') {
        linguaTrovata = '<img class="flag spa"src="https://icon-icons.com/icons2/97/PNG/32/spain_flags_flag_17068.png" alt="bandiera spagnola">'
    } else if (linguaTrovata == 'ja') {
        linguaTrovata = '<img class="flag ja"src="https://icon-icons.com/icons2/97/PNG/32/japan_flags_flag_17019.png" alt="bandiera giapponese">'
    };
    return linguaTrovata;
};

function stampaRisultati(filmTrovati){

    for (var i = 0; i < filmTrovati.length; i++) {
        // predispongo le variabili di handlebars
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        var filmTrovato = filmTrovati[i];
        //verifico se il risultato ha come proprieta title o no
        if(filmTrovato.hasOwnProperty('title')){
            var titoloTrovato = filmTrovato.title;
            var titoloOriginaleTrovato = filmTrovato.original_title;
            var tipo = 'film';
        } else {
            var titoloTrovato = filmTrovato.name;
            var titoloOriginaleTrovato = filmTrovato.original_name;
            var tipo = 'serie';
        }
        var votoTrovato = filmTrovato.vote_average;


        var linguaTrovata = filmTrovato.original_language;

        var context = {
            titolo: '<h2>' + titoloTrovato + '</h2>',
            titolo_originale: titoloOriginaleTrovato,
            tipo: tipo,
            lingua: votoToStelle(votoTrovato),
            voto: bandiere(linguaTrovata)
        };
        console.log(context);

    var html = template(context);
        $('.container').append(html);

    };
};
