const MIDI_COMMAND_OPTIONS = 176;
const MIDI_COMMAND_NOTES_ON = 144;

function verificarMessageMidi(message) {
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
  }

  // BTN STOP
  if (command === MIDI_COMMAND_OPTIONS && note === 93) {
    stopAudioSmoothly();
  }

  // BTN VOL
  if (command === MIDI_COMMAND_OPTIONS && note === 20) {
    setVolume(((velocity * 100) / 127).toFixed(0));
  }
}

function setKnobMidiVolume(volume) {
  sendMidiMessage(MIDI_COMMAND_OPTIONS, 20, volumeToVelocity(volume));
}

// converter o numero de 0-100 para 0-127
function volumeToVelocity(volume) {
  return Math.round((volume * 127) / 100);
}
