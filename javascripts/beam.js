import {
  getRotatedLaserPos,
  isInBounds,
  pointIsOnMirrorEdge,
  collidesWithObject
} from './util';

function drawBeam(startPos, endPos) {
  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(endPos[0], endPos[1]);
  ctx.stroke();
}


function getCollision(startPos, angle, lasers, mirrors) {
  let currPos = startPos.slice(0);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  while (isInBounds(currPos)) {
    currPos[0] += dx;
    currPos[1] += dy;

    for (var i = 0; i < mirrors.length; i++) {
      if (collidesWithObject(currPos, mirrors[i])) {
        if (pointIsOnMirrorEdge(currPos, mirrors[i])) {
          console.log("hit a mirror");
          return ({endPos: currPos, angle: mirrors[i].reflectedAngle(angle), beamEnd: false});
        } else {
          console.log("not a mirror");
          return ({endPos: currPos, angle: angle, beamEnd: true});
        }
      }
    }
  }

  console.log("border");
  return ({endPos: currPos, angle: angle, beamEnd: true});
}

export const getBeams = (laser, lasers, mirrors) => {
  let laserPos = getRotatedLaserPos(laser.x, laser.y, laser.width, laser.height, laser.rad);
  let angle = laser.rad;
  let beamEnd = false;
  let endPos;
  console.log(laserPos);

  let startPos = laserPos.slice(0);
  while (beamEnd === false) {
    ({endPos, angle, beamEnd} = getCollision(startPos, angle, lasers, mirrors));
    console.log(startPos, endPos);
    drawBeam(startPos, endPos);
    startPos = endPos.slice(0);
  }
}
