let padSelected = "flanger";

document.addEventListener("DOMContentLoaded", (event) => {
  const selectElement = document.getElementById("selectPad");

  // Defina uma variável para armazenar o valor selecionado
  padSelected = selectElement.value;

  // Adicione um listener para capturar mudanças no select
  selectElement.addEventListener("change", (event) => {
    padSelected = event.target.value;
    console.log("Pad selecionado:", padSelected);
  });
});
