export const getRotatedLaserPos = (x, y, width, height, rad) => {
  const theta = rad / 2;
  const h = width * Math.sin(theta);

  const dx = h * Math.sin(theta);
  const dy = h * Math.cos(theta);

  return [x + width - dx, y + height / 2 + dy];
}

export const getRotatedPos = (pos, centerPos, rad) => {
  const cx = centerPos[0];
  const cy = centerPos[1];
  let px = pos[0];
  let py = pos[1];

  px -= cx;
  py -= cy;

  const rx = px * Math.cos(rad) - py * Math.sin(rad);
  const ry = px * Math.sin(rad) + py * Math.cos(rad);

  return [rx + cx, ry + cy];
}

export const isInBounds = pos => {
  const canvas = document.getElementById('canvas');
  const width = parseInt(canvas.style.width.slice(0, -2));
  const height = parseInt(canvas.style.height.slice(0, -2));

  return (pos[0] > 0 && pos[0] < width && pos[1] > 0 && pos[1] < height);
}


export const pointIsOnMirrorEdge = (pos, mirror) => {
  const x0 = getRotatedPos(pos, mirror.getCenterPos(), -mirror.rad)[0];
  const y0 = getRotatedPos(pos, mirror.getCenterPos(), -mirror.rad)[1];
  const x1 = mirror.corners()[0][0];
  const y1 = mirror.corners()[0][1];
  const x2 = mirror.corners()[1][0];
  const y2 = mirror.corners()[1][1];

  const dist = Math.abs((y2 - y1)*x0 - (x2 - x1)*y0 + x2*y1 - y2*x1) / mirror.width;

  return (dist <=  .2);
}

export const collidesWithObject = (pos, object) => {
  const rotatedPos = getRotatedPos(pos, object.getCenterPos(), -object.rad);

  return (
    rotatedPos[0] >= object.x && rotatedPos[0] <= object.x + object.width &&
    rotatedPos[1] >= object.y && rotatedPos[1] <= object.y + object.height
  );
}
