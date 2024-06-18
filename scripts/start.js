function start() {
  $("#containerStart").addClass("d-none");
  audioStart.play();
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
