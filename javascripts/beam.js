import {
  getRotatedLaserPos,
  isInBounds,
  pointIsOnMirrorEdge,
  collidesWithObject
} from './util';

function getBeamCollision(startPos, angle, entities) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const canvas = entities[0].ctx.canvas;
  let currPos = [startPos[0], startPos[1]];
  let collision = false;

  const beamData = {
    endPos: currPos,
    angle,
    beamEnd: true
  };

  while (isInBounds(currPos, canvas) && !collision) {
    currPos[0] += dx / 5;
    currPos[1] += dy / 5;

    for (var i = 0; i < entities.length; i++) {
      const entity = entities[i];
      
      if (collidesWithObject(currPos, entity)) {
        if (entity.mirror) {
          if (pointIsOnMirrorEdge(currPos, entity)) {
            beamData.angle = entity.reflectedAngle(angle);
            beamData.beamEnd = false;
          }
        }

        collision = true;
        break;
      }
    }
  }

  return beamData;
}

export const getBeamPositions = (laser, entities) => {
  let startPos = getRotatedLaserPos(laser.x, laser.y, laser.width, laser.height, laser.rad);
  let angle = laser.rad;
  let beamEnd = false;
  let endPos;
  const positions = [startPos];

  while (beamEnd === false) {
    ({endPos, angle, beamEnd} = getBeamCollision(startPos, angle, entities));
    startPos = endPos;
    positions.push(startPos);
  }

  return positions;
}
