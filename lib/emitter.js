import { createVector, Vector2D } from '@georgedoescode/vector2d';
import { createRay } from './ray';

class Emitter {
  constructor(x, y, numRays = 32) {
    this.position = new createVector(x, y);
    this.rays = [];

    for (let a = 0; a < 359.9; a += 360 / numRays) {
      this.rays.push(createRay(this.position, a * (Math.PI / 180.0)));
    }
  }

  updatePosition(x, y) {
    this.position.set(x, y);
  }

  emit(boundaries) {
    const intersectionPoints = [];

    for (const ray of this.rays) {
      let closest = null;
      let record = Infinity;

      for (let boundary of boundaries) {
        const pt = ray.cast(boundary);

        if (pt) {
          const d = Vector2D.dist(this.position, pt);

          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        intersectionPoints.push({
          x: closest.x,
          y: closest.y,
        });
      }
    }

    return intersectionPoints;
  }
}

function createEmitter(x, y, numRays) {
  return new Emitter(x, y, numRays);
}

export { createEmitter };
