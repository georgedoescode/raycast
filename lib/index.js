import { checkIntersection } from 'line-intersect';

class Raycaster {
  constructor(segments) {
    this.uniquePoints = [];
    this.uniqueAngles = [];

    this.setSegments(segments);
  }

  setSegments(segments) {
    const uniquePoints = segments.reduce((arr, curr) => {
      for (const point of Object.values(curr)) {
        if (!arr.some((p) => p.x === point.x && p.y === point.y)) {
          arr.push(curr.a, curr.b);
        }
      }

      return arr;
    }, []);

    const intersections = segments.reduce((acc, curr) => {
      for (const segment of segments) {
        const intersection = checkIntersection(
          curr.a.x,
          curr.a.y,
          curr.b.x,
          curr.b.y,
          segment.a.x,
          segment.a.y,
          segment.b.x,
          segment.b.y
        );

        if (
          intersection.type === 'intersecting' &&
          !acc.some(
            (i) => i.x === intersection.point.x && i.y !== intersection.point.y
          )
        ) {
          acc.push({ x: intersection.point.x, y: intersection.point.y });
        }
      }

      return acc;
    }, []);

    this.uniquePoints = [...intersections, ...uniquePoints];
    this.segments = segments;
  }

  createRay(x, y, angle) {
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    return {
      a: { x: x, y: y },
      b: { x: x + dx, y: y + dy },
    };
  }

  getIntersection(ray, segment) {
    const r_px = ray.a.x;
    const r_py = ray.a.y;
    const r_dx = ray.b.x - ray.a.x;
    const r_dy = ray.b.y - ray.a.y;

    const s_px = segment.a.x;
    const s_py = segment.a.y;
    const s_dx = segment.b.x - segment.a.x;
    const s_dy = segment.b.y - segment.a.y;

    if (r_dx * s_dy === r_dy * s_dx) {
      return null;
    }

    const T2 =
      (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) /
      (s_dx * r_dy - s_dy * r_dx);
    const T1 = (s_py + s_dy * T2 - r_py) / r_dy;

    if (T1 < 0) return null;
    if (T2 < 0 || T2 > 1) return null;

    return {
      x: r_px + r_dx * T1,
      y: r_py + r_dy * T1,
      param: T1,
    };
  }

  emit(x, y) {
    const uniqueAngles = [];

    for (let i = 0; i < this.uniquePoints.length; i++) {
      const point = this.uniquePoints[i];

      const angle = Math.atan2(point.y - y, point.x - x);

      uniqueAngles.push(angle - 0.0001, angle, angle + 0.0001);
    }

    const intersects = [];

    for (let i = 0; i < uniqueAngles.length; i++) {
      const angle = uniqueAngles[i];

      const ray = this.createRay(x, y, angle);

      let closestIntersect = null;

      for (let j = 0; j < this.segments.length; j++) {
        const segment = this.segments[j];

        const intersect = this.getIntersection(ray, segment);

        if (!intersect) continue;

        if (!closestIntersect || intersect.param < closestIntersect.param) {
          closestIntersect = intersect;
        }
      }

      if (!closestIntersect) continue;
      closestIntersect.angle = angle;

      intersects.push(closestIntersect);
    }

    return intersects.sort((a, b) => {
      return a.angle - b.angle;
    });
  }
}

function createRaycaster(segments) {
  return new Raycaster(segments);
}

function createSegment(x1, y1, x2, y2) {
  return {
    a: {
      x: x1,
      y: y1,
    },
    b: {
      x: x2,
      y: y2,
    },
  };
}

export { createRaycaster, createSegment };
