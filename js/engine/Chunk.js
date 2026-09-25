/**
 * Minecraft LE — Chunk System
 * LEGAME Studio
 */

export class Chunk {
  constructor(x, z, size = 16) {
    this.x = x;
    this.z = z;
    this.size = size;
    this.blocks = new Uint8Array(size * size * size);
    this.dirty = true;
    this.mesh = null;
  }

  index(x, y, z) {
    return y * this.size * this.size + z * this.size + x;
  }

  getBlock(x, y, z) {
    if (x < 0 || y < 0 || z < 0 || x >= this.size || y >= this.size || z >= this.size) return 0;
    return this.blocks[this.index(x, y, z)];
  }

  setBlock(x, y, z, id) {
    if (x < 0 || y < 0 || z < 0 || x >= this.size || y >= this.size || z >= this.size) return;
    this.blocks[this.index(x, y, z)] = id;
    this.dirty = true;
  }

  generateFlat(grassId = 1, dirtId = 2, stoneId = 3) {
    for (let x = 0; x < this.size; x++) {
      for (let z = 0; z < this.size; z++) {
        for (let y = 0; y < this.size; y++) {
          if (y === 0) this.setBlock(x, y, z, stoneId);
          else if (y < 3) this.setBlock(x, y, z, dirtId);
          else if (y === 3) this.setBlock(x, y, z, grassId);
          else this.setBlock(x, y, z, 0);
        }
      }
    }
    this.dirty = true;
  }
}
