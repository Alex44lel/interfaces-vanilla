
$(document).ready(function(){


    //CLOCK

    //getTime lo retorna en milliseconds
    const target = new Date("December 24, 2024 00:00:00").getTime();

    function actualizarContador(){
        let now = new Date().getTime()
        let diff = target - now
        if (diff < 0) {
            clearInterval(contadorInterval)
            $(".home-contador").text("Llega papá noél")
            return
        }

        //calculo cuantos dias,segundos, horas ... quedan
        let dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        let horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((diff % (1000 * 60)) / 1000);
        
        $(".home-contador").text(`${dias} días ${horas}h ${minutos}m ${segundos}s`)

       
    }

    let contadorInterval = setInterval(actualizarContador,1000)
    
})