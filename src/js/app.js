const TAU = Zdog.TAU;

const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  zoom: 10
});

// ---- model ---- //
const head = new Zdog.Shape({
  addTo: illo,
  stroke: 12,
  color: 'gold',
  rotate: { y: -0.25 }
});

const eye = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 2,
  translate: { x: -2, y: 1, z: 4.5 },
  rotate: { z: -TAU/4 },
  color: '#636',
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
  color: '#636'
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
  color: '#636'
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
  color: '#636'
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
  color: '#636'
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
  color: '#636'
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
  head.rotate.x = -yDistance/1000;
  head.rotate.y = -xDistance/1000;
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
