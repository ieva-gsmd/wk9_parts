let part, part2;
let isPressed = false;
let is2Pressed = false;
let val;
let toneStarted = false;

let synth, synth2;
let playing, note;
let seq;
let seq1, seq2;

function setup() {
canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("sketch-container");
addGUI();

const lfilter = new Tone.Filter({
  frequency: 500,
  type: 'lowpass',
  rolloff: -48
}).toDestination();

synth = new Tone.Synth({
  volume: -12
}).connect(lfilter);

synth2 = new Tone.Synth({
  volume: -12
}).connect(lfilter);

const reverb = new Tone.Reverb({
  wet: 0.5,
  decay: 5
}).toDestination();

lfilter.connect(reverb);

// seq1 = ["C4", ["E4", 0, "E4"], "G4", ["A4", "G4"]];

// seq = new Tone.Sequence((time, note) => {
// 	synth.triggerAttackRelease(note, 0.1, time);
// 	// subdivisions are given as subarrays
// }, seq1).start(0);


part = new Tone.Part(((time, note) => {
	// the notes given as the second element in the array
	// will be passed in as the second argument
	synth.triggerAttackRelease(note, "8n", time);
}), [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);
part.loop = 8;

part2 = new Tone.Part(((time, note) => {
	// the notes given as the second element in the array
	// will be passed in as the second argument
	synth2.triggerAttackRelease(note, "8n", time);
}), [[0, "C4"], ["0:2", "A3"], ["0:3", "C4"]]);

Tone.Transport.start();
Tone.Transport.bpm.value = 80;

}

function draw() {

val = slider.value();
background(val, 100, 100);
synth.volume.value = val;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function addGUI() {
    button2 = createButton("Part2");
    button2.addClass("button");
    button2.position(width/2 - 75, height/2);
    button2.mousePressed(bPress2);

    button = createButton("Part1");
    button.addClass("button");
    button.position(width/2 - 75, height/2 - 100);
    button.mousePressed(bPress);
  

    slider = createSlider(-80, 12, -12, 1);
    slider.addClass("slider");
    slider.position(width/2 - 75, height/2 + 100);
    //slider.style('width', '80px');
  }

  function bPress() {
    if (!toneStarted) {
      Tone.start();
      toneStarted = true;
    }
    console.log('button pressed')
    if (isPressed) {
      isPressed = false;
      button.html("Part1");
      part.stop();
      //button.removeClass("inactive");
    } else {
      isPressed = true;
      button.html("Part1");
      part.start();
    }
  }

  function bPress2() {
    if (!toneStarted) {
      Tone.start();
      toneStarted = true;
    }
    console.log('button 2 pressed')
    if (is2Pressed) {
      is2Pressed = false;
      button2.html("Part2");
      part2.stop();
      //button.removeClass("inactive");
    } else {
      is2Pressed = true;
      button2.html("Part2");
      part2.start();
    }
  }

