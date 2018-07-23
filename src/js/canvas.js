$(() => {
  // event listeners
  window.addEventListener('resize', initialize);

  // variables
  const circles = [];
  const canvas = document.querySelector('canvas');

  let c = undefined;

  // classes
  class Circle {
    constructor(x, y, dx, dy, radius, rChange) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.rChange = rChange;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = 'white';
      c.fillStyle = 'white';
      c.shadowBlur = 10;
      c.shadowColor = 'yellow';
      c.stroke();
      c.fill();
    }

    update() {
      if (this.radius > 2 || this.radius < .8){
        this.rChange = - this.rChange;
      }
      this.radius += this.rChange;
      this.draw();
    }
  }

  for (var i = 0; i < 200; i++) {
    const radius =  Math.random() * 1.7 + .5;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5);
    const dy = (Math.random() - 0.5);
    const rChange = Math.random() / 10 - 0.01;
    circles.push(new Circle(x, y, dx, dy, radius, rChange));
  }

  initialize();


  function initialize() {
    c = canvas.getContext('2d');
    c.clearRect(0, 0, innerWidth, innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    circles.forEach(circle => circle.update());
  }

});
