var knob2 = document.querySelector("#knob2 .knob-indicator-container");
var knob3 = document.querySelector("#knob3 .knob-indicator-container");
var knob4 = document.querySelector("#knob4 .knob-indicator-container");

var ring2 = document.querySelector("#knob2 .ring-fill");
var ring3 = document.querySelector("#knob3 .ring-fill");
var ring4 = document.querySelector("#knob4 .ring-fill");

knob2.onpointerdown = OnPointerDown;
knob3.onpointerdown = OnPointerDown;
knob4.onpointerdown = OnPointerDown;

var knobManipulated = knob2;
var ringManipulated = ring2;

var startY = 0;
var currentY = 0;
var lastRot = 0;

var maxRot = 140;
var speed = 1;

function OnPointerDown(event, el) {
  document.addEventListener("pointermove", OnPointerMove);
  document.addEventListener("pointerup", OnPointerUp);
  startY = event.clientY;
}

function OnPointerMove(event) {
  delta = startY - event.clientY;

  currentY = lastRot + delta * speed;

  if (currentY > maxRot) currentY = maxRot;

  if (currentY < -maxRot) currentY = -maxRot;

  knobManipulated.style.transform = "rotate(" + currentY + "deg)";

  if (currentY > 0) ringManipulated.style.background = "conic-gradient(var(--accent-up) " + currentY + "deg, rgba(255,255,255,0.0) 0 360deg, var(--accent-down) 0deg)";
  else ringManipulated.style.background = "conic-gradient(var(--accent-up) 0deg, rgba(255,255,255,0.0) 0 " + (360 + currentY) + "deg, var(--accent-down) 0deg)";
}

function OnPointerUp(event) {
  lastRot = currentY;
  const knobManipulatedId = knobManipulated.parentElement.parentElement.id;
  // console.log("lastRot", convertToGain(lastRot), 'knobManipulatedId', knobManipulatedId);

  if (knobManipulatedId === "knob2") {
    setBassStorage(convertToGain(lastRot));
  } else if (knobManipulatedId === "knob3") {
    setMidStorage(convertToGain(lastRot));
  } else if (knobManipulatedId === "knob4") {
    setTrebleStorage(convertToGain(lastRot));
  }

  document.removeEventListener("pointermove", OnPointerMove);
  document.removeEventListener("pointerup", OnPointerUp);
}

// SET INITIAL VALUES
knob2.style.transform = `rotate(${convertToDeg(bassFilter.gain.value)}deg)`;
ring2.style.background = bassFilter.gain.value > 0 ? "conic-gradient(var(--accent-up) " + convertToDeg(bassFilter.gain.value) + "deg, rgba(255,255,255,0.0) 0 360deg, var(--accent-down) 0deg)" : "conic-gradient(var(--accent-up) 0deg, rgba(255,255,255,0.0) 0 " + (360 + convertToDeg(bassFilter.gain.value)) + "deg, var(--accent-down) 0deg)";

knob3.style.transform = `rotate(${convertToDeg(midFilter.gain.value)}deg)`;
ring3.style.background = midFilter.gain.value > 0 ? "conic-gradient(var(--accent-up) " + convertToDeg(midFilter.gain.value) + "deg, rgba(255,255,255,0.0) 0 360deg, var(--accent-down) 0deg)" : "conic-gradient(var(--accent-up) 0deg, rgba(255,255,255,0.0) 0 " + (360 + convertToDeg(midFilter.gain.value)) + "deg, var(--accent-down) 0deg)";

knob4.style.transform = `rotate(${convertToDeg(trebleFilter.gain.value)}deg)`;
ring4.style.background = trebleFilter.gain.value > 0 ? "conic-gradient(var(--accent-up) " + convertToDeg(trebleFilter.gain.value) + "deg, rgba(255,255,255,0.0) 0 360deg, var(--accent-down) 0deg)" : "conic-gradient(var(--accent-up) 0deg, rgba(255,255,255,0.0) 0 " + (360 + convertToDeg(trebleFilter.gain.value)) + "deg, var(--accent-down) 0deg)";

// SET VALUES KNOBS
function setKnobValue(knob, value) {
  if (knob === "knob2") {
    knobManipulated = knob2;
    ringManipulated = ring2;
  } else if (knob === "knob3") {
    knobManipulated = knob3;
    ringManipulated = ring3;
  } else if (knob === "knob4") {
    knobManipulated = knob4;
    ringManipulated = ring4;
  }

  knobManipulated.style.transform = `rotate(${convertToDeg(value)}deg)`;
  ringManipulated.style.background = value > 0 ? "conic-gradient(var(--accent-up) " + convertToDeg(value) + "deg, rgba(255,255,255,0.0) 0 360deg, var(--accent-down) 0deg)" : "conic-gradient(var(--accent-up) 0deg, rgba(255,255,255,0.0) 0 " + (360 + convertToDeg(value)) + "deg, var(--accent-down) 0deg)";
}

// METODOS AUXILIARES
function convertRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

// Específico para converter -140e140 para -40 a 40
function convertToGain(value) {
  return convertRange(value, -140, 140, -40, 40);
}

// Específico para converter -40 a 40 para -140 a 140
function convertToDeg(value) {
  return convertRange(value, -40, 40, -140, 140);
}

// EVENTOS DE CONTROLES DE KNOBS
document.addEventListener("DOMContentLoaded", function () {
  knob2.addEventListener("mousedown", function () {
    knobManipulated = knob2;
    ringManipulated = ring2;
  });

  knob3.addEventListener("mousedown", function () {
    knobManipulated = knob3;
    ringManipulated = ring3;
  });

  knob4.addEventListener("mousedown", function () {
    knobManipulated = knob4;
    ringManipulated = ring4;
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// VOLUME KNOB /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var knobVol = document.querySelector("#knob1 .knob-indicator-container");
var ringVol = document.querySelector("#knob1 .ring-fill");

knobVol.onpointerdown = OnPointerDownVol;

function OnPointerDownVol(event, el) {
  document.addEventListener("pointermove", OnPointerMoveVol);
  document.addEventListener("pointerup", OnPointerUpVol);
  startY = event.clientY;
}

function OnPointerMoveVol(event) {
  let delta = startY - event.clientY;
  currentY = lastRot + delta * speed;

  if (currentY > maxRot) currentY = maxRot;
  if (currentY < -maxRot) currentY = -maxRot;

  let proportion = ((currentY + maxRot) / (2 * maxRot)) * 100;
  let startColor = "var(--accent-vol, #00f)";
  let endColor = "rgba(255, 255, 255, 0.0)";

  VOLUME = convertVolToGain(currentY);
  setVolumeStorage(VOLUME);

  knobVol.style.transform = "rotate(" + currentY + "deg)";
  ringVol.style.background = `linear-gradient(to right, ${startColor} ${proportion}%, ${endColor} ${proportion}%)`;
}

function OnPointerUpVol(event) {
  lastRot = currentY;
  VOLUME = convertVolToGain(lastRot);
  document.removeEventListener("pointermove", OnPointerMoveVol);
  document.removeEventListener("pointerup", OnPointerUpVol);
}

// SET INITIAL VOLUME VALUE
let proportion = ((convertVolToDeg(VOLUME) + maxRot) / (2 * maxRot)) * 100;
let startColor = "var(--accent-vol, #00f)";
let endColor = "rgba(255, 255, 255, 0.0)";
ringVol.style.background = `linear-gradient(to right, ${startColor} ${proportion}%, ${endColor} ${proportion}%)`;
knobVol.style.transform = `rotate(${convertVolToDeg(VOLUME)}deg)`;

// SET VALUES KNOBS
function setKnobValueVolume(value) {
  let proportion = ((convertVolToDeg(value) + maxRot) / (2 * maxRot)) * 100;
  let startColor = "var(--accent-vol, #00f)";
  let endColor = "rgba(255, 255, 255, 0.0)";
  knobVol.style.transform = `rotate(${convertVolToDeg(value)}deg)`;
  ringVol.style.background = `linear-gradient(to right, ${startColor} ${proportion}%, ${endColor} ${proportion}%)`;
}

// Específico para converter 0 a 100 para -140 a 140
function convertVolToDeg(value) {
  return convertRange(value, 0, 100, -140, 140);
}

function convertVolToGain(value) {
  return convertRange(value, -140, 140, 0, 100);
}
