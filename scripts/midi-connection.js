if (navigator.requestMIDIAccess) {
  console.log("Este navegador suporta MIDI!");
} else {
  console.log("Este navegador não suporta MIDI.");
}

// Acessar o sistema MIDI
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log("Acesso MIDI concedido");
  listOutputs(midiAccess);
}

function onMIDIFailure() {
  console.log("Falha ao acessar o sistema MIDI");
}

// Listar as saídas MIDI disponíveis
function listOutputs(midiAccess) {
  const outputs = midiAccess.outputs;
  const inputs = midiAccess.inputs.values();

  // for (let output of outputs.values()) {
  //   console.log(`Output port [type: '${output.type}'] id: '${output.id}' manufacturer: '${output.manufacturer}' name: '${output.name}' version: '${output.version}'`);
  // }

  // Parar o loop na primeira iteração para pegar apenas o primeiro dispositivo MIDI
  for (let input of inputs) {
    input.onmidimessage = handleMIDIMessage;
    break;
  }

  var outputDevice = null;
  const firstOutput = outputs.values().next().value;
  if (firstOutput) {
    console.log("firstOutput", firstOutput);
    outputDevice = firstOutput;
  } else {
    console.log("Nenhuma saída MIDI disponível.");
  }

  document.getElementById("output-info").textContent = "Pressione uma tecla MIDI.";
}

// Enviar uma mensagem MIDI
function sendMIDIMessage(value) {
  outputDevice.send(value);
  console.log("Nota On enviada:", value);
}

// Receber uma mensagem MIDI
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

  // BTN Knobs
  if (command === 176 && note === 20) {
    setVolume(convertVolToGainMidi(velocity));
  }

  if (command === 176 && note === 21) {
    setBassGain(convertToGainMidi(velocity));
  }

  if (command === 176 && note === 22) {
    setMidGain(convertToGainMidi(velocity));
  }

  if (command === 176 && note === 23) {
    setTrebleGain(convertToGainMidi(velocity));
  }
}

// Função para converter código MIDI para nota
function midiParaNota(codigoMidi) {
  for (let nota in notasMidi) {
    if (notasMidi[nota].includes(codigoMidi)) {
      return nota;
    }
  }
  return null; // Retorna null se o código MIDI não estiver associado a nenhuma nota
}
