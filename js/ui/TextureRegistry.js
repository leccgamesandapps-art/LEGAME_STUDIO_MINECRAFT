/**
 * Minecraft LE — Default Texture Registry
 * LEGAME Studio
 * Original Default RP style textures (not Mojang assets)
 */

export const TextureRegistry = {
  ui: {
    button: 'assets/textures/ui/button.svg',
    panel: 'assets/textures/ui/panel.svg',
    slot: 'assets/textures/ui/slot.svg'
  },
  blocks: {
    air: null,
    grass_block: 'assets/textures/blocks/grass.svg',
    dirt: 'assets/textures/blocks/dirt.svg',
    stone: 'assets/textures/blocks/stone.svg'
  },
  items: {},
  entities: {},

  get(category, name) {
    return this[category]?.[name] || null;
  },

  asBackground(category, name) {
    const src = this.get(category, name);
    return src ? `url(${src})` : 'none';
  }
};
