import { createVector } from '@georgedoescode/vector2d';

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }
}

function createBoundary(x1, y1, x2, y2) {
  return new Boundary(x1, y1, x2, y2);
}

export { createBoundary };
