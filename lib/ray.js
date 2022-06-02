import { createVector, Vector2D } from '@georgedoescode/vector2d';

class Ray {
  constructor(position, angle) {
    this.position = position;
    this.dir = Vector2D.fromAngle(angle);
  }

  cast(boundary) {
    const x1 = boundary.a.x;
    const y1 = boundary.a.y;
    const x2 = boundary.b.x;
    const y2 = boundary.b.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.dir.x;
    const y4 = this.position.y + this.dir.y;

    const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (d === 0) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

    if (t > 0 && t < 1 && u > 0) {
      return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    } else {
      return null;
    }
  }
}

function createRay(x, y) {
  return new Ray(x, y);
}

export { createRay };
