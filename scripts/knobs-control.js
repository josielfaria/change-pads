// Geralmente varia de -40 dB a +40 dB e é ajustável em incrementos de 1 dB.
// O valor padrão é 0 dB. A propriedade gain é um valor de ponto flutuante que
// representa a quantidade de ganho aplicada ao sinal de áudio.

// Configurar o contexto de áudio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const track = audioContext.createMediaElementSource(AUDIO_PLAYER_ELEMENT);

// ~~BASS CONFIG
const bassFilter = audioContext.createBiquadFilter();
bassFilter.type = "lowshelf";
bassFilter.frequency.value = 200;
bassFilter.gain.value = 0; // Ajuste o valor para aumentar/diminuir os graves

// ~~MIDDLE CONFIG
const midFilter = audioContext.createBiquadFilter();
midFilter.type = "peaking";
midFilter.frequency.value = 1000;
midFilter.Q.value = 1;
midFilter.gain.value = 0; // Ajuste o valor para aumentar/diminuir os médios

// ~~TREBLE CONFIG
const trebleFilter = audioContext.createBiquadFilter();
trebleFilter.type = "highshelf";
trebleFilter.frequency.value = 3000;
trebleFilter.gain.value = 0; // Ajuste o valor para aumentar/diminuir os agudos

// Conectar filtros ao contexto de áudio
function initConnectKnobs() {
  track.connect(bassFilter);
  bassFilter.connect(midFilter);
  midFilter.connect(trebleFilter);
  trebleFilter.connect(audioContext.destination);
}

function setBassGain(value) {
  setKnobValue("knob2", value);
  bassFilter.gain.value = value;
  setBassStorage(value);
}

function setMidGain(value) {
  setKnobValue("knob3", value);
  midFilter.gain.value = value;
  setMidStorage(value);
}

function setTrebleGain(value) {
  setKnobValue("knob4", value);
  trebleFilter.gain.value = value;
  setTrebleStorage(value);
}

function setVolume(value) {
  setKnobValueVolume(value);
  audioContext.volume = value;
  setVolumeStorage(value);
}

// EVENTOS DE CONTROLES DE KNOBS
document.addEventListener("DOMContentLoaded", function () {
  // Set the initial volume
  setVolume(getVolumeStorage());
  setBassGain(getBassStorage());
  setMidGain(getMidStorage());
  setTrebleGain(getTrebleStorage());
});

// METODOS AUXILIARES
function convertRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

// Específico para converter 0-100 para -40 a 40
function convertToGain(value) {
  return convertRange(value, 0, 100, -40, 40);
}

///////////////////////////////////////////////////////// INIT VALUES KNOBS IN MIDI DEVICE  //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// TODO: pegar os valores iniciais da sessão do usuário
// setTimeout(() => {
//   sendMIDIMessage([176, 21, 63.5]);
//   sendMIDIMessage([176, 22, 63.5]);
//   sendMIDIMessage([176, 23, 63.5]);
// }, 2000);
