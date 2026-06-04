# 🎛️ Sample Brain

> **Elektron-style sample browser for music producers, VJ artists, and sound designers**
> 
> Transform any audio/MIDI/video collection into a creative production tool.
> Drag & drop samples to Ableton. Live VJ with Hydra.js. Organize with smart crates.

---

## ✨ Features

### 🎵 Multi-Format Support
- **Audio:** MP3, WAV, FLAC, OGG
- **MIDI:** Standard MIDI files (.mid)
- **Video:** MP4, MOV, WebM snaps
- **All formats:** Support for any audio library (MAME, VGM, foley, etc.)

### 🎛️ Intelligent Discovery
- 🔍 **Fuzzy search** - Find anything instantly
- 🏷️ **Smart filtering** - Tags, genre, hardware, year
- 🎲 **Random inspiration** - Discover samples serendipitously
- 📊 **Metadata browsing** - BPM, key, mood detection

### ⭐ Curation & Organization
- ❤️ **Favorites** - Bookmark your favorite samples
- ⭐ **5-star ratings** - Rate and sort by quality
- 📦 **Smart crates** - Organize samples by project
- 💾 **Export collections** - Share crates with collaborators

### 🎼 Music Production Ready
- 🎛️ **DAW Integration** - Drag & drop to Ableton, FL Studio, Logic
- 🔄 **Auto-sync tempo** - Samples auto-adapt to your project BPM
- 🎹 **MIDI playback** - Preview MIDI sequences in browser
- 📤 **Complete exports** - Audio + MIDI + metadata bundles

### 🎬 Live VJ Performance
- 🎥 **Hydra.js integration** - Real-time video effects [Coming soon]
- 🎮 **MIDI control** - Map effects to hardware [Coming soon]
- 🖥️ **Fullscreen mode** - Performance-ready output [Coming soon]

### 💾 Local & Private
- 🏠 **100% local** - No cloud, no tracking, your data stays private
- 💿 **Offline mode** - Works without internet connection
- 🔒 **No account needed** - Just open and use
- ⚡ **Blazing fast** - Web-based, instant preview

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+
- **Python** 3.6+ (for dev server)
- Any modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/wilonweb/sample-brain.git
cd sample-brain

# Prepare your collection (optional)
# Expected structure:
# Multimedia/
#   ├── soundtrack/{romName}/
#   │   ├── track-1.mp3
#   │   └── track-2.mp3
#   ├── midi/{romName}/
#   │   └── track-1.mid
#   ├── videosnaps/{romName}.mp4
#   └── snapshots/{romName}.png

# Generate metadata (from sample-brain directory)
node scan.js

# Start dev server (from parent directory!)
cd ..
python -m http.server 8000

# Open browser
# http://localhost:8000/sample-brain/index.html
```

### Or Use the Launcher

```bash
# One-command launch (sets everything up)
bash launch-sample-brain.sh
```

---

## 📚 Use Cases

### 🎵 Producer: Sample Arcade Soundtracks

```
1. Browse 155+ arcade games in Sample Brain
2. Find "1943: The Battle of Midway"
3. Preview audio + MIDI sequence
4. Rate it 5 stars
5. Drag both to Ableton
6. Ableton auto-syncs tempo (145 BPM)
7. Use as foundation for new track
8. Create "Arcade Synth" crate for future reference
```

### 🎬 VJ Artist: Live Audiovisual Performance

```
1. Create "Performance Crate" with audio + video
2. Launch Sample Brain in VJ mode
3. Audio plays through speakers
4. Video feeds to Hydra.js effects
5. MIDI controller adjusts effects in real-time
6. Projector shows live visual output
7. Complete audiovisual live set!
```

### 🎙️ Sound Designer: Organize Foley Library

```
1. Index 1000+ foley sounds
2. Tag by type (footsteps, impacts, ambience)
3. Rate favorite recordings
4. Create crates: "Game SFX", "Film Production", etc.
5. Export crate as project bundle
6. Share with sound design team
7. Collaborate & iterate
```

---

## 📖 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get running in 5 minutes
- **[Project Plan](./docs/PROJECT_PLAN.md)** - Full project overview
- **[Architecture](./docs/ARCHITECTURE.md)** - Technical deep dive
- **[Features](./docs/FEATURES.md)** - Detailed feature spec
- **[Roadmap](./docs/ROADMAP.md)** - Development timeline & vision
- **[Contributing](./CONTRIBUTING.md)** - How to contribute

---

## 🎯 Current Status

### ✅ Phase 1 (MVP) - LIVE
- [x] Audio preview (mp3, wav, flac)
- [x] MIDI file support & preview
- [x] Video snap preview
- [x] Metadata display & filtering
- [x] Search & fuzzy matching
- [x] Favorites & 5-star ratings
- [x] Crate system (collections)
- [x] JSON export
- [x] Responsive UI
- [x] Fully functional MVP

### 📊 Phase 2 (DAW Integration) - IN PROGRESS
- [ ] Drag & drop to Ableton
- [ ] BPM detection (librosa)
- [ ] MIDI key detection
- [ ] Complete crate exports (audio+MIDI+video)
- [ ] MIDI Learn wizard
- [ ] Ableton template generation

### 🎬 Phase 3 (VJ & Polish) - NEXT
- [ ] Hydra.js integration
- [ ] Real-time effects
- [ ] Community features
- [ ] Comprehensive docs
- [ ] GitHub launch & marketing

### 🏢 Phase 4+ (Desktop & Beyond)
- [ ] Electron desktop app
- [ ] SQLite database
- [ ] Cloud sync (optional)
- [ ] Marketplace (optional)
- [ ] Commercial features (optional)

---

## 🛠️ Technology Stack

### Current (MVP)
```
Frontend:      Vanilla HTML/CSS/JavaScript
Audio:         Web Audio API
Video:         HTML5 <video>
MIDI:          Tone.js (playback) + native parsing
Storage:       localStorage + JSON
Server:        Python http.server (dev)
Build:         No build step required!
```

### Coming (Phase 2+)
```
Backend:       Node.js + Express (optional)
Database:      SQLite3 (Electron)
VJ:            Hydra.js + Three.js
Desktop:       Electron
DAW:           Ableton Live API
```

---

## 📊 Supported Collections

### MAME Arcade (155+ ROMs included)
```
CPS1, CPS2, Neo-Geo MVS, System 16, Sega, Capcom, SNK, etc.
Complete with artwork, soundtracks, and MIDI sequences
```

### Any Custom Collection!
- Video Game Music (VGM) libraries
- Foley & Sound Effects libraries
- Podcast archives
- Custom music production samples
- Old video game assets

Just structure folders as:
```
Multimedia/
├── soundtrack/{game-name}/*.mp3
├── midi/{game-name}/*.mid
└── videosnaps/{game-name}.mp4
```

Then run `node scan.js` to index!

---

## 🎮 Controls

### Keyboard
```
Space    - Play/Pause
←  →     - Previous/Next sample
↑  ↓     - Volume
R        - Random sample
F        - Toggle favorites
/        - Focus search
```

### Mouse
```
Click sample   - Select & preview
⭐ star        - Rate (1-5 stars)
❤️ heart       - Add to favorites
🎲 random     - Random inspiration
📦 crate      - Manage collections
```

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** your changes (`git commit -m 'Add your feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Ways to Help
- 🐛 Report bugs via GitHub Issues
- 💡 Suggest features via Discussions
- 📝 Improve documentation
- 🎨 Improve UI/UX design
- 🌐 Translate to other languages
- 🔧 Fix bugs or add features
- 🎬 Create tutorials or demos

---

## 💬 Community

- **Discord** - [Join our community](https://discord.gg/...) (coming soon)
- **GitHub Discussions** - Ask questions & share ideas
- **Reddit** - r/gamedev, r/electronicmusic, r/webaudio
- **Twitter** - [@sample_brain](https://twitter.com/...) (coming soon)

---

## 📝 License

Sample Brain is open-source software licensed under the **MIT License**.

You are free to:
- ✅ Use commercially
- ✅ Modify & distribute
- ✅ Use privately
- ✅ Include in proprietary software

Just include the license notice. See [LICENSE](./LICENSE) for details.

---

## 🎯 Vision & Roadmap

### Why Sample Brain?

Most sample browsers are either:
- 😴 Boring file explorers
- 💰 Expensive commercial software
- 🔒 Locked to one DAW
- 🏚️ Abandoned projects

**Sample Brain** is:
- 🎨 Inspired by Elektron hardware (Octatrack, Digitakt)
- 🆓 Free & open-source (forever)
- 🌐 DAW-agnostic (works with all)
- 🚀 Actively developed & community-driven

### Long-term Vision

We want Sample Brain to become the **go-to tool** for:
- Music producers sampling retro game audio
- VJ artists performing with live video synthesis
- Sound designers organizing massive libraries
- Game developers managing audio assets
- Audio enthusiasts exploring game music history

### Why Hybrid Model?

We believe in:
- 🆓 **Free open-source core** - Everyone can use, modify, learn
- 💳 **Optional premium** - Advanced features for power users (if they want)
- 🤝 **Community-driven** - Users guide roadmap, not investors
- 📈 **Sustainable** - Funds development without VC pressure

---

## ❓ FAQ

**Q: Is it free?**  
A: Yes! 100% free forever. Open-source MIT licensed.

**Q: Do you collect my data?**  
A: No. Everything runs locally. No tracking, no cloud, no data collection.

**Q: Does it work offline?**  
A: Yes. Once loaded, it works entirely offline.

**Q: Can I use with my own samples?**  
A: Absolutely! Scan any folder structure with `node scan.js`.

**Q: What DAWs are supported?**  
A: Ableton (full), FL Studio (planned), Logic Pro (planned), Reaper (planned).

**Q: Can I use for commercial music?**  
A: Yes! Free tool, no restrictions on your music.

**Q: How do I contribute?**  
A: See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 🙏 Credits & Thanks

### Inspiration
- Elektron Octatrack & Digitakt (hardware sampler UI/UX)
- Sononym (smart audio search)
- ADSR Sample Manager (tagging workflow)
- Game audio preservation community (VGM passion)

### Libraries Used
- [Tone.js](https://tonejs.org/) - MIDI playback
- [Hydra.js](https://hydra.ojack.xyz/) - Live video synthesis (coming)
- [librosa](https://librosa.org/) - BPM detection (coming)
- And the amazing open-source community!

---

## 📞 Support

### Getting Help
1. Check [docs/QUICK_START.md](./docs/QUICK_START.md)
2. Search existing [GitHub Issues](https://github.com/wilonweb/sample-brain/issues)
3. Ask in [GitHub Discussions](https://github.com/wilonweb/sample-brain/discussions)
4. Join our [Discord community](https://discord.gg/...) (coming soon)

### Report a Bug
1. Go to [Issues](https://github.com/wilonweb/sample-brain/issues)
2. Click "New Issue"
3. Describe the bug clearly
4. Include steps to reproduce

---

## 🎊 What's Next?

We're actively developing:
- **Week 1:** MIDI support & crate system ✅
- **Week 2-3:** DAW integration (Ableton drag & drop)
- **Week 4-5:** Hydra.js VJ features
- **Month 2:** Desktop app (Electron)
- **Month 3+:** Community features & marketplace

See [ROADMAP.md](./docs/ROADMAP.md) for full timeline.

---

## ⭐ Show Your Support

If Sample Brain helps you create music or art:
- ⭐ **Star this repo** (it helps others discover it!)
- 🔗 **Share it** with friends & colleagues
- 💬 **Leave feedback** (what's missing?)
- 🐛 **Report bugs** (help make it better)
- 🎁 **Contribute** (code, docs, ideas)

---

## 📊 Project Status

```
GitHub Stars:     ⭐⭐⭐⭐⭐ (🚀 Growing!)
Contributors:     👥 Open to all
Activity:         🟢 Active development
Maintenance:      ✅ Well-maintained
Community:        🤝 Growing & engaged
```

---

**Built with ❤️ by [Wil](https://github.com/wilonweb) & the Sample Brain community**

*Transform your samples. Fuel your creativity. 🎵*

---

## License

MIT © 2026 Sample Brain Contributors
