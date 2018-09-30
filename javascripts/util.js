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
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  px -= cx;
  py -= cy;

  const rx = px * cos - py * sin;
  const ry = px * sin + py * cos;

  return [rx + cx, ry + cy];
}

export const isInBounds = (pos, canvas) => {
  const width = canvas.width;
  const height = canvas.height;

  return (pos[0] > 0 && pos[0] < width && pos[1] > 0 && pos[1] < height);
}


export const pointIsOnMirrorEdge = (pos, mirror) => {
  const x0 = getRotatedPos(pos, mirror.getCenterPos(), -mirror.rad)[0];
  const y0 = getRotatedPos(pos, mirror.getCenterPos(), -mirror.rad)[1];
  const corners = mirror.corners();
  const x1 = corners[0][0];
  const y1 = corners[0][1];
  const x2 = corners[1][0];
  const y2 = corners[1][1];

  const dist = Math.abs((y2 - y1)*x0 - (x2 - x1)*y0 + x2*y1 - y2*x1) / mirror.width;

  return (dist <=  .5);
}

export const collidesWithObject = (pos, object) => {
  const rotatedPos = getRotatedPos(pos, object.getCenterPos(), -object.rad);

  return (
    rotatedPos[0] >= object.x && rotatedPos[0] <= object.x + object.width &&
    rotatedPos[1] >= object.y && rotatedPos[1] <= object.y + object.height
  );
}
