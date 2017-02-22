function configuracoesatuais() {
    if(localStorage.getItem("p_ultimasnoticias") != null) {
        var el = localStorage.getItem("p_ultimasnoticias");
        document.getElementById(el).setAttribute("selected", "");
    }
};

function salvar_configs() {

    	window.scrollTo(0, 0);

    	var telaaviso = document.getElementById("aviso");
    	telaaviso.style.display = "block";

    	// variáveis 
    	var f_ultimasnoticias = document.forms["configuracao"]["ultimasnoticias"].value;
        var f_previsao = document.forms["configuracao"]["previsao"].value;
        var f_numeronoticias = document.forms["configuracao"]["numeronoticias"].value;

        // variáveis não voláteis
    	localStorage.setItem("p_ultimasnoticias", f_ultimasnoticias);
        localStorage.setItem("p_previsao", f_previsao);
        localStorage.setItem("p_numeronoticias", f_numeronoticias);

    	setTimeout(function(){ window.location = 'index.html'; }, 2000);

 };

 function resetar() {

        window.scrollTo(0, 0);

        var telaaviso = document.getElementById("aviso");
        telaaviso.style.display = "block";

        // Resetar váriaveis não voláteis
        localStorage.clear();

        setTimeout(function(){ window.location = 'index.html'; }, 2000);

 };