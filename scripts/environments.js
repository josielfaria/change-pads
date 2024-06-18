let VOLUME = 50;

function setVolumeStorage(volume) {
  VOLUME = volume;
  setStorage("volume", volume);
}

function getVolumeStorage() {
  return getStorage("volume") || VOLUME;
}

function setStorage(key, value) {
  localStorage.setItem(key, value);
}

function getStorage(key) {
  return localStorage.getItem(key);
}
