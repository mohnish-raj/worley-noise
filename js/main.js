const cnv = document.querySelector(".cnv");
const ctx = cnv.getContext("2d");

function resizeCnv(cnv, height=innerHeight, width=innerWidth) {
  cnv.height = height;
  cnv.width = width;

  cnv.style.cssText = `
    height: ${height}px;
    width: ${width}px;
  `;
}

function fillCtx(color="black", canvas=cnv, context=ctx) {
  context.save();
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

function randomColor() {
  const comp = () => (~~(Math.random() * 255)).toString(16).padStart(2, '0');
  return `#${comp()}${comp()}${comp()}`;
}

resizeCnv(cnv);