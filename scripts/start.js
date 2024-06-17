function start() {
  console.log("Start");
  $("#containerStart").addClass("d-none");
  initConnectKnobs();
  audioStart.play(); // TODO: DEVOLVER QUANDO REMOVER O SETTIMEOUT
  setTimeout(() => {
    $("#containerWorship").addClass("d-block");
  }, 1000);
}

function verificarTecla(event) {
  // Verifica se a tecla pressionada é Enter (código 13) ou Barra de Espaço (código 32)
  if (event.keyCode === 13 || event.keyCode === 32) {
    start();
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Adiciona um listener ao documento para detectar a tecla pressionada
  document.addEventListener("keydown", verificarTecla);
});

// TODO: REMOVER DEPOIS
// setTimeout(() => {
//   start();
// }, 1000);
