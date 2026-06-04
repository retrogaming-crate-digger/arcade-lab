# 🎛️ Sample Brain - ARCHITECTURE

**Purpose:** Technical system design and data flow  
**Audience:** Developers, contributors, Claude AI sessions  

---

## 🏗️ SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                    SAMPLE BRAIN ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LAYER 1: DATA GENERATION                                      │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ scan.js (Node.js)                                    │     │
│  │ • Reads Multimedia/ folder structure                │     │
│  │ • Indexes audio (mp3), MIDI (mid), video (mp4)     │     │
│  │ • Generates games.json metadata                     │     │
│  │ • Detects BPM (future)                              │     │
│  └──────────────────────────────────────────────────────┘     │
│                          ↓                                      │
│  LAYER 2: DATA STORAGE                                         │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ games.json (JSON file)                               │     │
│  │ • List of all ROMs + metadata                        │     │
│  │ • Audio tracks, MIDI files, video, BPM, tags       │     │
│  │ • Generated & cached locally                         │     │
│  └──────────────────────────────────────────────────────┘     │
│                          ↓                                      │
│  LAYER 3: WEB INTERFACE                                        │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ index.html + inline JS/CSS                           │     │
│  │ • Load games.json                                    │     │
│  │ • Render UI (list, preview, controls)               │     │
│  │ • Handle user interactions                           │     │
│  │ • Manage localStorage (favorites, ratings, crates) │     │
│  └──────────────────────────────────────────────────────┘     │
│                          ↓                                      │
│  LAYER 4: PLAYBACK & PREVIEW                                  │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Web Audio API (audio)                                │     │
│  │ HTML5 Video (video)                                  │     │
│  │ Tone.js (MIDI preview) [Phase 2]                    │     │
│  │ Hydra.js (VJ effects) [Phase 3]                     │     │
│  └──────────────────────────────────────────────────────┘     │
│                          ↓                                      │
│  LAYER 5: EXPORT & INTEGRATION                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Export to DAW (Ableton, FL, Logic)                  │     │
│  │ Export Crates (JSON/ZIP)                             │     │
│  │ MIDI Learn (hardware control) [Phase 2]             │     │
│  │ Cloud sync [Phase 3+]                                │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 FOLDER STRUCTURE & DATA FLOW

### Expected Folder Layout (Read by scan.js)

```
/d/Retrogaming/MAME/
│
├─ Multimedia/
│  ├─ soundtrack/
│  │  ├─ 1943kai/
│  │  │  ├─ 01 Credit.mp3
│  │  │  ├─ 02 Air battle.mp3
│  │  │  └─ ...
│  │  ├─ 4dwarrio/
│  │  │  └─ ...
│  │  └─ ...
│  │
│  ├─ midi/
│  │  ├─ 1943kai/
│  │  │  ├─ 01 Credit.mid
│  │  │  ├─ 02 Percussion.mid
│  │  │  └─ ...
│  │  ├─ 4dwarrio/
│  │  │  └─ ...
│  │  └─ ...
│  │
│  ├─ videosnaps/
│  │  ├─ 1943kai.mp4
│  │  ├─ 4dwarrio.mp4
│  │  └─ ...
│  │
│  └─ snapshots/
│     ├─ 1943kai.png
│     ├─ 4dwarrio.png
│     └─ ...
│
└─ sample-brain/
   ├─ index.html
   ├─ scan.js
   ├─ games.json (GENERATED)
   └─ launch-sample-brain.sh
```

### scan.js Logic Flow

```javascript
1. Read directory: /Multimedia/soundtrack/
2. For each ROM folder:
   a. Get audio files (.mp3) → add to metadata
   b. Look for matching MIDI files → add to metadata
   c. Check for video snaps → add to metadata
   d. Calculate BPM (future) → add to metadata
   e. Detect metadata (year, genre, etc.)
3. Export as games.json
```

---

## 📊 DATA SCHEMA

### games.json Structure

```javascript
[
  {
    // Identification
    "romName": "1943kai",
    "title": "1943: The Battle of Midway",
    "year": 1987,
    "publisher": "Capcom",
    
    // Hardware & Classification
    "hardware": "CPS1",
    "genre": "Shoot'em up",
    "mood": ["arcade", "glitch", "80s"],
    
    // Audio
    "audio": {
      "tracks": [
        {
          "file": "01 Credit.mp3",
          "duration": 45,      // seconds
          "bpm": 145,          // detected or estimated
          "key": "A minor"     // future
        },
        {
          "file": "02 Air battle.mp3",
          "duration": 120,
          "bpm": 145,
          "key": "A minor"
        }
      ],
      "bpmAverage": 145
    },
    
    // MIDI
    "midi": {
      "files": [
        {
          "file": "01 Credit.mid",
          "duration": 45,
          "key": "A minor",
          "instruments": ["synth", "drums"],
          "tracks": 4
        }
      ],
      "keyAverage": "A minor"
    },
    
    // Video
    "video": {
      "file": "1943kai.mp4",
      "duration": 60,
      "fps": 60,
      "format": "mp4"
    },
    
    // Snapshot
    "snapshot": {
      "file": "1943kai.png",
      "type": "arcade_screen"
    },
    
    // Metadata (for filtering)
    "tags": ["arcade", "glitch", "synth"],
    "difficulty": "medium"
  }
  // ... more ROMs
]
```

### localStorage Structure (Favorites/Ratings)

```javascript
// Key: "mame-favorites"
{
  "1943kai": {
    "starred": true,
    "rating": 5,
    "notes": "Great arcade vibes",
    "dateAdded": "2026-05-18",
    "tags": ["dark", "glitch"]
  },
  "4dwarrio": {
    "starred": false,
    "rating": 3,
    "notes": null,
    "dateAdded": "2026-05-18",
    "tags": []
  }
}

// Key: "mame-crates"
{
  "Dark Arcade Production": {
    "created": "2026-05-18",
    "samples": ["1943kai", "aburner2"],
    "description": "Dark arcade sounds for lo-fi beats"
  }
}
```

---

## 🎛️ UI COMPONENT ARCHITECTURE

### Component Tree

```
App
├─ Header
│  └─ Title + Info
├─ MainContainer
│  ├─ Sidebar (Filters)
│  │  ├─ SearchInput
│  │  ├─ TagFilter
│  │  ├─ GenreFilter
│  │  └─ HardwareFilter
│  ├─ CenterPanel (SampleList)
│  │  ├─ SampleRow (repeating)
│  │  │  ├─ Title
│  │  │  ├─ Metadata
│  │  │  └─ FavoriteIcon
│  │  └─ Pagination/Infinite Scroll
│  └─ RightPanel (Preview)
│     ├─ AudioPreview
│     │  ├─ Player
│     │  └─ Transport
│     ├─ VideoPreview
│     ├─ MidiPreview [Phase 2]
│     ├─ RatingStars
│     └─ ExportButton
└─ BottomBar (Controls)
   ├─ PlayButton
   ├─ RandomButton
   ├─ LockButton
   ├─ VolumeControl
   └─ CrateButton
```

---

## 🔄 DATA FLOW EXAMPLE

### User Selects a Sample

```
User clicks "1943kai" in list
    ↓
index.html: onSampleSelected('1943kai')
    ↓
1. Load from games.json
   ├─ Get audio tracks
   ├─ Get MIDI files
   ├─ Get video snap
   └─ Get metadata (BPM, key, etc.)
    ↓
2. Update RightPanel
   ├─ Set audio src → Web Audio API
   ├─ Set video src → HTML5 video
   ├─ Load MIDI → Tone.js [Phase 2]
   ├─ Display metadata
   └─ Load rating from localStorage
    ↓
3. Check localStorage for favorites
   ├─ Is starred?
   ├─ What rating?
   └─ Any notes?
    ↓
4. Render UI
   ├─ Show audio player
   ├─ Show video snap
   ├─ Show star rating
   ├─ Show notes field
   └─ Show export button
    ↓
User ready to preview!
```

### User Exports to Ableton

```
User clicks "Drag to Ableton"
    ↓
index.html: prepareExport('1943kai')
    ↓
1. Gather data
   ├─ Audio file: 01 Credit.mp3
   ├─ MIDI file: 01 Credit.mid [Phase 2]
   ├─ Metadata: BPM=145, Key=A minor
   └─ User rating: ⭐⭐⭐⭐⭐
    ↓
2. Create drag data
   {
     type: "multitrack",
     audio: { file, tempo },
     midi: { file, key },
     metadata: { bpm, key, rating }
   }
    ↓
3. Browser handles native drag & drop
   ├─ User drags from Sample Brain
   └─ User drops in Ableton
    ↓
4. Ableton processes
   ├─ Creates audio track
   ├─ Creates MIDI track [Phase 2]
   ├─ Auto-syncs tempo
   └─ User starts producing!
```

---

## 🎬 HYDRA.JS INTEGRATION (PHASE 3)

### Data Flow for VJ Mode

```
User selects sample + enters "VJ Mode"
    ↓
1. Load video into Hydra.js
   video = load('1943kai.mp4')
    ↓
2. Get BPM from metadata
   bpm = games['1943kai'].audio[0].bpm (145)
    ↓
3. Sync Hydra to BPM
   hydra.setBPM(bpm)
   hydra.setVideoPlayback(video)
    ↓
4. Apply Hydra effects
   hydra.src(video)
     .scale(1.2)
     .rotate(() => time * 0.1)
     .modulateRepeat(noise(), 3, 3)
     .out()
    ↓
5. MIDI controller controls effects
   midiController.on('cc1', (val) => {
     hydra.setScale(val / 127)
   })
    ↓
6. Output to external display
   // Via OBS or HDMI
```

---

## 🔌 API ARCHITECTURE (PHASE 2+)

### If Backend Added (Optional)

```
CLIENT                          SERVER
index.html                      Node.js + Express
    |                              |
    |-- GET /api/games          -->|
    |                              | Query games.json
    |<-- games.json data        ---|
    |
    |-- POST /api/favorites      -->|
    |   { romName, rating }         | Update localStorage / DB
    |<-- OK                     ---|
    |
    |-- POST /api/crates         -->|
    |   { crateName, samples }      | Save crate
    |<-- crateId                ---|
    |
    |-- GET /api/export/:id      -->|
    |   { format: 'zip' }           | Generate ZIP
    |<-- crate.zip              ---|
```

---

## 🚀 PERFORMANCE CONSIDERATIONS

### Current (Vanilla HTML/JS)
- **Load Time:** ~500ms (small games.json)
- **Memory:** ~10-20MB (for 155 ROMs)
- **UI Responsiveness:** 60fps (simple DOM manipulation)

### Optimization Strategies
1. **Lazy Load:** Only load selected sample data
2. **Caching:** Cache games.json in browser
3. **Image Optimization:** Compress video snaps
4. **Streaming:** For large audio files (future)

### Future Bottlenecks
- Large video files → implement streaming
- 1000+ ROMs → implement pagination/virtualization
- Complex Hydra effects → GPU optimization

---

## 🔐 SECURITY CONSIDERATIONS

### Current Status
- No authentication (local app)
- No server-side processing
- All data is local (localStorage)

### Future Security (If Cloud Features Added)
- HTTPS only
- User authentication
- Rate limiting
- Data encryption (crates)
- CORS headers

---

## 🧪 TESTING STRATEGY

### Unit Tests (Phase 2)
```javascript
// test-bpm-detector.js
test('detects BPM from audio file', () => {
  const bpm = detectBPM('sample.mp3');
  expect(bpm).toBe(145);
});

// test-midi-parser.js
test('parses MIDI file', () => {
  const midi = parseMIDI('sample.mid');
  expect(midi.key).toBe('A minor');
});
```

### Integration Tests (Phase 3)
```javascript
// Test full workflow
test('drag audio to Ableton works', () => {
  // Mock Ableton drop target
  // Drag from Sample Brain
  // Verify data received
});
```

### Manual Testing Checklist
- [ ] Audio playback (all formats)
- [ ] MIDI preview (Tone.js)
- [ ] Video preview (HTML5)
- [ ] Favorites persistence (localStorage)
- [ ] Export functionality
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

---

## 🔄 VERSIONING STRATEGY

### Semantic Versioning
```
v0.1.0 - Initial MVP (audio + MIDI + video support)
v0.2.0 - DAW integration (Ableton drag & drop)
v0.3.0 - Hydra.js + VJ features
v1.0.0 - Production release
v1.1.0+ - Feature additions & community feedback
```

### Migration Path
- Keep `games.json` format stable
- Version metadata if structure changes
- Provide migration scripts for old formats

---

## 📊 MONITORING & METRICS (FUTURE)

### If Commercial Features Added
- User engagement (sessions, time spent)
- Feature usage (which exports are used?)
- Performance (load times, error rates)
- Community metrics (GitHub stars, Discord members)

---

## 🎯 DECISION TREE

### Should we add a backend?
```
Need cloud features? 
  YES → Add Node.js backend + database
  NO  → Keep localStorage (simpler)
```

### Should we migrate to React?
```
Scale to 1000+ ROMs?
  YES → React + virtualization
  NO  → Keep vanilla HTML (simpler)
```

### Should we add Electron?
```
Need desktop app?
  YES → Electron wrapper (Phase 4)
  NO  → Keep web app (Phase 1-3)
```

---

**This architecture is designed to be simple, scalable, and modular. Each phase builds on the previous one without breaking existing features.**
