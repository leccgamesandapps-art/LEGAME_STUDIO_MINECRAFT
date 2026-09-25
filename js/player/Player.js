/**
 * Minecraft LE — Player Controller
 * LEGAME Studio
 */

export class Player {
  constructor() {
    this.x = 8;
    this.y = 5;
    this.z = 8;
    this.yaw = 0;
    this.pitch = 0;
    this.speed = 8;
    this.sprintMult = 1.6;
    this.eyeHeight = 1.6;
  }

  get position() {
    return { x: this.x, y: this.y, z: this.z };
  }

  get forward() {
    const cosPitch = Math.cos(this.pitch);
    return {
      x: Math.sin(this.yaw) * cosPitch,
      y: Math.sin(this.pitch),
      z: -Math.cos(this.yaw) * cosPitch
    };
  }

  move(dx, dy, dz, dt, sprint = false) {
    const speed = this.speed * (sprint ? this.sprintMult : 1) * dt;
    this.x += dx * speed;
    this.y += dy * speed;
    this.z += dz * speed;
  }

  look(dyaw, dpitch) {
    this.yaw += dyaw;
    this.pitch += dpitch;
    const limit = Math.PI / 2 - 0.01;
    if (this.pitch > limit) this.pitch = limit;
    if (this.pitch < -limit) this.pitch = -limit;
  }
}
