# 🎛️ Sample Brain - FEATURES SPECIFICATION

**Status:** All features documented  
**Version:** 1.0.0 (MVP)  
**Last Updated:** 2026-05-18  

---

## 🎯 FEATURE MATRIX

| Feature | Phase | Priority | Status | Notes |
|---------|-------|----------|--------|-------|
| Audio preview (mp3, wav, flac) | 1 | High | 🚀 NOW | Multiple formats |
| MIDI file indexing & preview | 1 | High | 🚀 NOW | Tone.js playback |
| Video snap preview | 1 | High | 🚀 NOW | mp4 support |
| Metadata display | 1 | High | 🚀 NOW | BPM, key, genre, tags |
| Search & fuzzy filtering | 1 | High | 🚀 NOW | Real-time search |
| Favorites ⭐ (localStorage) | 1 | High | 🚀 NOW | Bookmark samples |
| 5-star ratings (localStorage) | 1 | High | 🚀 NOW | Rate samples 1-5 |
| Random inspiration button | 1 | Medium | 🚀 NOW | Random sample picker |
| Crate system (collections) | 1 | Medium | 🚀 NOW | Group samples by project |
| Export crates (JSON) | 1 | Medium | 🚀 NOW | Share collections |
| Responsive UI | 1 | High | 🚀 NOW | Mobile-friendly design |
| BPM detection | 2 | High | 📊 PHASE 2 | Librosa via Node.js |
| MIDI key detection | 2 | High | 📊 PHASE 2 | Music-theory.js |
| Drag & drop to Ableton | 2 | High | 📊 PHASE 2 | Audio + MIDI sync |
| Export complete crates | 2 | Medium | 📊 PHASE 2 | Audio+MIDI+video+metadata |
| MIDI Learn wizard | 2 | Medium | 📊 PHASE 2 | Hardware controller mapping |
| Hydra.js integration | 3 | High | 🎬 PHASE 3 | Real-time VJ effects |
| BPM-synced playback | 3 | Medium | 🎬 PHASE 3 | Sync video to audio |
| MIDI control of Hydra | 3 | Medium | 🎬 PHASE 3 | CC mapping for effects |
| Live VJ performance mode | 3 | Medium | 🎬 PHASE 3 | Fullscreen VJ |
| Cloud crate sharing | 3 | Low | 🎬 PHASE 3 | Optional backend |
| Community ratings | 3 | Low | 🎬 PHASE 3 | Leaderboard feature |
| Electron desktop app | 4 | High | 🚀 PHASE 4 | Standalone executable |
| SQLite database | 4 | Medium | 🚀 PHASE 4 | Replace localStorage |
| Hardware sync (Elektron) | 4 | Medium | 🚀 PHASE 4 | MIDI sync with gear |
| Commercial premium features | 4 | Low | 💰 FUTURE | Subscription model |

---

## 📂 PHASE 1 FEATURES (MVP - THIS WEEK)

### 1. Audio File Support

**Formats Supported:**
- ✅ MP3 (primary)
- ✅ WAV (full quality)
- ✅ FLAC (lossless)
- ✅ OGG (fallback)

**Features:**
```
- Load from Multimedia/soundtrack/{romName}/*.mp3 (etc.)
- Play/pause/stop controls
- Progress bar with seek
- Volume control
- Display duration & current time
- Auto-detect BPM (future)
```

**UI:**
```
┌─────────────────────────────────┐
│ Now Playing: 01 Credit.mp3      │
├─────────────────────────────────┤
│ [Play] [⏸] [Stop] 0:45/2:30    │
│ Volume: ▓▓▓▓░░░░░░ 60%         │
└─────────────────────────────────┘
```

---

### 2. MIDI File Support

**Formats Supported:**
- ✅ MIDI (.mid)
- ✅ Standard MIDI Format (SMF 0 & 1)

**Features:**
```
- Index from Multimedia/midi/{romName}/*.mid
- Preview via Tone.js (synthetic playback)
- Display key/scale detection
- Show instrument list
- Display track count
- Play/pause MIDI sequence
```

**UI:**
```
┌─────────────────────────────────┐
│ MIDI: 01 Credit.mid             │
├─────────────────────────────────┤
│ Key: A minor                     │
│ Tracks: 4                        │
│ Instruments: Synth, Drums, Bass │
│ Duration: 0:45                   │
│ [Play] [⏸] [Stop]              │
└─────────────────────────────────┘
```

---

### 3. Video Preview

**Formats Supported:**
- ✅ MP4 (primary)
- ✅ MOV (fallback)
- ✅ WebM (fallback)

**Features:**
```
- Load from Multimedia/videosnaps/{romName}.mp4
- Display as video snap preview
- Play on demand
- Auto-loop
- Mute control (separate from audio)
```

**UI:**
```
┌─────────────────────────────────┐
│ [Video Snap Preview Area]       │
│                                 │
│         [Play]                  │
│                                 │
└─────────────────────────────────┘
```

---

### 4. Metadata Display

**Data Fields:**
```javascript
- romName: "1943kai"
- title: "1943: The Battle of Midway"
- year: 1987
- publisher: "Capcom"
- hardware: "CPS1"
- genre: "Shoot'em up"
- bpm: 145 (audio average)
- key: "A minor" (MIDI detected)
- audioTracks: 2
- midiFiles: 1
- tags: ["arcade", "glitch", "80s"]
```

**Display Format:**
```
Title: 1943: The Battle of Midway
Year: 1987 | Publisher: Capcom
Hardware: CPS1
Genre: Shoot'em up
BPM: 145 | Key: A minor
Tags: arcade, glitch, 80s
```

---

### 5. Search & Filtering

**Search Types:**
```
1. Fuzzy Search (title, ROM name)
   - Type "1943" → finds "1943kai"
   - Type "midway" → finds "1943kai"

2. Tag Filtering
   - Select multiple tags
   - Combine with AND logic
   - Example: "arcade" + "glitch" = only arcade glitch games

3. Genre Filtering
   - Dropdown list of genres
   - Single or multiple selection

4. Hardware Filtering
   - CPS1, CPS2, Neo-Geo, System 16, etc.
   - Multiple selection

5. Year Range
   - Slider: 1980-1995
```

**UI Layout:**
```
┌─────────────────────────────────┐
│ Search: [___________]           │
│                                 │
│ Tags: [☐ arcade] [☑ glitch]    │
│ Genre: [Dropdown]               │
│ Hardware: [Dropdown]            │
│                                 │
│ Year: 1980 ▓▓░░░░░░ 1995       │
└─────────────────────────────────┘
```

---

### 6. Favorites & Ratings

**Favorites Feature:**
```
- Click ❤️ button to favorite
- Toggle star indicator
- Show "Favorited" label
- Filter by "Show Favorites Only"
```

**Ratings Feature:**
```
- Click ☆ star (1-5)
- Update immediately
- Show average rating in list
- Sort by rating
- Filter by minimum rating
```

**Storage:**
```javascript
// localStorage["mame-favorites"]
{
  "1943kai": {
    "starred": true,
    "rating": 5,
    "notes": "Great arcade vibes",
    "dateAdded": "2026-05-18"
  }
}
```

**UI:**
```
┌─────────────────────────────────┐
│ ❤️ Add to Favorites             │
│                                 │
│ Rating: ★★★★★ (5 stars)       │
│                                 │
│ Notes:                          │
│ [______________________]        │
└─────────────────────────────────┘
```

---

### 7. Crate System

**What is a Crate?**
A named collection of samples for a specific project or workflow.

**Features:**
```
- Create new crate
- Add samples to crate
- Remove samples from crate
- Rename/delete crate
- View crate contents
- Export crate as JSON
- Import crate from JSON
```

**Crate Structure:**
```javascript
{
  "crateName": "Dark Arcade Production",
  "description": "Glitchy arcade sounds for lo-fi beats",
  "created": "2026-05-18",
  "samples": [
    {
      "romName": "1943kai",
      "audioTrack": "01 Credit.mp3",
      "midiTrack": "01 Credit.mid",
      "videoFile": "1943kai.mp4",
      "notes": "Use as main loop"
    }
  ]
}
```

**UI:**
```
┌─────────────────────────────────┐
│ My Crates:                      │
│ [+ Create New Crate]            │
│                                 │
│ Dark Arcade Production (2 items)│
│ Lo-Fi Hip Hop (5 items)        │
│ VJ Performance (3 items)       │
│                                 │
│ [Edit] [Export] [Delete]        │
└─────────────────────────────────┘
```

---

### 8. Random Inspiration

**Feature:**
```
- Click "🎲 Random" button
- Picks random sample from collection
- Plays audio automatically
- Shows metadata
- User can rate it
- Click again for next random
```

**Elektron Mode:**
```
- Hold button to keep exploring
- Fast browsing mode
- Great for finding inspiration
```

---

### 9. Responsive UI Design

**Breakpoints:**
```
Mobile (< 768px):
- Single column layout
- Sidebar collapses to menu
- Bottom controls stack

Tablet (768px - 1024px):
- Two-column layout
- Sidebar on left
- Preview on right

Desktop (> 1024px):
- Three-column layout
- Filters | List | Preview
- Full featured UI
```

---

## 📊 PHASE 2 FEATURES (DAW Integration)

### 1. BPM Detection (Librosa)

```javascript
// scan.js enhancement
const librosa = require('librosa-node');

async function detectBPM(audioPath) {
  const audio = await librosa.load(audioPath);
  const tempogram = await librosa.feature.tempogram(audio);
  const bpm = await librosa.tempo(tempogram);
  return bpm;
}

// Results stored in games.json
"audio": {
  "tracks": [{
    "bpm": 145,
    "confidence": 0.85
  }]
}
```

---

### 2. MIDI Key Detection

```javascript
const MusicTheory = require('music-theory');

function detectMidiKey(midiPath) {
  const midi = parseMidi(midiPath);
  const notes = extractNotes(midi);
  const key = MusicTheory.detectKey(notes);
  return key; // "A minor", "C major", etc.
}
```

---

### 3. Drag & Drop to DAW

**Supported DAWs:**
- Ableton Live (primary)
- FL Studio
- Logic Pro
- Reaper

**Implementation:**
```javascript
// Native drag & drop API
const dragData = {
  type: "multitrack",
  audio: {
    file: "1943kai/01 Credit.mp3",
    tempo: 145,
    name: "1943kai - Credit"
  },
  midi: {
    file: "1943kai/01 Credit.mid",
    name: "1943kai - MIDI",
    key: "A minor"
  },
  metadata: {
    bpm: 145,
    key: "A minor",
    tags: ["arcade", "glitch"],
    rating: 5
  }
};

// Browser handles drag & drop
element.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('application/json', JSON.stringify(dragData));
});
```

---

### 4. MIDI Learn Wizard

**Workflow:**
```
1. User clicks "Setup MIDI Controller"
2. App detects MIDI inputs
3. Ask user to press buttons/knobs
4. Map each to Hydra parameters
5. Save mapping as preset
6. Use mapping in VJ mode
```

---

## 🎬 PHASE 3 FEATURES (VJ Integration)

### Hydra.js Integration

**What Hydra Does:**
- Real-time video synthesis
- GPU-accelerated shaders
- MIDI-controllable effects
- Live coding environment

**Integration Points:**
```javascript
// Load video into Hydra
hydra.loadVideo('1943kai.mp4');

// Sync to BPM
hydra.setBPM(145);

// Apply effects
hydra.src(video)
  .scale(1.2)
  .rotate(() => time * 0.1)
  .modulateRepeat(noise(), 3, 3)
  .out();

// MIDI control
midiController.on('cc1', (val) => {
  hydra.setScale(val / 127);
});
```

**Included Presets:**
```
- Kaleidoscope
- Glitch Effect
- Chromatic Aberration
- Pixelate
- Mirror/Reflect
- Rotate & Scale
- Color Shift
- VHS Effect
```

---

### Performance Mode

**Features:**
```
- Fullscreen Hydra.js output
- Audio plays through speakers
- MIDI controls Hydra in real-time
- Shows metadata overlay (optional)
- Recording support (OBS integration)
```

---

## 💾 EXPORT FORMATS

### Phase 1: Export as JSON

```javascript
// Export single crate
{
  "crateName": "Dark Arcade Production",
  "samples": [...]
}
// → downloads as Dark_Arcade_Production.json
```

### Phase 2: Export Complete Bundle

```bash
# Contains:
export/
├── audio/
│   ├── 1943kai_01_Credit.mp3
│   └── 1943kai_02_Battle.mp3
├── midi/
│   ├── 1943kai_01_Credit.mid
│   └── 1943kai_02_Percussion.mid
├── video/
│   ├── 1943kai.mp4
│   └── 4dwarrio.mp4
├── crate.json (metadata)
└── ableton_template.als (Ableton project)
```

### Phase 3: Export to DAW

```
User drags Sample Brain → Drops in Ableton
Ableton receives:
- Audio track (auto-synced tempo)
- MIDI track (synced to audio)
- Metadata (in clip names)
```

---

## 🎯 QUALITY STANDARDS

### Performance
- Page load: < 500ms
- Sample selection: < 100ms
- Audio preview: instant start
- Search response: < 50ms

### Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Alt text for images

---

## 📝 SPECIFICATIONS NOT INCLUDED (Future)

- Cloud sync ❌ (Phase 3+)
- User accounts ❌ (Phase 4+)
- Social sharing ❌ (Phase 4+)
- Marketplace ❌ (Phase 4+)
- Advanced ML tagging ❌ (Phase 4+)
- VST plugin ❌ (Phase 5+)

---

**This comprehensive feature list covers all MVP + Phase 2 features. Phase 3+ will add more based on community feedback.**
