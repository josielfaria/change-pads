let deviceMidi = null;
let deviceMidiConnected = false;

// Check if the Web MIDI API is available
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  document.getElementById("output").textContent = "Web MIDI API is not supported in this browser.";
}

function onMIDISuccess(midiAccess) {
  const inputs = midiAccess.inputs.values(); // Obtém um iterator dos valores do Map
  const outputs = midiAccess.outputs.values(); // Obtém um iterator dos valores do Map

  for (let input of inputs) {
    input.onmidimessage = handleMIDIMessage;
    break;
  }

  // verificar se o device midi está desconectado
  midiAccess.onstatechange = function (event) {
    if (event.port.state === "disconnected") {
      deviceMidiConnected = false;
    } else {
      deviceMidiConnected = true;
    }
  };

  for (let output of outputs) {
    deviceMidi = output;
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

  const output = document.getElementById("output");
  output.innerHTML += `<p>Command: ${command}, Note: ${note}, Velocity: ${velocity}</p>`;
  output.scrollTop = output.scrollHeight;

  verificarMessageMidi(event);
}

function sendMidiMessage(command, note, velocity) {
  if (deviceMidi) {
    deviceMidi.send([command, note, velocity]);
  } else {
    console.error("No MIDI output device available.");
  }
}

// Display MIDI message data on the web page
function printMidiOutput(message) {
  const output = document.getElementById("output");
  output.innerHTML += `<p>Command: ${command}, Note: ${note}, Velocity: ${velocity}</p>`;
  output.scrollTop = output.scrollHeight;
}

// SHOW LED MIDI CONNECTION
const ledConnection = document.getElementById("led-connection");
const ledLabel = document.getElementById("led-label");

function setStyleLedConnection(status) {
  console.log('status', status)
  ledConnection.classList.add(status ? "on" : "off");
  ledConnection.classList.remove(status ? "off" : "on");
  ledLabel.textContent = status ? "MIDI Conectado" : "MIDI Desconectado";
}

// verificar se existe device midi conectado a cada 1 segundo
setInterval(() => {
  setStyleLedConnection(deviceMidiConnected);
}, 1000);
