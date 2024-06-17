let audioName = "C"; // C, C#, D, D#, E, F, F#, G, G#, A, A#, B
let audioElement = document.getElementById("audio");
let audioStart = document.getElementById("audioStart");
let noteView = document.getElementById("noteView");
let noteViewSelected = document.getElementById("noteViewSelected");
let isPlaying = false;
let stopRequested = false;

const notasMidi = {
  C: [0, 12, 24, 36, 48, 60, 72, 84, 96, 108],
  "C#": [1, 13, 25, 37, 49, 61, 73, 85, 97, 109],
  D: [2, 14, 26, 38, 50, 62, 74, 86, 98, 110],
  "D#": [3, 15, 27, 39, 51, 63, 75, 87, 99, 111],
  E: [4, 16, 28, 40, 52, 64, 76, 88, 100, 112],
  F: [5, 17, 29, 41, 53, 65, 77, 89, 101, 113],
  "F#": [6, 18, 30, 42, 54, 66, 78, 90, 102, 114],
  G: [7, 19, 31, 43, 55, 67, 79, 91, 103, 115],
  "G#": [8, 20, 32, 44, 56, 68, 80, 92, 104, 116],
  A: [9, 21, 33, 45, 57, 69, 81, 93, 105, 117],
  "A#": [10, 22, 34, 46, 58, 70, 82, 94, 106, 118],
  B: [11, 23, 35, 47, 59, 71, 83, 95, 107, 119],
};

async function playAudio() {
  while (audioElement.firstChild) {
    audioElement.removeChild(audioElement.firstChild);
  }

  if (isPlaying) {
    stopAudioSmoothlyChangeTone();
    return;
  }

  noteViewSelected.innerHTML = substituirSusPorHash(audioName);

  // Crie uma nova fonte de áudio
  var source = document.createElement("source");
  source.src = `../assets/pads/${padSelected}/${audioName}.mp3`;
  source.type = "audio/mpeg";
  source.volume = 0;
  // audioElement.volume = 0;

  // Adicione a nova fonte ao elemento de áudio
  audioElement.appendChild(source);

  console.log("playAudio -> audioElement", audioElement);
  // Carregue o novo áudio
  await audioElement.load();

  isPlaying = true;
  stopRequested = false;

  audioElement
    .play()
    .then((a) => {
      increaseVolumeSmoothly(audioElement, VOLUME / 100); // Aumente o volume gradualmente para 1
    })
    .catch((error) => {
      console.error("error", error);
      alert(`Azedou esse caminho: ../assets/pads/${padSelected}/${audioName}.mp3`, error);
    });
}

function stopAudioSmoothly() {
  if (isPlaying && !stopRequested) {
    noteViewSelected.innerHTML = "";
    stopRequested = true;
    const fadeOutInterval = setInterval(function () {
      const volume = audioElement.volume - 0.01;
      if (volume > 0) {
        audioElement.volume = volume.toFixed(2); // Limit to 2 decimal places
      } else {
        clearInterval(fadeOutInterval);
        audioElement.pause();
        audioElement.currentTime = 0; // Rewind to the beginning
        isPlaying = false;
        stopRequested = false;
      }
    }, 100); // Adjust the interval for smoother or faster fading
  }
}

function stopAudioSmoothlyChangeTone() {
  if (isPlaying && !stopRequested) {
    stopRequested = true;
    const fadeOutInterval = setInterval(function () {
      const volume = audioElement.volume - 0.05;
      if (volume > 0) {
        audioElement.volume = volume.toFixed(2); // Limit to 2 decimal places
      } else {
        clearInterval(fadeOutInterval);
        audioElement.pause();
        audioElement.currentTime = 0; // Rewind to the beginning
        isPlaying = false;
        stopRequested = false;
        playAudio();
      }
    }, 100); // Adjust the interval for smoother or faster fading
  }
}

function increaseVolumeSmoothly(audioElement, targetVolume) {
  const currentVolume = audioElement.volume;

  // Verifica se o volume atual já está no valor desejado ou superior
  if (currentVolume >= targetVolume) {
    return; // Não há necessidade de aumentar o volume
  }

  const fadeInInterval = setInterval(function () {
    let volume = audioElement.volume + 0.02; // Aumenta o volume gradualmente
    if (volume < targetVolume) {
      audioElement.volume = Number(volume.toFixed(2)); // Limita para 2 casas decimais
    } else {
      audioElement.volume = targetVolume; // Define o volume para o valor alvo exato
      clearInterval(fadeInInterval); // Limpa o intervalo de aumento de volume
    }
  }, 100); // Intervalo de 100ms (ajuste conforme necessário para uma transição mais suave)
}

function stopAudio() {
  const audio = document.getElementById("audio");
  audio.pause();
  audio.currentTime = 0;
}

function clearLog() {
  document.getElementById("output").innerHTML = "Zero bala.. Pode tocar!";
}

function substituirSusPorHash(text) {
  return text.replace(/sus/g, "#");
}

// METODOS AUXILIARES
function convertRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

// Específico para converter -40 a 40 para -140 a 140
function convertToDeg(value) {
  return convertRange(value, -40, 40, -140, 140);
}

// Específico para converter -140e140 para -40 a 40
function convertToGainMidi(value) {
  return convertRange(value, 0, 127, -40, 40);
}

function convertVolToGainMidi(value) {
  return convertRange(value, 0, 127, 0, 100);
}
