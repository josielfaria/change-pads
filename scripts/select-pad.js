const selectElement = document.getElementById("selectPad");
let padSelected = "atmospheric";

document.addEventListener("DOMContentLoaded", (event) => {

  // Defina uma variável para armazenar o valor selecionado
  padSelected = selectElement.value;

  // Adicione um listener para capturar mudanças no select
  selectElement.addEventListener("change", (event) => {
    padSelected = event.target.value;
    console.log("Pad selecionado:", padSelected);
  });
});

let selectNote = "C";

document.addEventListener("DOMContentLoaded", (event) => {
  const selectElement = document.getElementById("selectNote");
  const noteView = document.getElementById("noteView");

  // Defina uma variável para armazenar o valor selecionado
  selectNote = selectElement.value;

  // Adicione um listener para capturar mudanças no select
  selectElement.addEventListener("change", (event) => {
    selectNote = event.target.value;
    audioName = event.target.value;
    noteView.innerHTML = substituirSusPorHash(audioName);
    console.log("Tom selecionado:", selectNote);
  });
});
