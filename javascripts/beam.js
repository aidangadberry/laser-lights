import {
  getRotatedLaserPos,
  isInBounds,
  pointIsOnMirrorEdge,
  collidesWithObject
} from './util';
import Mirror from './mirror';

function drawBeams(positions, color) {
  const ctx = document.getElementById("canvas").getContext("2d");

  ctx.beginPath();
  
  for (let i = 0; i < positions.length - 1; i += 1) {
    ctx.moveTo(positions[i][0], positions[i][1]);
    ctx.lineTo(positions[i + 1][0], positions[i + 1][1]);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
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
  const positions = [startPos];

  while (beamEnd === false) {
    ({endPos, angle, beamEnd} = getBeamCollision(startPos, angle, entities));
    startPos = endPos.slice(0);
    positions.push(startPos.slice(0));
  }

  drawBeams(positions, laser.color);
}
