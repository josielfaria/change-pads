let START_WORSHIP = false;

function start() {
  $("#containerStart").addClass("d-none");
  $("#audioStartControl").addClass("d-none");
  audioStart.play();
  setTimeout(() => {
    $("#containerWorship").addClass("d-block");
    START_WORSHIP = true;
  }, 1000);
}

function verificarTecla(event) {
  // Verifica se a tecla pressionada é Enter (código 13) ou Barra de Espaço (código 32)
  if (event.keyCode === 13 || event.keyCode === 32) {
    start();
  }

  // Verifica se a tecla pressionada é Esc (código 27)
  if (event.keyCode === 27) {
    tudumtss();
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Adiciona um listener ao documento para detectar a tecla pressionada
  document.addEventListener("keydown", verificarTecla);
});

// TUDUMTSS
function tudumtss() {
  const audioExtra = new Audio("assets/audios/tudumtss.wav");
  audioExtra.volume = 1;
  audioExtra.play();
}

// PSICOLOGICO
function psicologico() {
  const audioExtra = new Audio("assets/audios/psicologico.mp3");
  audioExtra.volume = 1;
  audioExtra.play();
}


// TODO: Botão panico
// TODO: Set list com TOMS do dia 
// TODO: Botão para mudar os toms do dia