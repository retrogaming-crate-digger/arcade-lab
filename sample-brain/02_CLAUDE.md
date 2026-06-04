# 🎛️ Sample Brain - CLAUDE.MD Context

**Purpose:** Comprehensive context for Claude Code sessions and AI-assisted development  
**Last Updated:** 2026-05-18  
**AI Model:** Claude Haiku 4.5+  

---

## 🎯 PROJECT MISSION

**Sample Brain** is a multimedia collection manager for music producers, VJ artists, and sound designers.

**Core Features:**
- 🎵 Audio + MIDI + Video management
- 🎛️ DAW integration (Ableton, FL Studio, Logic)
- 🎬 Live VJ via Hydra.js
- ⭐ Smart curation (favorites, ratings, crates)

**Current Status:** Pre-production MVP  
**Tech Stack:** Vanilla HTML/CSS/JS + Web Audio API + Hydra.js (future)

---

## 📂 PROJECT STRUCTURE

```
sample-brain/
├── index.html          # Main app interface
├── scan.js             # Metadata generator (Node.js)
├── games.json          # Generated metadata
├── launch-sample-brain.sh  # Launcher script
├── docs/
│   ├── PROJECT_PLAN.md
│   ├── CLAUDE.md (this file)
│   ├── ARCHITECTURE.md
│   └── FEATURES.md
└── Multimedia/         # (parent dir) Audio/MIDI/Video collection
    ├── soundtrack/
    │   └── {romName}/
    │       └── NN Title.mp3
    ├── midi/
    │   └── {romName}/
    │       └── NN Title.mid
    ├── videosnaps/
    │   └── {romName}.mp4
    └── snapshots/
        └── {romName}.png
```

---

## 🎮 KEY USERS & USE CASES

### User 1: Music Producer
```
Goal: Sample arcade game audio for lo-fi/synthwave tracks
Workflow:
1. Find cool MAME game in Sample Brain
2. Preview audio + MIDI sequence
3. Rate & favorite
4. Drag both to Ableton
5. Ableton auto-syncs tempo
6. Uses as foundation for new track
```

### User 2: VJ Artist
```
Goal: Live audiovisual performance
Workflow:
1. Create performance "crate" (audio+MIDI+video)
2. Launch Sample Brain
3. Audio plays, MIDI syncs to hardware (Elektron)
4. Video feeds to Hydra.js for live effects
5. Performer controls via MIDI controller
```

### User 3: Sound Designer
```
Goal: Organize foley/SFX library
Workflow:
1. Index collection (audio+MIDI+screenshots)
2. Tag & rate samples
3. Export crates for projects
4. Share with team
```

---

## 🏗️ ARCHITECTURE AT A GLANCE

### Data Flow
```
Multimedia Collection
    ↓
scan.js (reads folders)
    ↓
games.json (metadata)
    ↓
index.html (loads & displays)
    ↓
User browses, rates, exports
    ↓
DAW / Hydra.js / Crates
```

### Key Components

#### 1. **scan.js** (Node.js)
- Reads `Multimedia/` folder structure
- Indexes audio files (mp3), MIDI files (mid), video (mp4)
- Detects BPM (future)
- Generates `games.json`

**Command:**
```bash
cd /d/Retrogaming/MAME/sample-brain
node scan.js
```

#### 2. **index.html** (Frontend)
- Web Audio API for audio preview
- HTML5 video player
- MIDI preview (Tone.js)
- localStorage for favorites/ratings
- Drag & drop for export

**Launch:**
```bash
cd /d/Retrogaming/MAME
python -m http.server 8000
# Visit: http://localhost:8000/sample-brain/index.html
```

#### 3. **games.json** (Data)
```javascript
[
  {
    "romName": "1943kai",
    "title": "1943: The Battle of Midway",
    "year": 1987,
    "audio": {
      "tracks": ["01 Credit.mp3", "02 Air battle.mp3"],
      "bpm": 145
    },
    "midi": {
      "files": ["01 Credit.mid", "02 Percussion.mid"],
      "key": "A minor"
    },
    "video": "1943kai.mp4",
    "tags": ["arcade", "glitch", "80s"]
  }
]
```

---

## 🎛️ UI/UX DESIGN

### Elektron-Inspired Aesthetic
- **Color Scheme:** Dark (black #000), accent orange (#ffb627)
- **Fonts:** JetBrains Mono (code), VT323 (retro)
- **Layout:** Left sidebar (filters) → center (sample list) → right (preview)
- **Bottom Bar:** Transport controls, random button, lock mode

### Layout Structure
```
┌─────────────────────────────────────────┐
│      Sample Brain - Multimedia Manager  │
├──────────────┬──────────────┬───────────┤
│              │              │           │
│   FILTERS    │   SAMPLES    │ PREVIEW   │
│   (Tags)     │   (List)     │ (Audio+   │
│              │              │  Video)   │
│              │              │           │
├──────────────┴──────────────┴───────────┤
│  Play | ◄ ► | Random | Lock | Volume    │
└────────────────────────────────────────┘
```

---

## 💾 FEATURES (PRIORITY ORDER)

### MVP (Phase 1 - THIS WEEK)
- [ ] Audio preview & playback
- [ ] MIDI file indexing & preview (Tone.js)
- [ ] Video snap preview
- [ ] Metadata display (BPM, genre, year)
- [ ] Favorites ⭐ (localStorage)
- [ ] 5-star ratings (localStorage)
- [ ] Search & filtering
- [ ] Export crates (JSON)
- [ ] Random sample button
- [ ] Responsive UI

### Phase 2 (WEEK 2-3)
- [ ] Drag & drop audio to Ableton
- [ ] Drag & drop MIDI to Ableton
- [ ] MIDI key/scale detection
- [ ] BPM detection (librosa node)
- [ ] Export complete crates (audio+MIDI+video+metadata)
- [ ] MIDI Learn setup wizard

### Phase 3 (WEEK 4-5)
- [ ] Hydra.js integration (video effects)
- [ ] Real-time BPM sync
- [ ] MIDI control of Hydra parameters
- [ ] Performance mode (fullscreen VJ)
- [ ] Community features (share crates)
- [ ] GitHub launch + documentation

### Phase 4+ (FUTURE)
- [ ] Electron desktop app
- [ ] SQLite database
- [ ] Hardware sync (Elektron)
- [ ] Cloud features (optional)
- [ ] Commercial features (optional)

---

## 🔧 DEVELOPMENT GUIDELINES

### Code Style
- **Language:** JavaScript ES6+
- **Format:** No build step (keep it vanilla unless necessary)
- **Comments:** Inline comments for complex logic
- **Naming:** camelCase for JS, kebab-case for CSS

### File Conventions
```
scan.js          # Node.js metadata generator
index.html       # All HTML + inline CSS + inline JS
launch-*.sh      # Bash launcher scripts
games.json       # Generated (DON'T EDIT MANUALLY)
```

### Backward Compatibility
- Don't break existing `games.json` format
- Version metadata if structure changes
- Support migration of old formats

---

## 🎯 CRATE SYSTEM

### What is a Crate?
A **crate** = collection of samples + metadata + export settings

```javascript
{
  "crateName": "Dark Arcade Production",
  "description": "Glitchy arcade sounds",
  "created": "2026-05-18",
  "samples": [
    {
      "romName": "1943kai",
      "audioTrack": "01 Credit.mp3",
      "midiTrack": "01 Credit.mid",
      "videoFile": "1943kai.mp4",
      "bpm": 145,
      "key": "A minor"
    }
  ],
  "isPublic": false
}
```

### Export Formats
- **JSON** - Full metadata (for sharing)
- **ZIP** - Audio+MIDI+video+metadata bundle
- **Ableton** - ALS project template (Phase 2)

---

## 📚 LIBRARIES & DEPENDENCIES

### Current
- **Web Audio API** (native) - Audio playback
- **HTML5 Video** (native) - Video preview
- **localStorage** (native) - Favorites/ratings storage

### Phase 2+
- **Tone.js** - MIDI preview & playback
- **music-theory.js** - Key/scale detection
- **librosa-node** - BPM detection (Node.js)

### Phase 3+
- **Hydra.js** - Live video synthesis
- **Three.js** - 3D visualization (optional)

### Don't Use (Keep it simple)
- ❌ React (unless necessary in Phase 2+)
- ❌ webpack/bundler (unless necessary)
- ❌ Heavy frameworks

---

## 🔌 API ENDPOINTS (LOCAL)

### Current
```
GET /sample-brain/index.html      # Main app
GET /sample-brain/games.json      # Metadata
GET /Multimedia/soundtrack/...    # Audio files
GET /Multimedia/midi/...          # MIDI files
GET /Multimedia/videosnaps/...    # Video files
```

### Future (Phase 2, if backend needed)
```
POST /api/crates              # Save crate
GET  /api/crates/:id          # Load crate
POST /api/favorites           # Update favorites
GET  /api/export              # Export data
```

---

## 🎬 HYDRA.JS INTEGRATION (PHASE 3)

### What is Hydra.js?
- Browser-based live coding environment
- GPU-accelerated video synthesis
- MIDI-controllable
- Perfect for VJ performances

### Integration Plan
```javascript
// Load video into Hydra
hydra.loadVideo('1943kai.mp4');

// Sync to BPM
hydra.setBPM(145);

// Apply effects
hydra.src(video)
  .scale(1.2)
  .rotate(() => time * 0.1)
  .out();

// MIDI control
midiController.on('cc1', (val) => {
  hydra.setScale(val / 127);
});
```

---

## 🚀 QUICK START FOR NEW CLAUDE SESSIONS

### Context To Know
1. This is a **multimedia browser** for music production
2. It supports **audio + MIDI + video** (not just audio)
3. It's inspired by **Elektron hardware samplers**
4. Current focus: MVP features + DAW integration
5. Current stack: Vanilla HTML/CSS/JS (simple & fast)

### Key Files To Understand
- `index.html` - The main app (UI + logic combined)
- `scan.js` - Metadata generator (run via Node.js)
- `games.json` - The data structure (generated by scan.js)

### Common Tasks
```bash
# Generate/update metadata
node scan.js

# Launch dev server
cd /d/Retrogaming/MAME && python -m http.server 8000

# View app
http://localhost:8000/sample-brain/index.html
```

---

## 🎯 DECISION POINTS (AWAITING INPUT)

1. **Vision**: Hobby? Commercial? Open-source?
2. **GitHub**: Public or private?
3. **Tech Stack**: Stay vanilla or upgrade to React?
4. **File Support**: Just MP3/MID/MP4 or full format support?

---

## 📞 GETTING HELP

### If stuck on:
- **MIDI parsing**: Use Tone.js or music-theory.js
- **Audio playback**: Use Web Audio API
- **Video effects**: Use Hydra.js
- **Folder structure**: Check `scan.js` for expected format
- **localStorage**: Use JSON.parse/stringify for data persistence

---

## 🎯 NEXT SESSION CHECKLIST

When starting a new Claude Code session, verify:
- [ ] You know the project vision (multimedia browser for DAW)
- [ ] You understand the architecture (scan.js → games.json → index.html)
- [ ] You've read the PROJECT_PLAN.md
- [ ] You know the file locations (see PROJECT STRUCTURE above)
- [ ] You understand the user workflows

---

## 📝 SESSION NOTES TEMPLATE

For future sessions, include:
```
## Session: [Date] - [Goal]

### What we did:
- [Feature 1]
- [Feature 2]

### Current status:
- [What works]
- [What's next]

### Blockers:
- [If any]

### Next session should:
- [Priority 1]
- [Priority 2]
```

---

**Last Note:** This is an ambitious project that could be a great commercial product. Focus on building the MVP first, launch on GitHub, then iterate based on community feedback. 🚀
