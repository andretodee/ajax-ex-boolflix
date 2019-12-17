
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
$(document).ready(function(){

    //intercetto il tasto invio
    // $('#search').keypress(function(){
    //
    // })


  //intercetto il click sul pulsante
  $('#search').click(function(){
      // predispongo le variabili di handlebars
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      // trovo il testo inserito dall'utente
      var filmCercato = $('#movies-text').val();

      //resetto l'input dopo aver cercato il film
      $('#movies-text').val('');
      //nascondo tutti i risultati ogni volta che mando una nuova ricerca
      $('.container').empty();
      // ad ogni clik faccio una chiamata ajax



      $.ajax({
          'url': 'https://api.themoviedb.org/3/search/movie',
          'data': {
              'api_key': '6b3cd5d3e2b37d08e79608e6b6eaa004',
              'query': filmCercato
          },
          'method': 'GET',
          'success': function(data){

             var filmTrovati = data.results;
             // //trasformo il voto ottenuto dal server in un sumero da 1 a 5
             // var voto_5 = voto_10 / 2;
             // console.log(voto_5);


             for (var i = 0; i < filmTrovati.length; i++) {
                 var filmTrovato = filmTrovati[i];
                 // ricavo il voto del film dato dal server e lo divido per due
                 var voto_dec = filmTrovato.vote_average / 2;
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

                 // bandiere

                 if(filmTrovato.original_language == 'en'){
                     filmTrovato.original_language = '<img class="flag eng"src="https://icon-icons.com/icons2/97/PNG/32/united_kingdom_flags_flag_17079.png" alt="bandiera inglese">'
                 } else if(filmTrovato.original_language == 'it') {
                     filmTrovato.original_language = '<img class="flag ita"src="https://cdn.icon-icons.com/icons2/97/PNG/32/italy_flags_flag_17018.png" alt="bandiera italiana">'
                 } else if (filmTrovato.original_language == 'es') {
                     filmTrovato.original_language = '<img class="flag spa"src="https://icon-icons.com/icons2/97/PNG/32/spain_flags_flag_17068.png" alt="bandiera spagnola">'
                 } else if (filmTrovato.original_language == 'ja') {
                     filmTrovato.original_language = '<img class="flag ja"src="https://icon-icons.com/icons2/97/PNG/32/japan_flags_flag_17019.png" alt="bandiera giapponese">'
                 };








                 var context = {
                     titolo: filmTrovato.title,
                     titolo_originale: filmTrovato.original_title,
                     lingua: filmTrovato.original_language,
                     voto: votoStelle
                 };
                 console.log(context);




                 var html = template(context);
                 $('.container').append(html);

             };

          },
          'error': function(){
              alert('error');
          }





      });



  });
  // function cerca_api (){
  //
  //
  // };

});
