document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio");
  const volumeControl = document.getElementById("volumeInput");

  // Set the initial volume
  audioPlayer.volume = volumeControl.value / 100;

  // Event listener for volume change
  volumeControl.addEventListener("input", function () {
    audioPlayer.volume = this.value / 100;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const volumeControl = document.getElementById("volumeInput");
  const volumeLabel = document.getElementById("volumeLabel");

  volumeLabel.textContent = volumeControl.value;

  volumeControl.addEventListener("input", function () {
    volumeLabel.textContent = this.value;
  });
});


document.getElementById("volumeLabel").addEventListener("click", function () {
  const volumeControl = document.getElementById("volumeInput");
  const volumeLabel = document.getElementById("volumeLabel");
  volumeLabel.textContent = 100;
  volumeControl.value = 100;
});