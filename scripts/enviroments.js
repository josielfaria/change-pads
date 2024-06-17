const VOLUME_INIT = 35;
const MIN_GAIN = -40;
const MAX_GAIN = 40;
const GAIN_STEP = 1;

const AUDIO_PLAYER_ELEMENT = document.getElementById("audio");

let VOLUME = Number(localStorage.getItem("volume")) ?? VOLUME_INIT;
let BASS = 0;
let MID = 0;
let TREBLE = 0;

function setVolumeStorage(value) {
  localStorage.setItem("volume", value);
}

function getVolumeStorage() {
  return Number(localStorage.getItem("volume")) ?? VOLUME_INIT;
}

function setBassStorage(value) {
  localStorage.setItem("bass", value);
}

function getBassStorage() {
  return Number(localStorage.getItem("bass")) ?? 0;
}

function setMidStorage(value) {
  localStorage.setItem("mid", value);
}

function getMidStorage() {
  return Number(localStorage.getItem("mid")) ?? 0;
}

function setTrebleStorage(value) {
  localStorage.setItem("treble", value);
}

function getTrebleStorage() {
  return Number(localStorage.getItem("treble")) ?? 0;
}
