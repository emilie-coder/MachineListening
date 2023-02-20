

var socket;
var isConnected;


let vol = 0.0;
let mic;
let pitch;
let audioContext;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

const keyRatio = 0.58;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

let paused = true;
let notes_played = [];
let currentNote = '';


setupOsc(12004, 4560);


socket.emit('message', ['/test', 0]);

document.getElementById('matrix').onclick = async () => {
  checkMatrix();
}

function checkMatrix() {
  sendBeat();
}

function sendBeat(note, step) {
  if (isConnected) {
    socket.emit('message', ['/notes', notes_played]);
  }
  notes_played = [];
}

function sendOsc(address, value) {
  socket.emit('message', [address, value]);
}

function setupOsc(oscPortIn, oscPortOut) {

  socket = io.connect('http://127.0.0.1:8081', {
    port: 8081,
    rememberTransport: false
  });
  socket.on('connect', function() {
    socket.emit('config', {
      server: {
        port: oscPortIn,
        host: '127.0.0.1'
      },
      client: {
        port: oscPortOut,
        host: '127.0.0.1'
      }
    });
  });
  socket.on('connect', function() {
    isConnected = true;
  });
  socket.on('message', function(msg) {
    if (msg[0] == '#bundle') {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });

}


function setup() {
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  button = createButton('start mic');
  // button.position(0, 0);
  button.mousePressed(touchStarted);


  button1 = createButton('pause mic');
  // button1.position(100, 0);
  button1.mousePressed(touchPaused);
  
}

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function touchStarted() {
  paused = false;
  getAudioContext().resume();
}

function touchPaused() {
  notes_played = [];
  paused = true;
}

function sendNotes() {
  notes_played = [];
}



//Load the model and get the pitch
function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function addNotes(midiNum) {
  
  // check if the previous note is the same, if so do nothing
  // if (notes_played[notes_played.length - 1] !== midiNum){
    notes_played.push(midiNum)
  // }

}

//Get the pitch, find the closest note and set the fill color
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];
      // fill(colors[midiNum % 12]);
      // select('#noteAndVolume').html('Note: ' + currentNote + " - volume " + nf(vol,1,2));

      if(paused !== true){
        addNotes(midiNum)
        // notes_played.push(midiNum);
        // console.log(notes_played);
      }

    }

    getPitch();
  })
}
