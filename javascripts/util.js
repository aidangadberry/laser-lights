export const getRotatedLaserPos = (x, y, width, height, rad) => {
  const theta = rad / 2;
  const h = width * Math.sin(theta);

  const dx = h * Math.sin(theta);
  const dy = h * Math.cos(theta);

  return [x + width - dx, y + height / 2 + dy];
}
