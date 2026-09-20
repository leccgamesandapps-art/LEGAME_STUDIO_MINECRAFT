/**
 * Minecraft LE — Block Registry (Foundation)
 * LEGAME Studio
 * Normal block names only (no "LE" prefix).
 */

export const BlockRegistry = {
  blocks: {
    air:          { id: 0,  name: 'Air',          solid: false, transparent: true },
    grass_block:  { id: 1,  name: 'Grass Block',  solid: true,  hardness: 0.6 },
    dirt:         { id: 2,  name: 'Dirt',         solid: true,  hardness: 0.5 },
    stone:        { id: 3,  name: 'Stone',        solid: true,  hardness: 1.5 },
    cobblestone:  { id: 4,  name: 'Cobblestone',  solid: true,  hardness: 2.0 },
    oak_log:      { id: 5,  name: 'Oak Log',      solid: true,  hardness: 2.0 },
    oak_planks:   { id: 6,  name: 'Oak Planks',   solid: true,  hardness: 2.0 },
    sand:         { id: 7,  name: 'Sand',         solid: true,  hardness: 0.5, gravity: true },
    gravel:       { id: 8,  name: 'Gravel',       solid: true,  hardness: 0.6, gravity: true },
    glass:        { id: 9,  name: 'Glass',        solid: true,  transparent: true, hardness: 0.3 },
    crafting_table: { id: 10, name: 'Crafting Table', solid: true, hardness: 2.5 },
    furnace:      { id: 11, name: 'Furnace',      solid: true,  hardness: 3.5 },
    chest:        { id: 12, name: 'Chest',        solid: true,  hardness: 2.5 }
  },

  get(nameOrId) {
    if (typeof nameOrId === 'number') {
      return Object.values(this.blocks).find(b => b.id === nameOrId);
    }
    return this.blocks[nameOrId] || null;
  },

  getName(id) {
    const b = this.get(id);
    return b ? b.name : 'Unknown';
  }
};
