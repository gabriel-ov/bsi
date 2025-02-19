class Carta{ // criando a classe do objeto carta
    constructor(aberta, removida, imagem, posicao){
        this.aberta = false;
        this. removida = false;
        this.imagem = "";
        this.posicao = -1;
    }
    status(){
        if (this.aberta == false){
            return "fechada";
        } else return "aberta";
    }
}

class Jogador{
    constructor(nome, pontuacao, turno){
        this.nome = nome;
        this.pontuacao = 0;
        this.turno = turno;
    }
}





const imagens = ["imagens/macaco.jpg", "imagens/macaco.jpg", "imagens/bola.jpg", "imagens/bola.jpg", "imagens/gato.jpg", "imagens/gato.jpg", "imagens/arvore.jpg", "imagens/arvore.jpg", "imagens/carro.jpg", "imagens/carro.jpg", "imagens/alien.jpg", "imagens/alien.jpg", "imagens/passaro.jpg", "imagens/passaro.jpg", "imagens/caveira.jpg", "imagens/caveira.jpg"];
imagens.sort(function(){return 0.5 - Math.random()}); // colocando as imagens em um vetor e aleatorizando elas

const baralho = {}; // criando um vetor paara poder preencher com as cartas
const cartas_abertas = []; //marcando quais cartas foram abertas
var cartas_removidas = 0;

function comeca(){
    document.getElementById("pai").style.zIndex = 2;
    document.getElementsByClassName("placar")[0].style.zIndex = 2;
    document.getElementsByClassName("placar")[1].style.zIndex = 2;
    j1 = new Jogador(document.getElementById("j1_").value, 0, true);
    document.getElementById("j11").style.borderTopStyle = "solid";
    document.getElementById("j11").style.borderBottomStyle = "solid";
    document.getElementById("j11").style.borderRightStyle = "solid";
    j2 = new Jogador(document.getElementById("j2_").value, 0, false);
    document.getElementById("j22").style.borderStyle = "none";
    document.getElementById("j11").innerHTML = "  JOGADOR 1: " + j1.nome + "<br><br>   PONTUAÇÃO: " + j1.pontuacao;
    document.getElementById("j22").innerHTML = "  JOGADOR 2: " + j2.nome + "<br><br>   PONTUAÇÃO: " + j2.pontuacao;
}

function initJS(){
    document.getElementById("comeca_jogo").addEventListener("click", comeca);
    for (let i = 0; i < 16; i++){
        document.getElementsByClassName("filho")[i].addEventListener("click", function () {
            abrirCarta(this, i);
        });
        baralho[i] = new Carta;
        baralho[i].imagem = imagens[i];
        baralho[i].posicao = i;
    }
}






function abrirCarta(obj, indice){
    if (cartas_abertas.length != 2 && baralho[indice].aberta == false){
        cartas_abertas.push(baralho[indice]);
        baralho[indice].aberta = true;
        obj.classList.remove("fechada");
        obj.classList.add(baralho[indice].status());
        obj.style.backgroundImage = "url('" +baralho[indice].imagem;+"')";
    } else if (cartas_abertas.length == 2) {
        console.log(cartas_abertas[0]);
        console.log(cartas_abertas[1]);
        removeCartas();
        cartas_abertas.pop();
        cartas_abertas.pop();
        fecharCartas();
    }
    console.log(j1);
    console.log(j2);
}






function fecharCartas(){
    for (let i = 0; i < 16; i++){
        baralho[i].aberta = false;
        document.getElementsByClassName("filho")[i].classList.replace("aberta", "fechada");
        document.getElementsByClassName("filho")[i].style.backgroundImage = "none";
    }
    trocaTurno();
}






function removeCartas(){
    if (cartas_abertas[0].imagem == cartas_abertas[1].imagem){
        baralho[cartas_abertas[0].posicao].removida = true;
        baralho[cartas_abertas[1].posicao].removida = true;
        document.getElementsByClassName("filho")[cartas_abertas[0].posicao].classList.remove("aberta", "fechada");
        document.getElementsByClassName("filho")[cartas_abertas[1].posicao].classList.remove("aberta", "fechada");
        document.getElementsByClassName("filho")[cartas_abertas[0].posicao].classList.add("cartaFora");
        document.getElementsByClassName("filho")[cartas_abertas[1].posicao].classList.add("cartaFora");
        const y = document.getElementsByClassName("filho")[cartas_abertas[1].posicao];
        y.replaceWith(y.cloneNode(true));
        const x = document.getElementsByClassName("filho")[cartas_abertas[0].posicao];
        x.replaceWith(x.cloneNode(true));
        console.log(document.getElementsByClassName("filho")[cartas_abertas[0].posicao].classList);
        console.log(document.getElementsByClassName("filho")[cartas_abertas[1].posicao].classList);
        cartas_removidas++;
        if (j1.turno == true){
            j1.pontuacao++;
        }
        if (j2.turno == true){
            j2.pontuacao++;
        }
        document.getElementById("j11").innerHTML = "  JOGADOR 1: " + j1.nome + "<br><br>   PONTUAÇÃO: " + j1.pontuacao;
        document.getElementById("j22").innerHTML = "  JOGADOR 2: " + j2.nome + "<br><br>   PONTUAÇÃO: " + j2.pontuacao;
    }
    if (cartas_removidas == 8){
        if (j1.pontuacao == j2.pontuacao){
            document.getElementById("corpo").innerHTML += "<div class='resultado_final'>O JOGO EMPATOU!</div>";
        } else if (j1.pontuacao > j2.pontuacao){
            document.getElementById("corpo").innerHTML += "<div class='resultado_final'>PARABÉNS, " + j1.nome + "! VOCÊ VENCEU O JOGO!</div>";
        } else document.getElementById("corpo").innerHTML += "<div class='resultado_final'>PARABÉNS, " + j2.nome + "! VOCÊ VENCEU O JOGO!</div>";
    }
}



function trocaTurno(){
    if (j1.turno == true){
        j1.turno = false;
        document.getElementById("j11").style.borderStyle = "none";
    }
    else {
        j1.turno = true;
        document.getElementById("j11").style.borderTopStyle = "solid";
        document.getElementById("j11").style.borderBottomStyle = "solid";
        document.getElementById("j11").style.borderRightStyle = "solid";
    }
    if (j2.turno == true){
        j2.turno = false;
        document.getElementById("j22").style.borderStyle = "none";
    }
    else {
        j2.turno = true;
        document.getElementById("j22").style.borderTopStyle = "solid";
        document.getElementById("j22").style.borderBottomStyle = "solid";
        document.getElementById("j22").style.borderLeftStyle = "solid";
    }
}


