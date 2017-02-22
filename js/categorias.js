/*document.addEventListener("deviceready", onDeviceReady, true);
function onDeviceReady() {
    //StatusBar.backgroundColorByHexString("#24a487");
}
*/


// Controla a escolha da categoria

var url;

function mostracategoria(categoria) {

	//console.log(url);

	var titulo = document.getElementById("titulo-categoria");
	var header = document.getElementsByClassName("header-categorias");

	switch(categoria) {
		case 1:
			titulo.innerHTML = "Útilmas notícias";
			header[0].style.backgroundColor = "#607D8B";
			//StatusBar.backgroundColorByHexString("#607D8B");

			if (localStorage.getItem("p_ultimasnoticias") === null) {
			  url = "http://www.bbc.com/portuguese/topicos/brasil/index.xml";
			} else {

			  var siteescolhido = localStorage.getItem("p_ultimasnoticias");

			  
			  if(siteescolhido==="BBC") {
			    url="http://www.bbc.com/portuguese/topicos/brasil/index.xml";
			  }
			  if(siteescolhido==="G1") {
			    url="http://g1.globo.com/dynamo/rss2.xml";
			  }
			  if(siteescolhido==="Uol") {
			    url="http://rss.uol.com.br/feed/noticias.xml";
			  }
			  if(siteescolhido==="Folha") {
			    url="http://feeds.folha.uol.com.br/folha/brasil/rss091.xml";
			  }
			  if(siteescolhido==="R7") {
				url="http://noticias.r7.com/brasil/feed.xml";
			}
			if(siteescolhido==="OTempo") {
			      url="http://www.otempo.com.br/cmlink/mundo-1.650236";
			  }
		}

			rssfeedsetup();
			break;
		case 2:
			titulo.innerHTML = "Brasil";
			header[0].style.backgroundColor = "#4CAF50";
			//StatusBar.backgroundColorByHexString("#4CAF50");

			url = 'http://www.bbc.co.uk/portuguese/topicos/brasil/index.xml';

			rssfeedsetup();
			break;
		case 3:
			titulo.innerHTML = "Tecnologia";
			header[0].style.backgroundColor = "#FF9800";
			//StatusBar.backgroundColorByHexString("#FF9800");

			url = 'http://g1.globo.com/dynamo/tecnologia/rss2.xml';

			rssfeedsetup();
			break;
		case 4:
			titulo.innerHTML = "Esportes";
			header[0].style.backgroundColor = "#F44336";
			//StatusBar.backgroundColorByHexString("#F44336");

			url = 'http://globoesporte.globo.com/Esportes/Rss/0,,AS0-9645,00.xml';
			
			rssfeedsetup();
			break;
		case 5:
			titulo.innerHTML = "Entretenimento";
			header[0].style.backgroundColor = "#3F51B5";
			//StatusBar.backgroundColorByHexString("#3F51B5");
			
			url = 'http://rss.uol.com.br/feed/entretenimento.xml';

			rssfeedsetup();
			break;
		case 6:
			titulo.innerHTML = "Mundo";
			header[0].style.backgroundColor = "#00BCD4";
			//StatusBar.backgroundColorByHexString("#00BCD4");

			url = 'http://www.bbc.co.uk/portuguese/topicos/internacional/index.xml';
			
			rssfeedsetup();
			break;
		case 7:
			titulo.innerHTML = "Negócios";
			header[0].style.backgroundColor = "#FF5722";
			//StatusBar.backgroundColorByHexString("#FF5722");

			url = 'http://feeds.feedburner.com/SoEmExame?format=xml';
			rssfeedsetup();
			break;
		case 8:
			titulo.innerHTML = "Política";
			header[0].style.backgroundColor = "#9C27B0";
			//StatusBar.backgroundColorByHexString("#9C27B0");
			
			url = 'http://feeds.jn.pt/JN-Politica'

			rssfeedsetup();
			break;
		case 9:
			titulo.innerHTML = "Saúde";
			header[0].style.backgroundColor = "#8BC34A";
			//StatusBar.backgroundColorByHexString("#8BC34A");

			url = 'http://noticias.r7.com/saude/feed.xml';

			rssfeedsetup();
			break;
		case 10:
			titulo.innerHTML = "Games";
			header[0].style.backgroundColor = "#D6523C";
			//StatusBar.backgroundColorByHexString("#D6523C");

			url = 'http://www.gamevicio.com/rss/news.xml';
			rssfeedsetup();
			break;
		case 11:
			titulo.innerHTML = "Música";
			header[0].style.backgroundColor = "#FCB941";
			//StatusBar.backgroundColorByHexString("#FCB941");

			url = 'http://g1.globo.com/dynamo/musica/rss2.xml';

			rssfeedsetup();
			break;
		case 12:
			titulo.innerHTML = "Cultura";
			header[0].style.backgroundColor = "#953163";
			//StatusBar.backgroundColorByHexString("#953163");

			url = 'http://www.cultura.gov.br/noticias-destaques/-/asset_publisher/OiKX3xlR9iTn/rss';

			rssfeedsetup();
			break;
		case 13:
			titulo.innerHTML = "Cinema";
			header[0].style.backgroundColor = "#2CC990";
			//StatusBar.backgroundColorByHexString("#2CC990");

			url = 'http://cinemacomrapadura.com.br/feed/';

			rssfeedsetup();
			break;
		default:
			//console.log("default");
			break;
	}
}

google.load("feeds", "1") //Load Google Ajax Feed API (version 1)

var ultimasnoticias=document.getElementById("mostranoticias")

if (localStorage.getItem("p_numeronoticias") === null) {
  var feedlimit = 20;
} else {
  var feedlimit= localStorage.getItem("p_numeronoticias");
}

var rssoutput="<ul class='lista-noticias'>"

function rssfeedsetup(){
    var feedpointer=new google.feeds.Feed(url) //Google Feed API method
    feedpointer.setNumEntries(feedlimit) //Google Feed API method
    feedpointer.load(displayfeed) //Google Feed API method
}

function displayfeed(result){
    if (!result.error){
        var thefeeds=result.feed.entries;
        var url;
        var titulo;

        for (var i=0; i<thefeeds.length; i++) {
            var pubDate = thefeeds[i].publishedDate;
            var date = new Date(pubDate);
            var months = Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "July", "August", "September", "October", "November", "December");
            var string = date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear()  + " às "  + date.getUTCHours() + ":" +  date.getUTCMinutes();
            
            url = '"'+thefeeds[i].link+'"';
            titulo = '"'+thefeeds[i].title+'"';

            rssoutput+="<li><a  href='#abrelink' onclick='abreurl("+url+','+titulo+")' data-rel='dialog' data-transition='pop'><h2>" + thefeeds[i].title + "</h2><time>" + string +"</time> <p>" + thefeeds[i].contentSnippet +"</p></a></li>";
        }

        rssoutput+="</ul>";
        ultimasnoticias.innerHTML=rssoutput;
        
    }
    else
    	 rssoutput="<ul class='lista-noticias'><li>Não conseguimos encontrar essa fonte de notícias</li></ul>";
    }

// href='" + thefeeds[i].link + "'

window.onload=function(){
    rssfeedsetup()
}
/*
function abreurl(url){

	var url_mobile = url;

    var iframe = document.getElementById("urlnoticia");
    iframe.setAttribute("src", url_mobile);
}
*/
function abreurl(url, titulo){

    //var iframe = document.getElementById("urlnoticia");
    //iframe.setAttribute("src", "http://www.google.com");

    var compartilhar = document.getElementById("btn-compartilhar");

    //compartilhar.setAttribute("onclick", "window.plugins.socialsharing.share('"+titulo+", Lida no app Notícias Agora', null, 'https://www.google.nl/images/srpr/logo4w.png', '"+url+"')");

    compartilhar.setAttribute("onclick", "window.plugins.socialsharing.share('"+titulo+" - Lida no app Notícias Agora', null, null, '"+url+"')");


    $(".mostra-noticia").html('<iframe src='+url+' height="100%" width="100%" class="visualizador"></iframe>');
}