// code below is taken directly from two repositories and smooshed together
// the owners of the code are respectively :
// both code combinations have been stripped and modified to fit needs of this assignment


// pitch detection
    // https://editor.p5js.org/ml5/sketches/H8iUid_ADl

// connection to sonic pi
    // mr bomb music at https://github.com/mrbombmusic/sonic-pi-drum-rnn-gui


// connection variables
var socket;
var isConnected;


// pitch detection variables
let mic;
let pitch;
let audioContext;

// crepe model for pitch detection
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

// key ratio and our scale detection
const keyRatio = 0.58;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];


// current variables
let paused = true;
let notes_played = [];
let notes_time = [];
let currentNote = '';


// SOURCE FOR CODE BELOW MODIFIED BUT STILL FROM: mr bomb music at https://github.com/mrbombmusic/sonic-pi-drum-rnn-gui
// connection (port in, port out)
setupOsc(12004, 4560);

// attempting to connect
socket.emit('message', ['/testMessage', 0]);

// if send midi button is clicked
document.getElementById('sendMidi').onclick = async () => {
    sendBeat();
}

// send the beat
function sendBeat(note, step) {
  if (isConnected) {
    socket.emit('message', ['/notes', notes_played]);
    socket.emit('message', ['/times', notes_time]);
  }
  // clear the notes_played list
  notes_played = [];
  notes_time = [];
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


// SOURCE FOR CODE BELOW MODIFIED BUT STILL FROM: https://editor.p5js.org/ml5/sketches/H8iUid_ADl
function setup() {
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  button = createButton('allow mic');
  // button.position(0, 0);
  button.mousePressed(touchStarted);


  button1 = createButton('pause mic');
  // button1.position(100, 0);
  button1.mousePressed(touchPaused);

  button2 = createButton('record');
  // button.position(0, 0);
  button2.mousePressed(touchRecord);

  button3 = createButton('clear');
  // button.position(0, 0);
  button3.mousePressed(touchClear);
  
}

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function touchStarted() {
  console.log("allowing microphone access ---")
  getAudioContext().resume();
}

function touchPaused() {
  console.log("paused audio *********")
  paused = true;
  console.log("current list: ", notes_played)
}

function touchRecord() {
  console.log("playing audio %%%%%%")
  paused = false;
}

function touchClear() {
  console.log("playing audio ++++++++")
  notes_played = []
  notes_time = []
  console.log(notes_played, notes_time)
  console.log("++++++++++++")
}

function clearSend() {
  sendBeat();
  touchClear();
  touchRecord();
}


// send notes every second
setInterval(clearSend(), {
}, 1000);

setInterval(clearSend, 1000);

//Load the model and get the pitch
function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function addNotes(midiNum) {
  
  // check if the previous note is the same, if so do nothing
  if(paused !== true){
    if (notes_played[notes_played.length - 1] !== midiNum){
      // new note - push note and new time
      notes_played.push(midiNum)
      notes_time.push(0.1);
      console.log("MIDI NUMBER HERE", midiNum)
    } else {
      // old time, time += 1
      notes_time[notes_played.length - 1] = notes_time[notes_played.length - 1] + 0.1;
    }
  }
}

// Get the pitch, find the closest note and set the fill color
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];

      if(paused !== true){
        addNotes(midiNum)
        // notes_played.push(midiNum);
        // console.log(notes_played);
      }

    }

    getPitch();
  })
}
