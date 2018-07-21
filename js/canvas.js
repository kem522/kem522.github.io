$(() => {
  // canvas
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');
  // Create gradient
  const grd = c.createLinearGradient(300.000, 270.000, 0.000, 30.000);

  // Add colors
  grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
  grd.addColorStop(1.000, 'rgba(0, 0, 128, 1.000)');

  // Fill with gradient
  c.fillStyle = grd;
  c.fillRect(0, 0, canvas.width, canvas.height);

  // circles

  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
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
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }

  const circles = [];

  for (var i = 0; i < 100; i++) {
    const radius = 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5);
    const dy = (Math.random() - 0.5);
    circles.push(new Circle(x, y, dx, dy, radius));
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    circles.forEach(circle => circle.update());
  }

  animate();
});
