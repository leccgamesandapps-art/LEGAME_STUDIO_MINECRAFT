# Minecraft LE

**Minecraft LE** is an original voxel sandbox game and private server platform  
**Developed by LEGAME Studio**

---

## Important Branding Notice

- The game is called **Minecraft LE**.
- “LE” is part of the game title/brand only.
- Blocks, items, commands, and gameplay terms use normal names  
  (Grass Block, Diamond Sword, `/give`, Creative, Survival, etc.).
- This project is **completely independent**.
- It is **not** affiliated with, endorsed by, or connected to Mojang Studios, Microsoft, or the official Minecraft game.
- Accounts and private servers are original systems operated by LEGAME Studio.

---

## Current Build: 0.1.0-alpha (Foundation)

This is a starter foundation that includes:

- Progressive Web App structure (`manifest.json`)
- Main menu with correct branding
- Worlds management (create / list / play / delete)
- Private Server system:
  - Create private servers
  - Start / Stop
  - Join codes
  - My Servers / Saved Servers / Invitations tabs
  - Privacy options (Private / Friends / Invite Code)
- Settings screens (Video, Audio, Gameplay, Controls, Accessibility, Account)
- About screen with clear LEGAME Studio attribution
- Local storage for worlds and servers
- Responsive UI
- Placeholder game view (ready for voxel engine integration)

### What is NOT implemented yet (as expected for a foundation build)

- Full voxel rendering engine
- Real terrain generation, chunks, biomes
- Block breaking / placing / physics
- Inventory, crafting, combat
- Entities / AI
- Real multiplayer networking
- Actual server process hosting
- Add-on API
- Character customization
- Marketplace
- Achievements tracking

These systems are designed to be added modularly on top of this foundation.

---

## How to Run

1. Open the project folder.
2. Serve it with any static file server (required for modules + PWA):

   ```bash
   # Example with Python
   python -m http.server 8080
   ```

3. Open `http://localhost:8080` in a modern browser.

---

## Project Structure

```
├── manifest.json          # PWA manifest
├── index.html             # Main entry
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── core/
│   │   ├── App.js
│   │   └── Storage.js
│   ├── world/
│   │   └── WorldManager.js
│   ├── servers/
│   │   └── ServerManager.js
│   ├── ui/
│   │   └── UI.js
│   ├── engine/
│   │   └── Engine.js
│   └── blocks/
│       └── BlockRegistry.js
├── img/
│   └── logo-placeholder.svg
└── README.md
```

---

## Next Development Steps (recommended order)

1. Replace logo placeholders in `/img` with final LEGAME Studio artwork.
2. Integrate a WebGL / Three.js (or custom) voxel renderer.
3. Implement seed-based terrain generation (heightmaps → chunks).
4. Block registry + breaking/placing.
5. Basic inventory + hotbar.
6. Player controller (WASD + mouse / touch).
7. Real private server backend (Node.js / dedicated process).
8. Networking layer (WebSocket / WebRTC).
9. Expand systems according to the full design document.

---

## License & Credits

Minecraft LE  
© LEGAME Studio  

This is an original work.  
Do not present this project as official Minecraft or as a product of Mojang / Microsoft.
