import {
  getRotatedLaserPos,
  isInBounds,
  pointIsOnMirrorEdge,
  collidesWithObject
} from './util';
import Mirror from './mirror';

function drawBeam(startPos, endPos) {
  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(endPos[0], endPos[1]);

  ctx.strokeStyle = "#F00";
  ctx.shadowBlur = 15;
  ctx.shadowColor = "#F00"
  
  ctx.lineWidth = 1;
  ctx.stroke();
}

function getBeamCollision(startPos, angle, entities) {
  let currPos = startPos.slice(0);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  while (isInBounds(currPos)) {
    currPos[0] += dx / 10;
    currPos[1] += dy / 10;

    for (var i = 0; i < entities.length; i++) {
      const entity = entities[i];
      
      if (collidesWithObject(currPos, entities[i])) {
        if (entity instanceof Mirror) {
          if (pointIsOnMirrorEdge(currPos, entity)) {
            return ({ endPos: currPos, angle: entity.reflectedAngle(angle), beamEnd: false });
          }
        }

        return ({ endPos: currPos, angle: angle, beamEnd: true });
      }
    }
  }

  return ({endPos: currPos, angle: angle, beamEnd: true});
}

export const getBeams = (laser, entities) => {
  let laserPos = getRotatedLaserPos(laser.x, laser.y, laser.width, laser.height, laser.rad);
  let angle = laser.rad;
  let beamEnd = false;
  let endPos;
  let startPos = laserPos.slice(0);
  
  while (beamEnd === false) {
    ({endPos, angle, beamEnd} = getBeamCollision(startPos, angle, entities));
    drawBeam(startPos, endPos);
    startPos = endPos.slice(0);
  }
}
