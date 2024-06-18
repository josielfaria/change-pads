const volumeControl = document.getElementById("volumeInput");
const volumeLabel = document.getElementById("volumeLabel");
const audioPlayer = document.getElementById("audio");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audioPlayer);
const gainNode = audioContext.createGain();

// Connect the audio graph
source.connect(gainNode);
gainNode.connect(audioContext.destination);

document.addEventListener("DOMContentLoaded", function () {
  // Set the initial volume
  audioPlayer.volume = getVolumeStorage() / 100;
  volumeLabel.textContent = getVolumeStorage();
  volumeControl.value = getVolumeStorage();
  setKnobMidiVolume(getVolumeStorage());

  // adicionar debounceTimer para evitar que o volume seja alterado muitas vezes
  let debounceTimer;
  volumeControl.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setVolume(this.value);
    }, 1000);
  });
});

document.getElementById("volumeLabel").addEventListener("click", function () {
  setVolume(100);
});

function setVolume(volume) {
  audioPlayer.volume = volume / 100;
  volumeLabel.textContent = volume;
  volumeControl.value = volume;
  setKnobMidiVolume(volume);
  setVolumeStorage(volume);
}
