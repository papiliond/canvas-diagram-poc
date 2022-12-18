/**
 * @typedef {"top1" | "top2" | "right1" | "right2" | "bottom1" | "bottom2" | "left1" | "left2" } PortPosition
 */

class CanvasObject {
  /**
   * @type {Map<PortPosition, string>}
   */
  connectedObjects = new Map();

  constructor(src, x, y, width, height, ratio) {
    this.uuid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    this.src = src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ratio = ratio;
    this.positions = [x, y, x + width, y + height];
  }

  /**
   * @returns {CanvasObject}
   */
  draw() {
    drawObject(this.src, this.x, this.y, this.width, this.height, this.ratio);
    return this;
  }

  /**
   *
   * @param {PortPosition} pos1
   * @param {CanvasObject} obj2
   * @param {PortPosition} pos2
   * @param {string} color
   */
  connectObject(pos1, obj, pos2, color) {
    connectObjects(this, obj, color, pos1, pos2);
    this.connectedObjects.set(pos1, obj.uuid);
    obj.connectedObjects.set(pos2, this.uuid);
  }
}

/**
 *
 * @param {string} src
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} ratio
 */
function drawObject(src, x, y, width, height, ratio) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.stroke();

  const base_image = new Image();
  base_image.src = src;
  base_image.onload = function () {
    // ctx.drawImage(base_image, x, y, width, width / ratio);
  };
}

/**
 *
 * @param {CanvasObject} obj1
 * @param {CanvasObject} obj2
 * @param {string} color
 * @param {PortPosition} pos1
 * @param {PortPosition} pos2
 */
function connectObjects(obj1, obj2, color = "red", pos1 = "right1", pos2 = "left1") {
  const [leftObj, rightObj] = obj1.positions[0] < obj2.positions[0] ? [obj1, obj2] : [obj1, obj2];
  const start = getPort(leftObj.positions, pos1);
  const end = getPort(rightObj.positions, pos2);
  const mid1 = [start[0] + (end[0] - start[0]) / 2, start[1]];
  const mid2 = [start[0] + (end[0] - start[0]) / 2, end[1]];

  ctx.beginPath();
  ctx.moveTo(...start);
  ctx.lineTo(...mid1);
  ctx.lineTo(...mid2);
  ctx.lineTo(...end);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 *
 * @param {CanvasObject} obj
 * @param {PortPosition} position
 * @returns
 */
function getPort(obj, position) {
  const OFFSET = 20;

  if (position === "right1") {
    return [obj[2], obj[3] - (obj[3] - obj[1]) / 2 - OFFSET];
  } else if (position === "right2") {
    return [obj[2], obj[3] - (obj[3] - obj[1]) / 2 + OFFSET];
  } else if (position === "left1") {
    return [obj[0], obj[3] - (obj[3] - obj[1]) / 2 - OFFSET];
  } else if (position === "left2") {
    return [obj[0], obj[3] - (obj[3] - obj[1]) / 2 + OFFSET];
  } else if (position === "top1") {
    return [obj[2] - (obj[2] - obj[0]) / 2 - OFFSET, obj[1]];
  } else if (position === "top2") {
    return [obj[2] - (obj[2] - obj[0]) / 2 + OFFSET, obj[1]];
  } else if (position === "bottom1") {
    return [obj[2] - (obj[2] - obj[0]) / 2 - OFFSET, obj[3]];
  } else if (position === "bottom2") {
    return [obj[2] - (obj[2] - obj[0]) / 2 + OFFSET, obj[3]];
  }
}
