const MIDI_COMMAND_OPTIONS = 176;
const MIDI_COMMAND_NOTES_ON = 144;
const MIDI_COMMAND_PADS_ON_LN = 153;
const MIDI_COMMAND_PADS_TOGGLE = 185;

function verificarMessageMidi(message) {
  if (!START_WORSHIP) {
    return;
  }

  const data = message.data;
  const command = data[0];
  const note = data[1];
  const velocity = data[2];

  // Verificar qual a nota corresponde ao valor MIDI recebido
  if (command === MIDI_COMMAND_NOTES_ON) {
    audioName = substituirHashPorSus(midiParaNota(note));
    noteView.innerHTML = substituirSusPorHash(audioName);
  }

  // BTN PLAY
  if (command === MIDI_COMMAND_OPTIONS && note === 94) {
    playAudio();
    return;
  }

  // BTN STOP
  if (command === MIDI_COMMAND_OPTIONS && note === 93) {
    stopAudioSmoothly();
    return;
  }

  // BTN PLAY/STOP PAD TOGGLE
  if (command === MIDI_COMMAND_PADS_TOGGLE && note === 36) {
    if (velocity === 127) {
      playAudio();
    } else {
      stopAudioSmoothly();
    }
    return;
  }

  // BTN CHANGE PAD
  if (command === MIDI_COMMAND_PADS_ON_LN && note === 37) {
    playAudio();
    return;
  }

  // BTN VOL
  if (command === MIDI_COMMAND_OPTIONS && note === 20) {
    setVolume(((velocity * 100) / 127).toFixed(0));
    return;
  }

  if (command === MIDI_COMMAND_OPTIONS && note === 95) {
    clearLog();
    return;
  }

  choosePad(command, note);

  if (command === MIDI_COMMAND_PADS_ON_LN && note === 39) {
    tudumtss();
  }

  if (command === MIDI_COMMAND_PADS_ON_LN && note === 0) {
    psicologico();
  }
}

function choosePad(command, note) {
  if (command !== MIDI_COMMAND_PADS_ON_LN) {
    return;
  }
  if (note === 40) {
    padSelected = "flanger";
    selectElement.value = "flanger";
  } else if (note === 41) {
    padSelected = "soft";
    selectElement.value = "soft";
  } else if (note === 42) {
    padSelected = "sinos";
    selectElement.value = "sinos";
  }
  return;
}

function setKnobMidiVolume(volume) {
  sendMidiMessage(MIDI_COMMAND_OPTIONS, 20, volumeToVelocity(volume));
}

// converter o numero de 0-100 para 0-127
function volumeToVelocity(volume) {
  return Math.round((volume * 127) / 100);
}
