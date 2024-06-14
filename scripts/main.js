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

// Função para converter código MIDI para nota
function midiParaNota(codigoMidi) {
  for (let nota in notasMidi) {
    if (notasMidi[nota].includes(codigoMidi)) {
      return nota;
    }
  }
  return null; // Retorna null se o código MIDI não estiver associado a nenhuma nota
}

// Check if the Web MIDI API is available
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  document.getElementById("output").textContent = "Web MIDI API is not supported in this browser.";
}

function onMIDISuccess(midiAccess) {
  const inputs = midiAccess.inputs.values(); // Obtém um iterator dos valores do Map

  // Itera sobre os valores do Map usando um loop for...of FIXME: PARA CARA DISPOSITIVO MIDI CONECTADO
  // for (let input of inputs) {
  //   console.log('inputs---', input  )
  //   input.onmidimessage = handleMIDIMessage;
  // }

  for (let input of inputs) {
    input.onmidimessage = handleMIDIMessage;
    // Parar o loop na primeira iteração para pegar apenas o primeiro dispositivo MIDI
    break;
  }

  document.getElementById("output-info").textContent = "Pressione uma tecla MIDI.";
}

function onMIDIFailure() {
  document.getElementById("output").textContent = "Failed to access MIDI devices.";
}

function handleMIDIMessage(event) {
  const data = event.data;
  const command = data[0];
  const note = data[1];
  const velocity = data[2];

  // Display MIDI message data on the web page
  const output = document.getElementById("output");
  output.innerHTML += `<p>Command: ${command}, Note: ${note}, Velocity: ${velocity}</p>`;
  output.scrollTop = output.scrollHeight;

  // Check for a specific note and velocity to trigger the audio
  if (command === 144 && velocity > 0) {
    // Verificar qual a nota corresponde ao valor MIDI recebido
    audioName = midiParaNota(note);
    noteView.innerHTML = substituirSusPorHash(audioName);
  }

  // BTN PLAY
  if (command === 176 && note === 94) {
    playAudio();
  }

  // BTN STOP
  if (command === 176 && note === 93) {
    stopAudioSmoothly();
  }
}

function playAudio() {
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
  audioElement.volume = 0;

  // Adicione a nova fonte ao elemento de áudio
  audioElement.appendChild(source);

  // Carregue o novo áudio
  audioElement.load();

  // Comece com o volume em 0
  const volumeControl = document.getElementById("volumeInput").value / 100;
  increaseVolumeSmoothly(audioElement, volumeControl); // Aumente o volume gradualmente para 1

  isPlaying = true;
  stopRequested = false;

  setTimeout(() => {
    audioElement.play().catch((error) => {
      console.error("error", error);
      alert(`Azedou esse caminho: ../assets/pads/${padSelected}/${audioName}.mp3`, error);
    });
  }, 0);
}

function stopAudioSmoothly() {
  if (isPlaying && !stopRequested) {
    noteViewSelected.innerHTML = "";
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
      }
    }, 100); // Adjust the interval for smoother or faster fading
  }
}

function stopAudioSmoothlyChangeTone() {
  if (isPlaying && !stopRequested) {
    stopRequested = true;
    const fadeOutInterval = setInterval(function () {
      const volume = audioElement.volume - 0.1;
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
    const volume = audioElement.volume + 0.02; // Aumenta o volume gradualmente
    if (volume < targetVolume) {
      audioElement.volume = volume.toFixed(2); // Limita para 2 casas decimais
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
  return text.replace(/sus/g, '#');
}