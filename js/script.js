const featurePoints = [];

const colSize = 5;
const rowSize = 5;

function createFeaturePoints(ctx, cnv, n=9) {
  ctx.fillStyle = "violet";
  const r = 5;

  for (let i = 0; i < n; i++) {
    const point = {};
    const x = Math.random() * cnv.width;
    const y = Math.random() * cnv.height;
    
    point.x = x;
    point.y = y;
    point.draw = () => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    point.velocity = [Math.random() * 4 - 2, Math.random() * 4 - 2];
    point.update = () => {
      point.x += point.velocity[0];
      point.y += point.velocity[1];

      if (point.x > cnv.width || point.x < 0) point.velocity[0] *= -1;
      if (point.y > cnv.height || point.y < 0) point.velocity[1] *= -1;

      point.draw();
    }

    point.dist = (px, py) => Math.hypot(point.x - px, point.y - py);
    featurePoints.push(point);
  }
}

function visualizeNoise(ctx, cnv, row, col) {
  for (let i = 0; i < cnv.width; i += col) {
    for (let j = 0; j < cnv.height; j += row) {
      const distances = featurePoints.map(point => point.dist(i, j)).sort((a, b) => a - b);
      const closest = distances[0] / 150;
      
      ctx.save();
      ctx.globalAlpha = closest;
      ctx.fillStyle = "black";
      ctx.fillRect(i, j, row, col);
      ctx.restore();
    }
  }
}

resizeCnv(cnv, 400, 500);
createFeaturePoints(ctx, cnv);

(function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  visualizeNoise(ctx, cnv, rowSize, colSize);
  featurePoints.forEach(p => p.update());
}());