// ZDOG stuff
const TAU = Zdog.TAU;

const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  zoom: 10
});

// ---- model ---- //
const head = new Zdog.Shape({
  addTo: illo,
  stroke: 12,
  color: 'gold'
});

const eye = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 2,
  translate: { x: -2, y: 1, z: 4.5 },
  rotate: { z: -TAU/4 },
  color: '#444',
  stroke: 0.5,
  backface: false
});

const eyelash = new Zdog.Shape({
  addTo: eye,
  path: [
    { x: 1 },
    { x: 2 }
  ],
  translate: { y: -0.25, x: -0.5 },
  rotate: { z: -TAU/6 },
  stroke: 0.25,
  color: '#444'
});

eyelash.copy({
  translate: { y: -0.3 },
  path: [
    { x: 1 },
    { x: 1.5 }
  ],
  stroke: 0.25
});

const secondEye = eye.copy({
  translate: { x: 2, y: 1, z: 4.5 },
  color: '#444'
});

const secondEyelash = new Zdog.Shape({
  addTo: secondEye,
  path: [
    { x: 1.75 },
    { x: 2.75 }
  ],
  translate: { y: -0.5, x: -0.9 },
  rotate: { z: TAU/6 },
  stroke: 0.25,
  color: '#444'
});

secondEyelash.copy({
  translate: { y: 0.2 },
  path: [
    { x: 1 },
    { x: 1.5 }
  ],
  stroke: 0.25
});

// smile
new Zdog.Ellipse({
  addTo: head,
  diameter: 3,
  quarters: 2,
  translate: { y: 2.5, z: 4.5 },
  rotate: { z: TAU/4 },
  closed: true,
  color: '#FED',
  stroke: 0.5,
  fill: true,
  backface: false
});

new Zdog.Shape({
  addTo: head,
  path: [
    { x: 0, y: -6, z: 2 },   // start
    { arc: [
      { x: 6, y: -6, z: 2  }, // corner
      { x: 6, y: 0, z: 2  } // end point
    ]},
    { arc: [ // start next arc from last end point
      { x: 6, y: 6, z: 2  }, // corner
      { x: 8, y: 6, z: 2  } // end point
    ]}
  ],
  closed: false,
  stroke: 2,
  color: '#4d2d1a'
});

new Zdog.Shape({
  addTo: head,
  path: [
    { x: 0, y: -6, z: 2 },   // start
    { arc: [
      { x: -6, y: -6, z: 2  }, // corner
      { x: -6, y: 0, z: 2  } // end point
    ]},
    { arc: [ // start next arc from last end point
      { x: -6, y: 6, z: 2  }, // corner
      { x: -8, y: 6, z: 2  } // end point
    ]}
  ],
  closed: false,
  stroke: 2,
  color: '#4d2d1a'
});

const headPhones = new Zdog.Ellipse({
  addTo: head,
  diameter: 15,
  width: 15,
  quarters: 2,
  stroke: 2,
  rotate: { z: - TAU/4 },
  color: '#C25'
});

const earPhone = new Zdog.Hemisphere({
  addTo: headPhones,
  color: '#C25',
  diameter: 3,
  translate: { y: -7, x: -1 },
  rotate: { x: TAU/4 }
});

earPhone.copy({
  translate: { y: 7, x: -1 },
  rotate: { x: -TAU/4 }
});

const hand = new Zdog.Shape({
  addTo: head,
  color: 'gold',
  translate: { x: 8, y: 5, z: 5 },
  stroke: 3
});

// Head follows mouse
// TODO: debounce/throttle
window.addEventListener('mousemove', (e) => {
  const element = illo.element;
  const yDistance = e.pageY - element.offsetTop - element.offsetHeight/2;
  const xDistance = e.pageX - element.offsetLeft - element.offsetWidth/2;
  if (yDistance/1000 <= 0.5 && yDistance/1000 >= -0.5 ) head.rotate.x = -yDistance/1000;
  if (xDistance/1000 <= 0.5 && xDistance/1000 >= -0.5 ) head.rotate.y = -xDistance/1000;
});

// -- animate --- //
let motionForward = true;
function animate() {
  wave();
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

function wave() {
  if (hand.translate.y < 8 && motionForward) {
    hand.translate.x += 0.07;
    hand.translate.y += 0.1;
  } else {
    motionForward = false;
    hand.translate.x -= 0.07;
    hand.translate.y -= 0.1;
  }

  if (hand.translate.y <= 5) motionForward = true;
}

animate();

// Speech stuff
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var questions = [ 'What do yo do?', 'Where are you from?', 'How did you learn to code?', 'What is your professional experience?'];
var grammar = '#JSGF V1.0; grammar questions; public <question> = ' + questions.join(' | ') + ' ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

const button = document.getElementsByClassName('speech')[0];
const text = document.getElementsByClassName('text')[0];
button.addEventListener('click', () => {
  recognition.start();
  console.log('Ready to receive a question.');
});

const responses = {
  'what do you do': 'I am a frontend web developer'
};

recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var result = event.results[last][0].transcript;
  if (responses[result]) {
    text.innerHTML = responses[result];
  } else {
    text.innerHTML = 'I\'m sorry, I didn\'t catch that, could you try again?';
  }
  console.log('Confidence: ' + event.results[0][0].confidence);
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onerror = function() {
  console.log('not recognised');
};
