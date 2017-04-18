// Previsão do tempo
// Variáveis globais
var previsao = localStorage.getItem("p_previsao");
var localizacao;
var latitude;
var longitude;

if (previsao === "0") {
  var campotempo = document.getElementById("previsaodotempo");
  campotempo.style.display = "none";

} else if (previsao === "1" || previsao === null) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

      var onSuccess = function(position) {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        var geocoder = new google.maps.Geocoder();

        var latLng = new google.maps.LatLng(latitude,longitude);

      $(function(){
           geocoder.geocode({       
                latLng: latLng     
                }, 
                function(responses) 
                {     
                   if (responses && responses.length > 0) 
                   {        
                      localizacao = objToString(responses[6].formatted_address);

                      $.simpleWeather({
                      location: localizacao,
                      woeid: "",
                      unit: "c",
                      success: function(weather) {

                        $( ".cidade" ).html(localizacao);

                        $( ".tempo" ).addClass( 'previsao-'+weather.code);

                        html = '<h2><i class="weathericon icon-'+weather.code+'"></i> '+weather.temp+'<span>&deg; '+weather.units.temp+'</span></h2>';
                        html += '<div class="mais-infos"><p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="none" d="M0 0h48v48H0V0z"/><path fill="#ffffff" d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"/></svg> '+ weather.high +'&deg;</p><p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="none" d="M0 0h48v48H0V0z"/><path fill="#ffffff" d="M40 24l-2.82-2.82L26 32.34V8h-4v24.34L10.84 21.16 8 24l16 16 16-16z"/></svg>'+ weather.low +'&deg;</p></div>';
                    
                        $(".tempo").html(html);
                      },
                      error: function(error) {
                        $(".tempo").html('<p>'+error+'</p>');
                      }
                    });
                   } 
                   else 
                   {       
                     $("#previsaodotempo").html('<p class="tempo-alerta">Tivemos algum problema ao tentar exibir a previsão do tempo.</p>');   
                     //$(".tempo").html(latitude + "," + longitude);
                   }   
                }
            );
   
        });
      };

    function onError(error) {
        $("#previsaodotempo").html('<p class="tempo-alerta">Tivemos algum problema ao tentar obter sua localização. Em alguns aparelhos é necessário ir em configurações e ativar o Acesso à localização.<br/><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path fill="#757575" d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm17.88 6C40.96 13.66 34.34 7.04 26 6.12V2h-4v4.12C13.66 7.04 7.04 13.66 6.12 22H2v4h4.12c.92 8.34 7.54 14.96 15.88 15.88V46h4v-4.12c8.34-.92 14.96-7.54 15.88-15.88H46v-4h-4.12zM24 38c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z"/></svg></p>');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    
  }

  /* Funcção auxiliar, converte objeto para string */

  function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += obj[p];
        }
    }
    return str;
}

/* FEEDS DA PÁGINA PRINCIPAL */

google.load("feeds", "1") //Load Google Ajax Feed API (version 1)

var ultimasnoticias=document.getElementById("ultimasnoticias");

/* váriaveis google feed api */
var feedurl;
var feedlimit;


if (localStorage.getItem("p_ultimasnoticias") === null) {
  feedurl = "http://www.bbc.com/portuguese/topicos/brasil/index.xml";
} else {

  var siteescolhido = localStorage.getItem("p_ultimasnoticias");

  
  if(siteescolhido==="BBC") {
    feedurl="http://www.bbc.com/portuguese/topicos/brasil/index.xml";
  }
  if(siteescolhido==="G1") {
    feedurl="http://g1.globo.com/dynamo/rss2.xml";
  }
  if(siteescolhido==="Uol") {
    feedurl="http://rss.uol.com.br/feed/noticias.xml";
  }
  if(siteescolhido==="Folha") {
          feedurl="http://feeds.folha.uol.com.br/folha/brasil/rss091.xml";
  }
  if(siteescolhido==="R7") {
          feedurl="http://noticias.r7.com/brasil/feed.xml";
  }
  if(siteescolhido==="OTempo") {
          feedurl="http://www.otempo.com.br/cmlink/mundo-1.650236";
  }
  
}

if (localStorage.getItem("p_numeronoticias") === null) {
  feedlimit = 20;
  //console.log(feedlimit);
} else {
  feedlimit = localStorage.getItem("p_numeronoticias");
  //console.log(feedlimit);
}

var rssoutput="<ul class='lista-noticias'>";

function rssfeedsetup(){
    var feedpointer=new google.feeds.Feed(feedurl) //Google Feed API method
    feedpointer.setNumEntries(feedlimit) //Google Feed API method
    feedpointer.load(displayfeed) //Google Feed API method

}

function displayfeed(result){
    if (!result.error){
        var thefeeds=result.feed.entries;
        var url;
        var titulo;

        for (var i=0; i<thefeeds.length; i++) {

            // Data
            var pubDate = thefeeds[i].publishedDate;
            var date = new Date(pubDate);
            var months = Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "July", "August", "September", "October", "November", "December");
            var string = date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear()  + " às "  + date.getUTCHours() + ":" +  date.getUTCMinutes();
            
            url = '"'+thefeeds[i].link+'"';
            titulo = '"'+thefeeds[i].title+'"';

            rssoutput+="<li><a href='#abrelink' onclick='abreurl("+url+","+titulo+")' data-rel='dialog' data-transition='pop'><h2>" + thefeeds[i].title + "</h2><time>" + string +"</time> <p>" + thefeeds[i].contentSnippet +"</p></a></li>";
        }

        rssoutput+="</ul>";
        ultimasnoticias.innerHTML=rssoutput;
        
    }
    else
     rssoutput="<ul class='lista-noticias'><li>Não conseguimos encontrar essa fonte de notícias</li></ul>";
    }


window.onload=function(){
    rssfeedsetup()
}

function abreurl(url, titulo){



    var compartilhar = document.getElementById("btn-compartilhar");

    compartilhar.setAttribute("onclick", "window.plugins.socialsharing.share('"+titulo+" - Lida no app Notícias Agora', null, null, '"+url+"')");


    $(".mostra-noticia").html(' <iframe src='+url+' height="100%" width="100%" class="visualizador"></iframe>');
}

// Animação rotação

function rotateAnimation(id){
  var el = document.getElementById(id);

  el.setAttribute("class", "animacao_rotacao");

  setTimeout(function(){ location.reload(); }, 1000);
}

// Menu

$( document ).on( "pagecreate", "#page-inicial", function() {
    $( document ).on( "swipeleft swiperight", "#page-inicial", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft" ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});
