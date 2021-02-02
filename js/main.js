let imagenes = 10;
let totalImagenes = [];

for(i = 0; i < imagenes; i++){
    totalImagenes.push(i + 1);
    totalImagenes.push(i + 1);
}

//mostrar en pantalla las tarjetas
let contenedor = document.getElementById('juego');
let tarjetas = '';
let idTarjetas = 1;

for(i = 0; i < totalImagenes.length; i++){
            tarjetas += `
            <div class="tarjetas" id="${idTarjetas}" data-pareja="${totalImagenes[i]}" data-click="0" data-encontrada="0">
            <div class="frontal">
                <img src="imagenes/logo.jpg">
            </div>
                <img class="trasera" src="imagenes/${totalImagenes[i]}.jpg" alt="">
            </div>
            `
    idTarjetas++
}
        contenedor.innerHTML = tarjetas;

//ALTERAR EL ORDEN DE LAS TARJETAS
const tarjetasRandom = () =>{
    let tarjetas = document.querySelectorAll('.tarjetas');
    tarjetas.forEach(tarjeta => {
        let desorden = Math.round(Math.random() * 20);
        tarjeta.style.order = desorden
    })
}
tarjetasRandom()


const tarjets = document.querySelectorAll('.tarjetas');
//EVENTO PARA GIRAR LAS TARJETAS
tarjets.forEach(element => element.addEventListener('click', girar));


let validarClick = true;
let primerImg = 0;
let idAnterior = 0; 
let clicks = 0;
let parejas = 0;
let intentos = 0

//FUNCION GIRAR TARJETAS Y LOGICA DEL JUEGO
function girar() {
    if(validarClick){
        //GIRAR TARJETA Y TRAER DATOS DEL PRIMER CLICK
        let elemento = this;
        if(idAnterior != elemento.id && elemento.dataset.encontrada != '1'){
            elemento.classList.add('girar');
            elemento.dataset.click = '1'
            //DATOS DE LA TARJETA DEL SEGUNDO CLICK
            if(clicks == 0){
                primerImg = elemento.dataset.pareja;
                idAnterior = elemento.id;
                clicks++
            }else{
                validarClick = false;
                setTimeout(() => {
                    let ele = document.querySelectorAll('.tarjetas');
                    //SI LOS DATOS DE LAS TARJETAS COINCIDEN
                    if(primerImg === elemento.dataset.pareja){
                        parejas++
                        for(i = 0; i < ele.length; i++){
                            if(ele[i].dataset.click == '1'){
                                ele[i].dataset.encontrada = '1'
                            }
                        }
                        //ALERTA QUE EL JUGADOR HA GANADO
                        if(parejas == imagenes){
                            let alertaGanar = document.querySelector('.alertaGanar');
                            alertaGanar.style.marginTop = '0%';
                        }
                    //SI LAS TARJETAS NO SON IGUALES RESETAMOS VALORES
                    }else{
                        for(i = 0; i < ele.length; i++){
                            if(ele[i].dataset.encontrada == '0'){
                                ele[i].dataset.click = '0';
                                ele[i].classList.remove('girar')
                            }
                        }
                    }
                    validarClick = true;
                    idAnterior = 0;
                    imgAnterior = 0;
                    clicks = 0
                    intentos++
                    document.getElementById('intentos').innerHTML = intentos

                }, 700);
            }
        }
        
    }
}

// FUNCION PARA RESTAR SEGUNDOS;
let tiempoTotal = 90;
let alerta = document.querySelector('.alerta');

function restarTiempo(){
    let segundos = document.getElementById('tiempo');
    let restarSegundos = setInterval(() => {
        //MOSTRAR ALERTA CUANDO PIERDE
        if(tiempoTotal == 0){
            alerta.style.marginTop = '0%'
            clearInterval(restarSegundos);
        }
        //DETENER EL TIEMPO SI EL JUGADOR HA GANADO
        if(parejas == 10){
            clearInterval(restarSegundos)
        }
        segundos.innerHTML = tiempoTotal;
        tiempoTotal--
    }, 1000);
}
restarTiempo()

//Volver a iniciar el juego
let iniciar = document.querySelector('.iniciar');
let reiniciar = document.querySelector('.reiniciar')

iniciar.addEventListener('click', function(){
    location.reload()
})

reiniciar.addEventListener('click', function(){
    location.reload()
})